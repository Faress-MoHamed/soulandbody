import React, { useCallback, useState } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
// import { Button } from "@/components/ui/button";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { setFormData } from "../../vacation.slice";
import { useEmployee, useEmployees } from "../../../employees/useEmployee";
import { useCreateVacation } from "../../hook/useHrVacations";
import { Button } from "@heroui/react";

export default function VacationRequestPopUp({closePopup}:{closePopup?:any}) {
	const { t } = useTypedTranslation();
	const { formData, formErrors } = useTypedSelector((state) => state.vacations);
	const dispatch = useDispatch();
	const {data}=useEmployees();
	const [oneEmployee, setOneEmployee] = useState("");
	const {mutate,isPending}=useCreateVacation()
	// Handle input changes and dispatch them to the store
	const handleInputChange = useCallback(
		(field: keyof typeof formData) =>
			(e: React.ChangeEvent<HTMLInputElement>) => {
				dispatch(setFormData({ [field]: e.target.value }));
			},
		[dispatch]
	);

	// Handle select changes and dispatch them to the store
	const handleSelectChange = useCallback(
		(field: keyof typeof formData) =>
			(value: string) => {
				dispatch(setFormData({ [field]:field==="number_of_days"?parseInt(value): value }));
			},
		[dispatch]
	);
	// Handle employee selection change
	const handleEmployeeSelectChange = (employeeId: string) => {
		setOneEmployee(employeeId);
		// Update the formData with the selected employee's ID
		dispatch(setFormData({ employee_id: parseInt(employeeId) }));
	};
	const handleNumberOfDays = useCallback(
		(field: keyof typeof formData) =>
			(e: React.ChangeEvent<HTMLInputElement>) => {
				dispatch(setFormData({ number_of_days: parseInt(e.target.value) }));
			},
		[dispatch]
	);
	return (
		<Card className="flex flex-col px-6 py-9 gap-6 w-[100%] h-fit">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
					{t("hrVacations.vacation")}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col gap-4">
					<div className="grid lg:grid-cols-3 gap-4">
						<CustomInput
							label={t("hrVacations.deduction")}
							type="number"
							value={formData.number_of_days}
							onChange={handleInputChange("number_of_days")}
							error={formErrors.number_of_days}
						/>
						<CustomSelect
							value={data
								?.map((el: any) => ({
									label: el?.name,
									value: el?.id,
								}))
								?.find(
									(el: any) => el?.value?.toString() === oneEmployee?.toString()
								)
								?.value?.toString()}
							options={data?.map((el: any) => ({
								label: el?.name,
								value: el?.id,
							}))}
							label={t("filter.employee")}
							onValueChange={handleEmployeeSelectChange}
						/>
						<CustomSelect
							value={formData.vacation_type}
							onValueChange={handleSelectChange("vacation_type")}
							label={t("hrVacations.leaveType")}
							options={['Sick',"Annual","Casual"]} // Populate this with leave types
							error={formErrors.vacation_type}
						/>
						<CustomInput
							label={t("hrVacations.leaveStart")}
							type="date"
							value={formData.vacation_start_date}
							onChange={handleInputChange("vacation_start_date")}
							error={formErrors.vacation_start_date}
						/>
						<CustomInput
							label={t("hrVacations.leaveEnd")}
							type="date"
							value={formData.return_date}
							onChange={handleInputChange("return_date")}
							error={formErrors.return_date}
						/>
						<CustomInput
							label={t("hrVacations.leaveDays")}
							value={formData.number_of_days.toString()}
							onChange={handleNumberOfDays("number_of_days")}
							error={formErrors.number_of_days}
						/>
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex gap-3 justify-end">
				{/* {formData.vacation_type === "Sick" && (
					<Button
						// Add relevant functionality here
						className="border border-[#16C47F] text-[#16C47F] bg-transparent hover:bg-transparent lg:min-w-[148px] min-w-[140px] lg:h-[48px] h-[35px] text-[16px] flex items-center gap-[10px] cursor-pointer rounded-[8px]"
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="#16C47F"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M11 17H13V13H17V11H13V7H11V11H7V13H11V17ZM12 22C10.6167 22 9.31667 21.7417 8.1 21.225C6.88333 20.6917 5.825 19.975 4.925 19.075C4.025 18.175 3.30833 17.1167 2.775 15.9C2.25833 14.6833 2 13.3833 2 12C2 10.6167 2.25833 9.31667 2.775 8.1C3.30833 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.31667 8.1 2.8C9.31667 2.26667 10.6167 2 12 2C13.3833 2 14.6833 2.26667 15.9 2.8C17.1167 3.31667 18.175 4.025 19.075 4.925C19.975 5.825 20.6833 6.88333 21.2 8.1C21.7333 9.31667 22 10.6167 22 12C22 13.3833 21.7333 14.6833 21.2 15.9C20.6833 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6917 15.9 21.225C14.6833 21.7417 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
								fill="#16C47F"
							/>
						</svg>
						{t("hrVacations.medicalAttachments")}
					</Button>
				)} */}
				<Button
				isLoading={isPending}
				disabled={isPending}
					onPress={()=>{
						mutate({
							...formData
						},{
							onSuccess:()=>{

								closePopup()
							}
						});
					}}
					className="text-[16px] font-[500] text-[#FFFFFF] bg-[#16C47F] p-0 py-[10px] px-3 w-[148px] h-[48px] hover:bg-[#16C47F]/70 shadow-none cursor-pointer rounded-lg"
				>
					{t("hrVacations.save")}
				</Button>
			</CardFooter>
		</Card>
	);
}
