import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import { employees, leaveTypes } from "../../hook/useHrVacations";
import { Button } from "@/components/ui/button";
import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";

export default function VacationRequestPopUp() {
	const { t } = useTypedTranslation();
	const [formData, setFormData] = useState<Record<string, any>>({
		employee: "",
		leaveType: "",
		leaveDays: "",
		leaveStart: "",
		leaveEnd: "",
		deduction: "",
	});
	const [errors, setErrors] = useState<Record<string, any>>({});

	const validateForm = () => {
		let newErrors: any = {};
		if (!formData.employee)
			newErrors.employee = t("hrVacations.errors.employeeRequired");
		if (!formData.leaveType)
			newErrors.leaveType = t("hrVacations.errors.leaveTypeRequired");
		if (
			!formData.leaveDays ||
			isNaN(formData.leaveDays) ||
			formData.leaveDays <= 0
		)
			newErrors.leaveDays = t("hrVacations.errors.validLeaveDays");
		if (!formData.leaveStart)
			newErrors.leaveStart = t("hrVacations.errors.leaveStartRequired");
		if (!formData.leaveEnd)
			newErrors.leaveEnd = t("hrVacations.errors.leaveEndRequired");
		if (
			formData.leaveStart &&
			formData.leaveEnd &&
			formData.leaveStart > formData.leaveEnd
		)
			newErrors.leaveEnd = t("hrVacations.errors.leaveEndRequired");
		if (
			!formData.deduction ||
			isNaN(formData.deduction) ||
			formData.deduction < 0
		)
			newErrors.deduction = t("hrVacations.errors.validDeduction");

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (validateForm()) {
			console.log("Form submitted successfully", formData);
			// Handle form submission logic here
		}
	};
	return (
		<Card className="flex flex-col px-6 py-9 gap-6  w-[100%] h-fit">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
					{t("hrVacations.vacation")}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div className="grid lg:grid-cols-3 gap-4">
						<CustomInput
							label={t("hrVacations.deduction")}
							type="number"
							value={formData.deduction}
							onChange={(e) =>
								setFormData({
									...formData,
									deduction: e.target.value,
								})
							}
							error={errors?.deduction}
						/>
						<CustomSelect
							value={formData.employee}
							label={t("hrVacations.employee")}
							options={employees}
							onValueChange={(e) => setFormData({ ...formData, employee: e })}
							error={errors?.employee}
						/>
						<CustomSelect
							value={formData.leaveType}
							onValueChange={(e) => setFormData({ ...formData, leaveType: e })}
							label={t("hrVacations.leaveType")}
							options={leaveTypes}
							error={errors?.leaveType}
						/>
						<CustomInput
							label={t("hrVacations.leaveStart")}
							type="time"
							value={formData.leaveStart}
							onChange={(e) =>
								setFormData({
									...formData,
									leaveStart: e.target.value,
								})
							}
							error={errors?.leaveStart}
						/>
						<CustomInput
							label={t("hrVacations.leaveEnd")}
							type="time"
							value={formData.leaveEnd}
							onChange={(e) =>
								setFormData({
									...formData,
									leaveEnd: e.target.value,
								})
							}
							error={errors?.leaveEnd}
						/>
						<CustomInput
							label={t("hrVacations.leaveDays")}
							value={formData.leaveDays}
							onChange={(e) =>
								setFormData({
									...formData,
									leaveDays: e.target.value,
								})
							}
							error={errors?.leaveDays}
						/>
					</div>
				</form>
				{/* <div className="flex md:mt-0 mt-3">
					<Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[148px] h-[48px] md:mt-8">
						ارسال الطلب
					</Button>
				</div> */}
			</CardContent>
			<CardFooter className="flex gap-3 justify-end">
				{formData.leaveType === "مرضية" && (
					<Button
						// onClick={onClickAdd}
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
				)}
				<Button
					type="submit"
					className="text-[16px] font-[500] text-[#FFFFFF] bg-[#16C47F] p-0 py-[10px] px-3 w-[148px] h-[48px]  hover:bg-[#16C47F]/70 shadow-none cursor-pointer rounded-lg"
				>
					{t("hrVacations.save")}
				</Button>
			</CardFooter>
		</Card>
	);
}
// 						DialogContentComponent={() => {

// 							return (
// 								<CustomCard
// 									title={"اجازات"}
// 									width={1010}
// 									height={450}
// 									className={`lg:w-[1010px] lg:h-[450px] h-[550px] overflow-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:bg-gray-100
// [&::-webkit-scrollbar-thumb]:bg-gray-300  dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 w-[350px] `}
// 									Content={
// 										<form
// 											onSubmit={handleSubmit}
// 											className="flex flex-col gap-4"
// 										>
//
//
//

//
// 											</div>
// 											<div className="pt-7 flex justify-end">
// 												<Button
// 													type="submit"
// 													className="text-[16px] font-[500] text-[#FFFFFF] bg-[#16C47F] p-0 py-[10px] px-3 w-[148px] h-[48px]  hover:bg-[#16C47F]/70 shadow-none cursor-pointer"
// 												>
// 													حفظ
// 												</Button>
// 											</div>
// 										</form>
// 									}
// 								/>
// 							);
// 						}}
