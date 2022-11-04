import { configureStore } from "@reduxjs/toolkit";
import barangReducer from "./barangSlice";

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    items: barangReducer,
  },
});

export default store;
