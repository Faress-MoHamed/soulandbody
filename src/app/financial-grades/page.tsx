"use client";
import React, { useEffect, useState } from "react";
import WarningPopUp from "@/components/warningPopUp";
import CustomPopUp from "@/components/popups";
import { cn } from "@/lib/utils";
import AddButton from "@/components/AddButton";
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
import {
	useDeleteEmployee,
	useDistinctEmployees,
	useEmployees,
} from "../employees/useEmployee";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SelectableComponent from "@/components/selectableComponent";
import { useDeductions } from "./useDeductions";
import { useSalaries } from "./useSalaries";
import ReusableTable from "@/components/ReusableTable";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import { useTypedTranslation } from "../hooks/useTypedTranslation";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import CustomSelect from "@/components/customSelect";
import CustomInput from "@/components/customInput";

const employees = [
	"أحمد محمود",
	"محمد علي",
	"خالد حسن",
	"ياسر عبد الله",
	"سعيد عمر",
];
const leaveTypes = ["عادية", "مرضية", "طارئة"];

type DeductionFormType = {
	employee: string;
	date: string;
	type: string;
	amount: string;
	reason: string;
};

type SalaryFormType = {
	employee: string;
	date: string;
	netSalary: string;
	extras: string;
	allowances: string;
	totalSalary: string;
};

