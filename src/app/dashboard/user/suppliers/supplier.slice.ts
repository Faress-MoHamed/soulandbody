// store/supplierSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SupplierState {
  id: any;
  name: string;
  phone: string;
  address: string;
  invoices: any[];
  quotations: any[];
}

const initialState: SupplierState = {
  id: null,
  name: "",
  phone: "",
  address: "",
  invoices: [],
  quotations: [],
};

export const supplierSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {
    setSupplierData: (state, action: PayloadAction<Partial<SupplierState>>) => {
      return { ...state, ...action.payload };
    },
    resetSupplierData: () => initialState,
    updateSupplierField: (state, action: PayloadAction<{ field: keyof SupplierState; value: any }>) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
});

export const { setSupplierData, resetSupplierData, updateSupplierField } = supplierSlice.actions;
export default supplierSlice.reducer;