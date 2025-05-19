import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductRowState {
  product: any | null;
  actualQty: number;
}

const initialState: ProductRowState = {
  product: null,
  actualQty: 0,
};

const productRowSlice = createSlice({
  name: "productRow",
  initialState,
  reducers: {
    updateSelectedProduct(state, action: PayloadAction<{ product: any }>) {
      console.log("typeof", typeof state.product);
      console.log(action.payload.product);
      state.product = action.payload.product;
    },
    updateActualQty(state, action: PayloadAction<{ actualQty: number }>) {
      state.actualQty = action.payload.actualQty;
    },
  },
});

export const { updateSelectedProduct, updateActualQty } =
  productRowSlice.actions;
export default productRowSlice.reducer;
