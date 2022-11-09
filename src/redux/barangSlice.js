import { createSlice } from "@reduxjs/toolkit";
import hasura from "../api/hasura";

const initialState = {
  items: [],
  edit: [],
  cart: [],
  searchField: "",
  balance: 0,
};

// Actions
export const fetchBarang = () => {
  return async (dispatch) => {
    const {
      data: { barang },
    } = await hasura.get("/barang");
    dispatch(getItem(barang));
  };
};

// State: items
export const barangSlice = createSlice({
  name: "items",
  initialState,

  reducers: {
    // --- Cart --- //
    addToCart: (state, action) => {
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[action.payload.index].qty -= 1;
        state.cart[index].qty++;
      } else {
        state.items[action.payload.index].qty--;
        state.cart = [...state.cart, { ...action.payload, qty: 1 }];
      }
    },

    removeFromCart: (state, action) => {
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[action.payload.index].qty += state.cart[index].qty;
        state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      } else {
        alert("Barang tidak ada di keranjang");
      }
    },

    buyItem: (state, action) => {
      state.cart.map((item) =>
        hasura.put(`/barang/${item.id}`, {
          nama: item.nama,
          price: item.price,
          qty: state.items[item.index].qty,
        })
      );

      state.cart = [];
    },

    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    // --- Cart --- //

    //

    // --- Item --- //
    getItem: (state, action) => {
      state.items = action.payload;
    },

    editOriginalState: (state, action) => {
      state.items.map((item) => (item.isEdit = false));
    },

    editItem: (state, action) => {
      state.edit = action.payload;
    },

    toggleEdit: (state, action) => {
      state.items.forEach((item, index) => {
        if (index !== action.payload) {
          return (item.isEdit = false);
        }
        return (state.items[action.payload].isEdit =
          !state.items[action.payload].isEdit);
      });
    },
    // --- Item --- //

    // --- Search --- //
    setSearchField: (state, action) => {
      state.searchField = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  setBalance,
  buyItem,
  getItem,
  toggleEdit,
  editItem,
  editOriginalState,
  setSearchField,
} = barangSlice.actions;

export default barangSlice.reducer;
