// store/slices/warningSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WarningState {
	employee_id: string;
	warning_id: string;
	warning_start_date: string;
	warning_end_date: string;
}

export const initialWarningState: WarningState = {
	employee_id: "",
	warning_id: "",
	warning_start_date: "",
	warning_end_date: "",
};

const warningSlice = createSlice({
	name: "warning",
	initialState: initialWarningState,
	reducers: {
		setWarningField: <K extends keyof WarningState>(
			state: WarningState,
			action: PayloadAction<{ field: K; value: WarningState[K] }>
		) => {
			state[action.payload.field] = action.payload.value;
		},
		setWarningData: (state, action: PayloadAction<Partial<WarningState>>) => {
			Object.assign(state, action.payload);
		},
		clearWarningData: (state) => {
			Object.assign(state, initialWarningState);
		},
	},
});

export const { setWarningField, setWarningData, clearWarningData } =
	warningSlice.actions;
export const warningReducer = warningSlice.reducer;
