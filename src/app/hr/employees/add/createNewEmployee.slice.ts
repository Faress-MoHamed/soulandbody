import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const employeeInitialValues = {
	id: null as any,
	name: "",
	birth_date: "",
	qualification: "",
	job: "",
	net_salary: "",
	job_start_date: "",
	job_nature: "",
	extras: "",
	phone: "",
	address: "",
	email: "",
	password: "",
	net_salary_after_deduction: "",
	facility_id: "",
	department_id: "",
	role: "",
	allowance: "",
	sick_leave_balance: "0",
	vacation_balance: "0",
	casual_leave_balance: "0",
	regular_leave_balance: "0",
	separate_balance: "0",
	continous_balance: "0",
	attachments: [] as any,
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
		setEmployeeAttachments: (state, action: { payload: File }) => {
			state.employee.attachments.push(action.payload);
		},
		removeEmployeeAttachment: (state, action: { payload: number }) => {
			state.employee.attachments.splice(action.payload, 1);
		},
		clearEmployeeData: (state) => {
			state.employee = employeeInitialValues;
		},
	},
});
export const {
	setEmployeeField,
	setEmployeeAttachments,
	setEmployeeData,
	clearEmployeeData,
	removeEmployeeAttachment,
} = employeeSlice.actions;
export const employeeReducer = employeeSlice.reducer;
