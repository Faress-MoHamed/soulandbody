"use client";
import React from "react";
import { usePermissions } from "./usePermissions";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CustomPopUp from "@/components/popups";
import AddButton from "@/components/AddButton";
import CustomSelect from "@/components/customSelect";
import CustomInput from "@/components/customInput";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { useDispatch } from "react-redux";
import {
	setFormData,
	setFormError,
	clearFormErrors,
	addPermission,
	resetForm,
	setPermissions,
} from "@/app/hr/permission/permissionsSlice";
import { useTypedSelector } from "@/hooks/useTypedSelector";

function PermissionForm() {
	const { t } = useTypedTranslation();
	const dispatch = useDispatch();
	const { formData, formErrors } = useTypedSelector(
		(state) => state.permissions
	);

	const validateForm = () => {
		dispatch(clearFormErrors());
		let isValid = true;

		if (!formData.employee) {
			dispatch(
				setFormError({
					field: "employee",
					error: t("permissions.errors.employee"),
				})
			);
			isValid = false;
		}
		if (!formData.from) {
			dispatch(
				setFormError({ field: "from", error: t("permissions.errors.from") })
			);
			isValid = false;
		}
		if (!formData.to) {
			dispatch(
				setFormError({ field: "to", error: t("permissions.errors.to") })
			);
			isValid = false;
		}
		if (!formData.actualEnd) {
			dispatch(
				setFormError({
					field: "actualEnd",
					error: t("permissions.errors.actualEnd"),
				})
			);
			isValid = false;
		}
		if (!formData.reason) {
			dispatch(
				setFormError({ field: "reason", error: t("permissions.errors.reason") })
			);
			isValid = false;
		}

		return isValid;
	};

	const handleChange = (field: keyof typeof formData, value: string) => {
		dispatch(setFormData({ [field]: value }));
	};

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (validateForm()) {
			dispatch(addPermission(formData));
			dispatch(resetForm());
		}
	};

	return (
		<Card className="p-6">
			<CardHeader>{t("permissions.title")}</CardHeader>
			<CardContent>
				<div className="flex flex-col gap-4 lg:pl-6">
					<div className="grid lg:grid-cols-3 grid-cols-1 items-end gap-4">
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
								value={formData[field as keyof typeof formData]}
								onChange={(e) =>
									handleChange(field as keyof typeof formData, e.target.value)
								}
								error={formErrors[field]}
							/>
						))}
						<CustomInput
							label={t("permissions.form.reason")}
							type="text"
							value={formData.reason}
							onChange={(e) => handleChange("reason", e.target.value)}
							error={formErrors.reason}
						/>
						{/* <div className="pt-7 flex"> */}
						<Button
							// type="submit"
							onClick={handleSubmit}
							className="bg-[#16C47F] text-white px-3 w-[148px] h-[48px]"
						>
							{t("permissions.form.submit")}
						</Button>
						{/* </div> */}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default function Page() {
	const { t } = useTypedTranslation();
	const { data: permissions } = usePermissions();
	const dispatch = useDispatch();

	React.useEffect(() => {
		if (permissions) {
			dispatch(setPermissions(permissions));
		}
	}, [permissions, dispatch]);

	const columns = [
		{
			accessorKey: "permission_date",
			header: t("permissions.table.columns.date"),
		},
		{
			accessorKey: "employee",
			header: t("permissions.table.columns.employee"),
		},
		{
			accessorKey: "permission_start",
			header: t("permissions.table.columns.from"),
		},
		{
			accessorKey: "permission_end",
			header: t("permissions.table.columns.to"),
		},
		{
			accessorKey: "actual_end_time",
			header: t("permissions.table.columns.actual_end"),
		},
		{ accessorKey: "reason", header: t("permissions.table.columns.reason") },
		{
			accessorKey: "deduction",
			header: t("permissions.table.columns.deduction"),
		},
	];

	return (
		<div>
			<ReusableManyTable
				dataSets={[
					{
						columns,
						data: permissions ?? [],
						containerClassName: "border-none mt-9",
						title: t("permissions.table.title"),
						withActionButtons: false,
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
