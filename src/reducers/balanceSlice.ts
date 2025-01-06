import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type BalanceReducerState = {
  balance: number
}

const initialState: number = 0

export const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    setBalance: (state, action: PayloadAction<number>) => action.payload,
  },
})

// Export actions
export const { setBalance } = balanceSlice.actions

// Export the reducer
export default balanceSlice.reducer
