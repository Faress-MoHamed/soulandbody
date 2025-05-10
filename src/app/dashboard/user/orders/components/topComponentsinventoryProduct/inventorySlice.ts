// redux/slices/inventorySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [] as any,
};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push({...action.payload,index: Math.floor(Math.random() * state.products.length+1)} as any);
    },
    removeProduct: (state, action) => {
      const index = action.payload; // the index of the product to delete
      state.products = state.products.filter((item: any, i: any) => item?.index !== index); // remove the product at the specified index
    },
  },
});

export const { addProduct, removeProduct } = inventorySlice.actions;

export default inventorySlice.reducer;
