import { employeeReducer } from "@/app/dashboard/hr/employees/add/createNewEmployee.slice";
import { transactionReducer } from "@/app/dashboard/hr/financial-grades/financialTransactions.slice";
import permissionsReducer from "@/app/dashboard/hr/permission/permissionsSlice";
import priceOfferSlice from "@/app/dashboard/user/suppliers/components/AddQuote/priceOffer.slice";
import { warningReducer } from "@/components/warningPopUp/warningSlice.slice";
import vacationRequestReducer from "@/app/dashboard/userHr/vacations/components/RequestVacationPopUp/vacationRequest.slice";
import attendanceReducer from "@/app/dashboard/userHr/components/attendance/attendanceSlice";
import { combineReducers } from "redux";
import { executionsReducer } from "@/app/dashboard/userHr/execuse/executions.slice";
import { overtimeReducer } from "@/app/dashboard/userHr/components/additionalTimeRequest/overTime.slice";

const reducer = combineReducers({
	employee: employeeReducer,
	transaction: transactionReducer,
	priceOffer: priceOfferSlice,
	warningSlice: warningReducer,
	permissions: permissionsReducer,
	vacationRequest: vacationRequestReducer,
	attendance: attendanceReducer,
	executions: executionsReducer,
	overTime: overtimeReducer,
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
