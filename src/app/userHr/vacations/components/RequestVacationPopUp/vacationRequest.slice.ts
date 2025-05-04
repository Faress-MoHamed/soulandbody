import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VacationRequestState {
	vacation_start_date: string;
	return_date: string;
	vacation_type: string;
	number_of_days: number;
	loading: boolean;
	error: string | null;
}

const initialState: VacationRequestState = {
	vacation_start_date: "",
	return_date: "",
	vacation_type: "",
	number_of_days: 0,
	loading: false,
	error: null,
};

const vacationRequestSlice = createSlice({
	name: "vacationRequest",
	initialState,
	reducers: {
		setStartDate: (state, action: PayloadAction<string>) => {
			state.vacation_start_date = action.payload;
		},
		setEndDate: (state, action: PayloadAction<string>) => {
			state.return_date = action.payload;
		},
		setType: (state, action: PayloadAction<string>) => {
			state.vacation_type = action.payload;
		},
		setNumberOfDays: (state, action: PayloadAction<number>) => {
			state.number_of_days = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
		resetForm: (state) => {
			state.vacation_start_date = "";
			state.return_date = "";
			state.vacation_type = "";
			state.error = null;
		},
	},
});

export const {
	setStartDate,
	setEndDate,
	setType,
	setNumberOfDays,
	setLoading,
	setError,
	resetForm,
} = vacationRequestSlice.actions;

export default vacationRequestSlice.reducer;
