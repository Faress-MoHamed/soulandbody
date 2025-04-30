import { employeeReducer } from "@/app/hr/employees/add/createNewEmployee.slice";
import { transactionReducer } from "@/app/hr/financial-grades/financialTransactions.slice";
import { combineReducers } from "redux";

const reducer = combineReducers({
	employee: employeeReducer,
	transaction: transactionReducer,
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
