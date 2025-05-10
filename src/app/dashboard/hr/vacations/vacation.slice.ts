import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Vacation {
	id?: string;
	employee_id: number;
	vacation_type: string;
	number_of_days: number;
	vacation_start_date: string;
	return_date: string;
	status: string;
}

interface VacationsState {
	vacations: Vacation[];
	loading: boolean;
	error: string | null;
	formData: Vacation;
	formErrors: Record<string, string>;
}

const initialState: VacationsState = {
	vacations: [],
	loading: false,
	error: null,
	formData: {
		employee_id: 0,
		vacation_type: "",
		number_of_days: 0,
		vacation_start_date: "",
		return_date: "",
		status: "",
	},
	formErrors: {},
};

export const vacationsSlice = createSlice({
	name: "vacations",
	initialState,
	reducers: {
		setFormData: (state, action: PayloadAction<Partial<Vacation>>) => {
			state.formData = { ...state.formData, ...action.payload };
		},
		setFormError: (
			state,
			action: PayloadAction<{ field: string; error: string }>
		) => {
			state.formErrors[action.payload.field] = action.payload.error;
		},
		clearFormErrors: (state) => {
			state.formErrors = {};
		},
		setVacations: (state, action: PayloadAction<Vacation[]>) => {
			state.vacations = action.payload;
		},
		addVacation: (state, action: PayloadAction<Vacation>) => {
			state.vacations.push(action.payload);
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
		resetForm: (state) => {
			state.formData = initialState.formData;
			state.formErrors = {};
		},
	},
});

export const {
	setFormData,
	setFormError,
	clearFormErrors,
	setVacations,
	addVacation,
	setLoading,
	setError,
	resetForm,
} = vacationsSlice.actions;

export default vacationsSlice.reducer;
