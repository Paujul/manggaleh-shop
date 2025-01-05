import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type BalanceType = {
  balance: number
}

const initialState: number = 0

export const balanceSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Fetch products and set the state
    setBalance: (state, action: PayloadAction<number>) => {
      state = action.payload
    },
  },
})

// Export actions
export const { setBalance } = balanceSlice.actions

// Export the reducer
export default balanceSlice.reducer
