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
import  vacationsSlice  from "@/app/dashboard/hr/vacations/vacation.slice";
import  inventorySlice  from "@/app/dashboard/user/orders/components/topComponentsinventoryProduct/inventorySlice";
import  supplierSlice from "@/app/dashboard/user/suppliers/supplier.slice";
import  productSlice  from "@/app/dashboard/user/warehouses/components/AddNewProduct/productSlice";
import  addNewWareHouseSlice  from "@/app/dashboard/user/warehouses/components/AddNewWareHouse/AddNewWareHouse.slice";
import  productRowSlice  from "@/app/dashboard/user/warehouses/hooks/TableHooks/productRowSlice";

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
	vacations:vacationsSlice,
	inventory:inventorySlice,
	supplier:supplierSlice,
	productInventory:productSlice,
	addNewWareHouse:addNewWareHouseSlice,
	productRowSlice,
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
