import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import client from '@/lib/axios/client'
import { RootState } from '@/store'
import type { Catalog } from '@/types/api'

import { Product, reduceProductQty } from './productSlice'

// Define the initial state type for cart
interface CartState {
  cart: Product[]
}

const initialState: CartState = {
  cart: [],
}

interface ProductPayload {
  product: Product
  qty: number
}

export const addToCartThunk = createAsyncThunk(
  'cart/addToCartThunk',
  async ({ product, qty }: ProductPayload, { dispatch }) => {
    dispatch(addToCart(product)) // Add to cart
    dispatch(reduceProductQty({ id: product.id, qty })) // Reduce product quantity
  }
  // async (product: Product, thunkAPI) => {
  //   thunkAPI.dispatch(addToCart(product))
  //   thunkAPI.dispatch(reduceProductQty({ id: product.id, qty: 1 }))
  // }
)

export const buyItemThunk = createAsyncThunk(
  'cart/buyItemThunk',
  async (_, { getState }) => {
    const state = getState() as RootState // Ensure type safety
    const cartItems = state.cart.cart
    const productItems = state.products.products

    // Iterate through cart items and send updated product quantity
    for (const cartItem of cartItems) {
      const product = productItems.find((item) => item.id === cartItem.id)

      if (product) {
        const updatedQty = product.qty - cartItem.qty

        // Send PUT request with updated quantity
        await client.put(`/products/${cartItem.id}`, {
          id: cartItem.id,
          qty: updatedQty >= 0 ? updatedQty : 0, // Ensure no negative values
        })
      }
    }
  }
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add a product to the cart
    addToCart: (state, action: PayloadAction<Catalog>) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      )
      if (existingItem) {
        existingItem.qty += 1
      } else {
        state.cart.push({ ...action.payload, qty: 1 })
      }
      // Dispatch reduceProductQty action
    },

    // Remove a product from the cart
    removeFromCart: (state, action: PayloadAction<Catalog>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id)
    },

    // Update quantity of a product in the cart
    updateCartQuantity: (
      state,
      action: PayloadAction<{ id: number; qty: number }>
    ) => {
      const item = state.cart.find((item) => item.id === action.payload.id)
      if (item) {
        item.qty = action.payload.qty
      }
    },

    buyItem: (state) => {
      state.cart.map((item) => {
        fetch(`/api/products/${item.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ qty: item.qty }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to update product quantity')
            }
            return response.json()
          })
          .catch((error) => {
            console.error('Error updating product quantity:', error)
          })
      })
      state.cart = []
    },

    // Clear the entire cart
    clearCart: (state) => {
      state.cart = []
    },
  },
})

// Export actions
export const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  buyItem,
} = cartSlice.actions

// Selector to get cart items from the state
export const selectCart = (state: RootState) => state.cart.cart

// Export the reducer
export default cartSlice.reducer
