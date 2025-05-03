"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import CustomSelect from "../customSelect";
import CustomInput from "../customInput";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { useCreateDisciplinaryWarning, useWarnings } from "./useWarnings";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { setWarningField } from "./warningSlice.slice";
import { useEmployees } from "@/app/hr/employees/useEmployee";

export default function WarningPopUp({ closePopup }: { closePopup?: any }) {
	const { t } = useTypedTranslation();
	const { data: warningsType, isLoading } = useWarnings();
	const [oneEmployee, setOneEmployee] = useState("");
	console.log(warningsType);
	const { data: employeeData, isLoading: employeeDataLoading } = useEmployees();
	const {
		mutate: createDisciplinaryWarning,
		isPending: createDisciplinaryWarningLoading,
	} = useCreateDisciplinaryWarning();
	const DisciplinaryWarning = useTypedSelector((state) => state.warningSlice);
	const dispatch = useDispatch();
	const handleChange = ({
		field,
		value,
	}: {
		field: keyof typeof DisciplinaryWarning;
		value: any;
	}) => {
		dispatch(
			setWarningField({
				field,
				value,
			})
		);
	};
	console.log(DisciplinaryWarning);
	return (
		<Card className="flex flex-col   bg-white p-4 gap-6 ">
			<CardHeader className="flex flex-row items-center justify-between ">
				<CardTitle className="text-center flex-1 text-xl">
					{t("warningPopup.disciplinaryActions")}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4 flex lg:flex-row flex-col items-end gap-2">
					<div className="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full">
						<CustomSelect
							label={t("warningPopup.employeeName")}
							placeholder="احمد محمود"
							value={employeeData
								?.map((el: any) => ({
									label: el?.name,
									value: el?.id,
								}))
								?.find(
									(el: any) => el?.value?.toString() === oneEmployee?.toString()
								)
								?.value?.toString()}
							options={employeeData?.map((el: any) => ({
								label: el?.name,
								value: el?.id,
							}))}
							onValueChange={(e) => {
								setOneEmployee((prev: any) => {
									console.log(prev === e ? undefined : e);
									return prev === e ? (undefined as any) : e;
								});
								handleChange({ field: "employee_id", value: e });
							}}
						/>
						<CustomSelect
							label={t("warningPopup.warningType")}
							placeholder="الكل"
							options={warningsType?.map((el: any) => ({
								label: el?.warning_name,
								value: el?.id,
							}))}
							onValueChange={(e) =>
								handleChange({ field: "warning_id", value: e })
							}
						/>

						<CustomInput
							onChange={(e) => {
								handleChange({
									field: "warning_start_date",
									value: e.target.value,
								});
							}}
							label="من تاريخ"
							type="date"
						/>
						<CustomInput
							onChange={(e) => {
								handleChange({
									field: "warning_end_date",
									value: e.target.value,
								});
							}}
							label="إلى تاريخ"
							type="date"
						/>
					</div>
					<div
						className={
							DisciplinaryWarning.warning_id === "suspension"
								? "pb-[16px]"
								: "pb-[24px]"
						}
					>
						<Button
							onClick={() => {
								createDisciplinaryWarning(DisciplinaryWarning);
								closePopup();
							}}
							className="bg-emerald-500 hover:bg-emerald-600 p-0 py-[10px] px-3 w-[117px] h-[44px]  shadow-none border-[1px]"
						>
							حفظ
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
