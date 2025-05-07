import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const executionsInitialValues = {
	permission_date: "" as any,
	permission_start: "",
	permission_end: "",
  reason: "",
  
};

const initialState = {
	executions: executionsInitialValues,
};

export const executionsSlice = createSlice({
	name: "executions",
	initialState,
	reducers: {
		setExecutionsField: (
			state,
			action: PayloadAction<{
				field: keyof typeof executionsInitialValues;
				value: any;
			}>
		) => {
			(state.executions[action.payload.field] as any) = action.payload.value;
		},
		setExecutionsData: (
			state,
			action: PayloadAction<Partial<typeof executionsInitialValues>>
		) => {
			state.executions = {
				...state.executions,
				...action.payload,
			};
		},
		clearExecutionsData: (state) => {
			state.executions = executionsInitialValues;
		},
	},
});

export const { setExecutionsField, setExecutionsData, clearExecutionsData } =
	executionsSlice.actions;

export const executionsReducer = executionsSlice.reducer;
