"use client";
import { useTranslations } from "next-intl";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import { Button } from "@/components/ui/button";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { clearWarehouse, updateWarehouseField, setWarehouse } from "./AddNewWareHouse.slice";
import { useEmployees } from "@/app/dashboard/hr/employees/useEmployee";
import { useAddNewWareHouse, useOneWarehouse, useUpddateWareHouse } from "../../hooks/usewarehouses";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useFacilities } from "../../hooks/useFacilities";

export default function AddNewWareHouse({closePopup,id}:{closePopup?:any,id?:any}) {
	const { t } = useTypedTranslation();
	const dispatch = useDispatch();
	const {warehouse}=useTypedSelector(s=>s.addNewWareHouse);
		const {data:warehouses,isLoading:warehousesLoading}=useOneWarehouse(id)
	const {data:employees,isLoading:employeesLoading}=useEmployees()
	const {data:Facilities,isLoading:FacilitiesLoading}=useFacilities()
	const {mutate:AddWareHouse,isPending}=useAddNewWareHouse();
	const {mutate:UpdateWareHouse,isPending:UpdateWareHouseisPending}=useUpddateWareHouse(id);
	const handleChange = (field:keyof typeof warehouse,value:any) => {
		dispatch(updateWarehouseField({
			field,
			value
		}));
	};
	useEffect(()=>{
		if (id && warehouses) {
			dispatch(setWarehouse(warehouses));
		}
	}, [id, warehouses, dispatch]);
	useEffect(()=>{
		return ()=>{dispatch(clearWarehouse())}
	},[])
	console.log(warehouse)
	return (
		<Card>
			<CardHeader>{t("addNewWareHouse.addNewStore")}</CardHeader>
			{id&&<p className="text-[24px] font-bold text-start ps-6">
				{t("addNewWareHouse.code")} : {id}
			</p>}
			<CardContent className="grid md:grid-cols-2 grid-cols-1 gap-6 px-6 ">
				<CustomInput onChange={(e)=>handleChange("name",e.target.value)} value={warehouse?.name} label={t("addNewWareHouse.storeName")} />
				<CustomInput onChange={(e)=>handleChange("phone_number",e.target.value)} value={warehouse?.phone_number} label={"رقم الهاتف"} />
				<CustomSelect onValueChange={(e)=>handleChange("type_id",e)} value={warehouse?.type_id} label={t("addNewWareHouse.storeType")} options={[]} />
				<CustomInput onChange={(e)=>handleChange("max_capacity",e.target.value)} value={warehouse?.max_capacity} label={t("addNewWareHouse.purchasePrice")} />
				<CustomSelect loading={employeesLoading} onValueChange={(e)=>handleChange("employee_id",e)} value={warehouse?.employee_id} label={t("addNewWareHouse.Responsiblemanagement")} options={(employees||[])?.map((el: { id: any;name?:any })=>({label:el?.name.toString(),value:el?.id.toString()}))} />
				<CustomSelect loading={FacilitiesLoading} onValueChange={(e)=>handleChange("facility_id",e)} value={warehouse?.facility_id} label={"المنشأه"} options={(Facilities||[])?.map((el: { id: any;name?:any })=>({label:el?.name.toString(),value:el?.id.toString()}))} />
			</CardContent>
			<div className="px-6">
				<CustomInput
				onChange={(e)=>handleChange("location",e.target.value)}
				value={warehouse?.location}
					wrapperClassName=" lg:w-full"
					label={t("addNewWareHouse.geographicalLocation")}
				/>
			</div>
			<CardFooter className="px-6 pb-6">
				<Button  disabled={isPending} onClick={async ()=>{
					if (id) {
						await UpdateWareHouse({...warehouse,address:warehouse.location,max_capacity:Number(warehouse.max_capacity),type_id:2},{
							onSuccess:()=>{
								toast.success("addNewWareHouse.success");
								dispatch(clearWarehouse())
								closePopup();
							},
							onError:()=>{
								toast.error("addNewWareHouse.error")
							}
						})}else{

						
						await AddWareHouse({...warehouse,address:warehouse.location,max_capacity:Number(warehouse.max_capacity),type_id:2},{
							onSuccess:()=>{
								toast.success("addNewWareHouse.success");
								dispatch(clearWarehouse())
								closePopup();
							},
							onError:()=>{
								toast.error("addNewWareHouse.error")
							}
						});
						}
					
				}}
				 className="bg-[#16C47F] hover:bg-[#16C47F] text-white px-6 py-2 rounded-md w-[182px] h-[47px] md:mt-8">
					{t("addNewWareHouse.save")}
				</Button>
			</CardFooter>
		</Card>
	);
}
