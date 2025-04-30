import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const transactionInitialValues = {
	employee_id: 0,
	transaction_date: "",
	transaction_type: "",
	amount: 0,
	reason: "",
};

const initialState = {
	transaction: transactionInitialValues,
};

export const transactionSlice = createSlice({
	name: "transaction",
	initialState,
	reducers: {
		setTransactionField: (
			state,
			action: PayloadAction<{
				field: keyof typeof transactionInitialValues;
				value: any;
			}>
		) => {
			(state.transaction[action.payload.field] as any) = action.payload.value;
		},
		setTransactionData: (
			state,
			action: PayloadAction<Partial<typeof transactionInitialValues>>
		) => {
			state.transaction = {
				...state.transaction,
				...action.payload,
			};
		},
		clearTransactionData: (state) => {
			state.transaction = transactionInitialValues;
		},
	},
});

export const { setTransactionField, setTransactionData, clearTransactionData } =
	transactionSlice.actions;

export const transactionReducer = transactionSlice.reducer;
