import { createSlice } from "@reduxjs/toolkit";
import { useQuery, useSubscription } from "@apollo/client";
import hasura from "../api/hasura";

const initialState = {
  items: [],
  edit: [],
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
      state.items = action.payload;
    },

    addItem: (state, action) => {},

    removeItem: (state, action) => {},

    editOriginalState: (state, action) => {
      state.items.map((item) => {
        item.isEdit = false;
      });
    },

    editItem: (state, action) => {
      state.edit = action.payload;
    },

    toggleEdit: (state, action) => {
      // Set state.items isEdit to false except for the payload index
      state.items.forEach((item, index) => {
        if (index !== action.payload) {
          item.isEdit = false;
        }
        state.items[action.payload].isEdit =
          !state.items[action.payload].isEdit;
      });
      // console.log(action.payload);
    },
  },
});

export const {
  getItem,
  addItem,
  removeItem,
  toggleEdit,
  editItem,
  editOriginalState,
} = barangSlice.actions;

export default barangSlice.reducer;
