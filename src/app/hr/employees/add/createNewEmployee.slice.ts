import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const employeeInitialValues = {
	name: "",
	birth_date: "",
	qualification: "",
	job: "",
	net_salary: "",
	job_start_date: "",
	job_nature: "",
	extras: "",
	phoneNumber: "",
	address: "",
	email: "",
	password: "",
	totalsalary: "",
	facility_id: "",
	department_id: "",
	role: "",
	allowance: "",
	sick_leave_balance: 0,
	vacation_balance: 0,
	casual_leave_balance: 0,
	regular_leave_balance: 0,
	separate_balance: 0,
	continous_balance: 0,
};

const initialState = {
	employee: employeeInitialValues,
};

export const employeeSlice = createSlice({
	name: "employee",
	initialState,
	reducers: {
		setEmployeeField: (
			state,
			action: PayloadAction<{
				field: keyof typeof employeeInitialValues;
				value: any;
			}>
		) => {
			(state.employee[action.payload.field] as any) = action.payload.value;
		},
		setEmployeeData: (
			state,
			action: PayloadAction<Partial<typeof employeeInitialValues>>
		) => {
			state.employee = {
				...state.employee,
				...action.payload,
			};
		},
		clearEmployeeData: (state) => {
			state.employee = employeeInitialValues;
		},
	},
});
export const { setEmployeeField, setEmployeeData, clearEmployeeData } =
	employeeSlice.actions;
export const employeeReducer = employeeSlice.reducer;
