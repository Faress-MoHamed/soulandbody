"use client";
import React, { useState } from "react";
import { usePermissions } from "./usePermissions";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CustomPopUp from "@/components/popups";
import AddButton from "@/components/AddButton";
import CustomSelect from "@/components/customSelect";
import CustomInput from "@/components/customInput";
import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";

function PermissionForm() {
	const { t } = useTypedTranslation();

	const [formData, setFormData] = useState<Record<any, any>>({
		employee: "",
		from: "",
		to: "",
		actualEnd: "",
		reason: "",
	});
	const [errors, setErrors] = useState<Record<any, any>>({});

	const validateForm = () => {
		let newErrors: any = {};
		if (!formData.employee)
			newErrors.employee = t("permissions.errors.employee");
		if (!formData.from) newErrors.from = t("permissions.errors.from");
		if (!formData.to) newErrors.to = t("permissions.errors.to");
		if (!formData.actualEnd)
			newErrors.actualEnd = t("permissions.errors.actualEnd");
		if (!formData.reason) newErrors.reason = t("permissions.errors.reason");

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (validateForm()) {
			console.log("Permission Form Submitted", formData);
			// Handle submission logic here
		}
	};

	return (
		<Card className="p-6">
			<CardHeader>{t("permissions.title")}</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:pl-6">
					<div className="grid lg:grid-cols-3 grid-cols-1 items-center gap-4">
						<CustomSelect
							label={t("permissions.form.employee")}
							value={formData.employee}
							options={["fares", "moahmed", "ahmed"]}
							placeholder={t("permissions.placeholders.employee")}
							onValueChange={(value) => handleChange("employee", value)}
						/>
						{["from", "to"].map((field) => (
							<CustomInput
								key={field}
								label={t(`permissions.form.${field}` as any)}
								type="time"
								value={formData[field]}
								onChange={(e) => handleChange(field, e.target.value)}
								error={errors[field]}
							/>
						))}
						<CustomInput
							label={t("permissions.form.reason")}
							type="text"
							value={formData.reason}
							onChange={(e) => handleChange("reason", e.target.value)}
							error={errors.reason}
						/>
						<div className="pt-7 flex">
							<Button
								type="submit"
								className="bg-[#16C47F] text-white px-3 w-[148px] h-[48px]"
							>
								{t("permissions.form.submit")}
							</Button>
						</div>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}

export default function Page() {
	const { t } = useTypedTranslation();
	const { data: permessions } = usePermissions();

	const columns = [
		{ accessorKey: "date", header: t("permissions.table.columns.date") },
		{
			accessorKey: "employee",
			header: t("permissions.table.columns.employee"),
		},
		{ accessorKey: "from", header: t("permissions.table.columns.from") },
		{ accessorKey: "to", header: t("permissions.table.columns.to") },
		{
			accessorKey: "actual_end",
			header: t("permissions.table.columns.actual_end"),
		},
		{ accessorKey: "reason", header: t("permissions.table.columns.reason") },
		{
			accessorKey: "deduction",
			header: t("permissions.table.columns.deduction"),
		},
	];

	const distinctEmployees = [
		...new Set(permessions?.map((el: any) => el?.employee)),
	];

	return (
		<div>
			<ReusableManyTable
				dataSets={[
					{
						columns,
						data: permessions ?? [],
						containerClassName: "border-none mt-9",
						title: t("permissions.table.title"),
						withActionButtons: false,
						employees: distinctEmployees,
						ButtonTrigger: () => (
							<CustomPopUp
								DialogTriggerComponent={() => (
									<AddButton
										onClickAdd={() => {}}
										AddTitle={t("permissions.add")}
									/>
								)}
								DialogContentComponent={() => <PermissionForm />}
							/>
						),
						withPrinter: true,
					},
				]}
				withTopPrinter={false}
			/>
		</div>
	);
}
