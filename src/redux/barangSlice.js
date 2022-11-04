import { createSlice } from "@reduxjs/toolkit";
import { useQuery, useSubscription } from "@apollo/client";
import hasura from "../api/hasura";

const initialState = {
  items: [],
};

// Actions
export const fetchBarang = () => {
  return async (dispatch) => {
    const {
      data: { barang },
    } = await hasura.get("/barang");
    console.log(barang);
    dispatch(getItem(barang));
  };
};

// State: items
export const barangSlice = createSlice({
  name: "items",
  initialState,

  reducers: {
    getItem: (state, action) => {
      //   console.log(action.payload);
      state.items = action.payload;
    },

    addItem: (state, action) => {},

    removeItem: (state, action) => {},

    toggleEdit: (state, action) => {
      state.items[action.payload].isEdit = !state.items[action.payload].isEdit;
      console.log(action.payload);
    },
  },
});

export const { getItem, addItem, removeItem, toggleEdit } = barangSlice.actions;

export default barangSlice.reducer;
