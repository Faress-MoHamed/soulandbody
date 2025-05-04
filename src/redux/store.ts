import { employeeReducer } from "@/app/hr/employees/add/createNewEmployee.slice";
import { transactionReducer } from "@/app/hr/financial-grades/financialTransactions.slice";
import permissionsReducer from "@/app/hr/permission/permissionsSlice";
import priceOfferSlice from "@/app/user/suppliers/components/AddQuote/priceOffer.slice";
import { warningReducer } from "@/components/warningPopUp/warningSlice.slice";
import vacationRequestReducer from "@/app/userHr/vacations/components/RequestVacationPopUp/vacationRequest.slice";
import attendanceReducer from "@/app/userHr/components/attendance/attendanceSlice";
import { combineReducers } from "redux";

const reducer = combineReducers({
	employee: employeeReducer,
	transaction: transactionReducer,
	priceOffer: priceOfferSlice,
	warningSlice: warningReducer,
	permissions: permissionsReducer,
	vacationRequest: vacationRequestReducer,
	attendance: attendanceReducer,
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
