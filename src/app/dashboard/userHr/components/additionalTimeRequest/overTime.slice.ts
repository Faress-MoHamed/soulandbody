import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Initial values for the overtime form/data
export const overtimeInitialValues = {
	overtime_date: "" as any,
	overtime_start: "",
	overtime_end: "",
	reason: "",
};

const initialState = {
	overtime: overtimeInitialValues,
};

export const overtimeSlice = createSlice({
	name: "overtime",
	initialState,
	reducers: {
		setOvertimeField: (
			state,
			action: PayloadAction<{
				field: keyof typeof overtimeInitialValues;
				value: any;
			}>
		) => {
			if (!state.overtime) {
				state.overtime = { ...overtimeInitialValues };
			}
			state.overtime[action.payload.field] = action.payload.value;
		},
		setOvertimeData: (
			state,
			action: PayloadAction<Partial<typeof overtimeInitialValues>>
		) => {
			state.overtime = {
				...state.overtime,
				...action.payload,
			};
		},
		clearOvertimeData: (state) => {
			state.overtime = overtimeInitialValues;
		},
	},
});

export const { setOvertimeField, setOvertimeData, clearOvertimeData } =
	overtimeSlice.actions;

export const overtimeReducer = overtimeSlice.reducer;
