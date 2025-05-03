import { employeeReducer } from "@/app/hr/employees/add/createNewEmployee.slice";
import { transactionReducer } from "@/app/hr/financial-grades/financialTransactions.slice";
import priceOfferSlice from "@/app/user/suppliers/components/AddQuote/priceOffer.slice";
import { warningReducer } from "@/components/warningPopUp/warningSlice.slice";
import { combineReducers } from "redux";

const reducer = combineReducers({
	employee: employeeReducer,
	transaction: transactionReducer,
	priceOffer: priceOfferSlice,
	warningSlice: warningReducer,
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
