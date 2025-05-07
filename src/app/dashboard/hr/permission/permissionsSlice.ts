import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Permission {
	id?: string;
	employee: string;
	from: string;
	to: string;
	actualEnd: string;
	reason: string;
	permission_date?: string;
	permission_start?: string;
	permission_end?: string;
	actual_end_time?: string;
	deduction?: string;
}

interface PermissionsState {
	permissions: Permission[];
	loading: boolean;
	error: string | null;
	formData: Permission;
	formErrors: Record<string, string>;
}

const initialState: PermissionsState = {
	permissions: [],
	loading: false,
	error: null,
	formData: {
		employee: "",
		from: "",
		to: "",
		actualEnd: "",
		reason: "",
	},
	formErrors: {},
};

export const permissionsSlice = createSlice({
	name: "permissions",
	initialState,
	reducers: {
		setFormData: (state, action: PayloadAction<Partial<Permission>>) => {
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
		setPermissions: (state, action: PayloadAction<Permission[]>) => {
			state.permissions = action.payload;
		},
		addPermission: (state, action: PayloadAction<Permission>) => {
			state.permissions.push(action.payload);
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
	setPermissions,
	addPermission,
	setLoading,
	setError,
	resetForm,
} = permissionsSlice.actions;

export default permissionsSlice.reducer;
