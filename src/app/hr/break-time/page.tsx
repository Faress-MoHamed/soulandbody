"use client";
import React, { useState } from "react";
import { useBreakTime, useBreakTimes } from "./useBreakTimes";
import ReusableTable from "@/components/ReusableTable";
import CustomCard from "@/components/customCard";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import CustomPopUp from "@/components/popups";
import AddButton from "@/components/AddButton";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CustomSelect from "@/components/customSelect";
import CustomInput from "@/components/customInput";
import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";
// import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";

const employees = [
	"أحمد محمود",
	"محمد علي",
	"خالد حسن",
	"ياسر عبد الله",
	"سعيد عمر",
];

function BreakTimeForm() {
	const { t } = useTypedTranslation();
	const [formData, setFormData] = useState<Record<any, any>>({
		employee: "",
		from: "",
		actualEnd: "",
	});
	const [errors, setErrors] = useState<Record<any, any>>({});

	const validateForm = () => {
		let newErrors: any = {};
		if (!formData.employee)
			newErrors.employee = t("breakTime.validation.employeeRequired");
		if (!formData.from) newErrors.from = t("breakTime.validation.fromRequired");
		if (!formData.actualEnd)
			newErrors.actualEnd = t("breakTime.validation.actualEndRequired");
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (validateForm()) {
			console.log("Break Form Submitted", formData);
		}
	};

	return (
		<Card className="p-6">
			<CardHeader>{t("breakTime.form.title")}</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:pl-6">
					<div className="grid lg:grid-cols-3 grid-cols-1 items-center gap-4">
						<CustomSelect
							label={t("breakTime.form.employee")}
							value={formData.employee}
							onValueChange={(value) => handleChange("employee", value)}
							options={employees}
							error={errors.employee}
						/>
						<CustomInput
							type="time"
							value={formData.from}
							onChange={(e) => handleChange("from", e.target.value)}
							label={t("breakTime.form.from")}
							error={errors.from}
						/>
						{/* <CustomInput
							type="time"
							value={formData.actualEnd}
							onChange={(e) => handleChange("actualEnd", e.target.value)}
							label={t("breakTime.form.actualEnd")}
							error={errors.actualEnd}
						/> */}
					</div>
					<div className="pt-7 flex justify-end">
						<Button
							type="submit"
							className="bg-[#16C47F] text-white px-3 w-[148px] h-[48px]"
						>
							{t("breakTime.form.save")}
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}

export function BreakTimePage() {
	const { t } = useTypedTranslation();
	const { data: BreakData } = useBreakTimes();

	const columns = [
		{ accessorKey: "date", header: t("breakTime.columns.date") },
		{ accessorKey: "employee", header: t("breakTime.columns.employee") },
		{ accessorKey: "from", header: t("breakTime.columns.from") },
		{ accessorKey: "to", header: t("breakTime.columns.to") },
		{ accessorKey: "actual_end", header: t("breakTime.columns.actual_end") },
		{ accessorKey: "deduction", header: t("breakTime.columns.deduction") },
	];

	const distinctEmployees = [
		...new Set(BreakData?.map((el: any) => el?.employee)),
	];

	return (
		<div>
			<ReusableManyTable
				dataSets={[
					{
						columns,
						data: BreakData ?? [],
						title: t("breakTime.title"),
						withActionButtons: false,
						employees: distinctEmployees,
						ButtonTrigger: () => (
							<CustomPopUp
								DialogTriggerComponent={() => {
									return (
										<AddButton
											onClickAdd={() => {}}
											AddTitle={t("breakTime.form.add")}
										/>
									);
								}}
								DialogContentComponent={() => <BreakTimeForm />}
							/>
						),
						withPrinter: true,
						containerClassName: "border-none",
					},
				]}
				withTopPrinter={false}
			/>
		</div>
	);
}
export default function page() {
	return <BreakTimePage />;
}
