import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WarehouseData {
  name?: string;
  address?: string;
  phone_number?: string;
  facility_id?: number;
  type_id?: number;
  location?: string;
  max_capacity?: number;
  employee_id?: number;
}

interface AddNewWareHouseState {
  warehouse: WarehouseData ;
}
const initialValue = {
    name: "",
    address: "",
    phone_number: "",
    facility_id: 0,
    type_id: 0,
    location: "",
    max_capacity: 0,
    employee_id: 0,
  }

const initialState: AddNewWareHouseState = {
  warehouse: initialValue,
};

export const addNewWareHouseSlice = createSlice({
  name: "addNewWareHouse",
  initialState,
  reducers: {
    setWarehouse(state, action: PayloadAction<WarehouseData>) {
      state.warehouse = action.payload;
    },
    clearWarehouse(state) {
      state.warehouse = initialValue;
    },
    updateWarehouseField(
        state,
        action: PayloadAction<{ field: keyof WarehouseData; value: string | number }>
      ) {
        // Make sure warehouse exists
        if (!state.warehouse) {
          state.warehouse = initialValue;
        }
        
        // Create a new copy of the warehouse object with the updated field
        state.warehouse = {
          ...state.warehouse,
          [action.payload.field]: action.payload.value
        };
      },
  },
});

export const { setWarehouse, clearWarehouse,updateWarehouseField } = addNewWareHouseSlice.actions;
export default addNewWareHouseSlice.reducer;