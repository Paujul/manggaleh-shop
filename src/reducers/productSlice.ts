import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// Define a Product type based on the Prisma schema
export interface Product {
  id: number
  name: string
  price: number
  qty: number
  imgId?: string
}

// Define the initial state type
interface ProductState {
  products: Product[]
}

const initialState: ProductState = {
  products: [],
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Fetch products and set the state
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
    },

    // Edit an existing product
    editProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) {
        state.products[index] = action.payload
      }
    },
    reduceProductQty: (state, action) => {
      const { id, qty } = action.payload
      const product = state.products.find((p) => p.id === id)
      if (product) {
        product.qty -= qty
      }
    },
  },
})

// Export actions
export const { setProducts, editProduct, reduceProductQty } =
  productSlice.actions

// Selector to get products from the state
// export const selectProducts = (state: ProductState): Product[] => state.products.products

// Export the reducer
export default productSlice.reducer