const LeaveForm = () => {
	const { t } = useTypedTranslation();
	const [formData, setFormData] = useState<DeductionFormType>({
		date: "",
		employee: "",
		type: "",
		amount: "",
		reason: "",
	});
	const [errors, setErrors] = useState<Partial<DeductionFormType>>({});

	const validateForm = () => {
		let newErrors: Partial<DeductionFormType> = {};
		if (!formData.date) newErrors.date = t("errors.requiredField");
		if (!formData.employee) newErrors.employee = t("errors.requiredField");
		if (!formData.type) newErrors.type = t("errors.requiredField");
		if (
			!formData.amount ||
			isNaN(Number(formData.amount)) ||
			Number(formData.amount) <= 0
		)
			newErrors.amount = t("errors.invalidAmount");
		if (!formData.reason) newErrors.reason = t("errors.requiredField");

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (validateForm()) {
			console.log("Form submitted", formData);
		}
	};

	const handleChange = (field: keyof DeductionFormType, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<Card className="p-6">
			<CardTitle>{t("financial.transactionsTitle")}</CardTitle>
			{/* <form onSubmit={handleSubmit}> */}
			<CardContent className="grid md:grid-cols-3 grid-cols-1 gap-4">
				{/* Employee Field */}
				<CustomSelect
					label={t("financial.employee")}
					placeholder={t("financial.employee")}
					options={employees}
					error={errors.employee}
				/>

				<CustomInput
					onChange={(e) => handleChange("date", e.target.value)}
					value={formData.date}
					label={t("financial.date")}
					error={errors.date}
				/>
				<CustomSelect
					label={t("financial.type")}
					placeholder={t("financial.advance")}
					options={employees}
					value={formData.type}
					onValueChange={(val) => handleChange("type", val)}
					error={errors.type}
				/>
				<CustomInput
					type="number"
					value={formData.amount}
					onChange={(e) => handleChange("amount", e.target.value)}
					label={t("financial.amount")}
					error={errors.amount}
				/>
				<CustomInput
					type="text"
					value={formData.reason}
					onChange={(e) => handleChange("reason", e.target.value)}
					label={t("financial.reason")}
					error={errors.reason}
				/>
				{/* Submit Button */}
			</CardContent>
			{/* </form> */}
			<CardFooter>
				<div className="pt-6 flex">
					<Button
						type="submit"
						className="text-white bg-[#16C47F] p-3 w-[148px] h-[48px] hover:bg-[#16C47F]/70 shadow-none"
					>
						{t("financial.submit")}
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
};

function SalariesForm() {
	const { t } = useTypedTranslation();
	const [formData, setFormData] = useState<SalaryFormType>({
		employee: "",
		date: "",
		netSalary: "",
		extras: "",
		allowances: "",
		totalSalary: "",
	});
	const [errors, setErrors] = useState<Partial<SalaryFormType>>({});

	const validateForm = (): boolean => {
		let newErrors: Partial<SalaryFormType> = {};
		if (!formData.employee) newErrors.employee = t("errors.requiredField");
		if (!formData.date) newErrors.date = t("errors.requiredField");
		if (
			!formData.netSalary ||
			isNaN(Number(formData.netSalary)) ||
			Number(formData.netSalary) < 0
		)
			newErrors.netSalary = t("errors.invalidAmount");
		if (
			!formData.extras ||
			isNaN(Number(formData.extras)) ||
			Number(formData.extras) < 0
		)
			newErrors.extras = t("errors.invalidAmount");
		if (
			!formData.allowances ||
			isNaN(Number(formData.allowances)) ||
			Number(formData.allowances) < 0
		)
			newErrors.allowances = t("errors.invalidAmount");
		if (
			!formData.totalSalary ||
			isNaN(Number(formData.totalSalary)) ||
			Number(formData.totalSalary) < 0
		)
			newErrors.totalSalary = t("errors.invalidAmount");

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (field: keyof SalaryFormType, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (validateForm()) {
			console.log("Salary Form Submitted", formData);
		}
	};
	return (
		<Card className="p-6">
			<CardTitle>{t("financial.salaryTitle")}</CardTitle>
			<CardContent>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:pl-6">
					<div className="grid lg:grid-cols-3 grid-cols-1 items-center gap-4">
						{/* Employee Field */}
						<CustomSelect
							label={t("financial.employee")}
							className=""
							value={formData.employee}
							onValueChange={(value) => handleChange("employee", value)}
							options={employees}
							placeholder={t("financial.employee")}
						/>
						<CustomInput
							label={t("financial.date")}
							type="date"
							value={formData.date}
							wrapperClassName=""
							onChange={(e) => handleChange("date", e.target.value)}
							error={errors.date}
						/>

						{/* Salary Fields */}
						{[
							{ label: t("financial.netSalary"), field: "netSalary" },
							{ label: t("financial.extras"), field: "extras" },
							{ label: t("financial.allowances"), field: "allowances" },
							{ label: t("financial.totalSalary"), field: "totalSalary" },
						].map(({ label, field }) => (
							<CustomInput
								label={label}
								type="number"
								value={formData[field as keyof SalaryFormType]}
								onChange={(e) =>
									handleChange(field as keyof SalaryFormType, e.target.value)
								}
								wrapperClassName=""
								error={errors[field as keyof SalaryFormType]}
							/>
						))}
					</div>

					{/* Submit Button */}
					<div className="pt-7 flex justify-end">
						<Button
							type="submit"
							className="text-white bg-[#16C47F] p-3 w-[148px] h-[48px] hover:bg-[#16C47F]/70 shadow-none"
						>
							{t("financial.submit")}
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}

export default function Page() {
	const { t } = useTypedTranslation();
	const { data: salaryData, isLoading: salaryLoading } = useSalaries();
	const { data: deductionData, isLoading: deductionLoading } = useDeductions();

	const salaryColumns = [
		{ accessorKey: "date", header: t("financial.date") },
		{ accessorKey: "employee", header: t("financial.employee") },
		{ accessorKey: "salary", header: t("financial.salary") },
		{ accessorKey: "net_salary", header: t("financial.netSalary") },
		{ accessorKey: "extras", header: t("financial.extras") },
		{ accessorKey: "allowances", header: t("financial.allowances") },
	];

	const deductionColumns = [
		{ accessorKey: "date", header: t("financial.date") },
		{ accessorKey: "employee", header: t("financial.employee") },
		{ accessorKey: "type", header: t("financial.type") },
		{ accessorKey: "amount", header: t("financial.amount") },
		{ accessorKey: "reason", header: t("financial.reason") },
	];

	const distinctEmployees = [
		...new Set(salaryData?.map((el: any) => el?.employee)),
	];
	const distinctDeductionEmployees = [
		...new Set(deductionData?.map((el: any) => el?.employee)),
	];

	return (
		<>
			<h2 className="text-[26px] font-bold">
				{t("financial.transactionsTitle")}
			</h2>
			<ReusableManyTable
				dataSets={[
					{
						label: t("financial.salaries"),
						columns: salaryColumns,
						data: salaryData ?? [],
						employees: distinctEmployees,
						withActionButtons: false,
						loading: salaryLoading,
						ButtonTrigger: () => (
							<CustomPopUp
								DialogTriggerComponent={() => (
									<AddButton
										onClickAdd={() => {}}
										AddTitle={t("financial.addSalary")}
									/>
								)}
								DialogContentComponent={() => <SalariesForm />}
							/>
						),
						withPrinter: true,
					},
					{
						label: t("financial.deductions"),
						columns: deductionColumns,
						data: (deductionData as any) ?? [],
						employees: distinctDeductionEmployees,
						withActionButtons: false,
						loading: deductionLoading,
						ButtonTrigger: () => (
							<CustomPopUp
								DialogTriggerComponent={() => (
									<AddButton
										onClickAdd={() => {}}
										AddTitle={t("financial.addTransaction")}
									/>
								)}
								DialogContentComponent={() => <LeaveForm />}
							/>
						),
						withPrinter: true,
					},
				]}
				withTopPrinter={false}
			/>
		</>
	);
}
