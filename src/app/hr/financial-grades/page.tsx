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
import { useCreateDeduction, useDeductions } from "./useDeductions";
import { useSalaries } from "./useSalaries";
import ReusableTable from "@/components/ReusableTable";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import CustomSelect from "@/components/customSelect";
import CustomInput from "@/components/customInput";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { setTransactionField } from "./financialTransactions.slice";
import { Button as MainButton } from "@heroui/react";

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

const LeaveForm = ({ closePopup }: any) => {
	const { t } = useTypedTranslation();
	const { data, isLoading, error } = useEmployees();
	const transaction = useTypedSelector(
		(state) => state.transaction.transaction
	);
	const dispatch = useDispatch();
	const [oneEmployee, setOneEmployee] = useState(transaction.employee_id);

	const handleChange = (field: keyof typeof transaction, value: any) => {
		dispatch(setTransactionField({ field, value }));
	};

	const { mutate: createDeducation, isPending: creatingLoading } =
		useCreateDeduction();

	return (
		<Card className="p-6">
			<CardTitle>{t("financial.transactionsTitle")}</CardTitle>
			{/* <form onSubmit={handleSubmit}> */}
			<CardContent className="grid md:grid-cols-3 grid-cols-1 gap-4">
				{/* Employee Field */}
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
					onValueChange={(e) => {
						setOneEmployee((prev: any) => {
							console.log(prev === e ? undefined : e);
							return prev === e ? (undefined as any) : e;
						});
						handleChange("employee_id", e);
					}}
				/>

				<CustomInput
					onChange={(e) => handleChange("transaction_date", e.target.value)}
					value={transaction.transaction_date}
					label={t("financial.date")}
					type={"date"}
					//error={errors.date}
				/>
				<CustomSelect
					label={t("financial.type")}
					placeholder={t("financial.advance")}
					options={["Deduction", "Bonus"]}
					value={transaction.transaction_type}
					onValueChange={(val) => handleChange("transaction_type", val)}
					//error={errors.type}
				/>
				<CustomInput
					type="number"
					value={transaction.amount}
					onChange={(e) => handleChange("amount", e.target.value)}
					label={t("financial.amount")}
					//error={errors.amount}
				/>
				<CustomInput
					type="text"
					value={transaction.reason}
					onChange={(e) => handleChange("reason", e.target.value)}
					label={t("financial.reason")}
					//error={errors.reason}
				/>
				{/* Submit Button */}
			</CardContent>
			{/* </form> */}
			<CardFooter>
				<div className="pt-6 flex">
					<MainButton
						onPress={async (e) => {
							await createDeducation(transaction);
							closePopup();
						}}
						isLoading={creatingLoading}
						className="text-white bg-[#16C47F] p-3 w-[148px] h-[48px] hover:bg-[#16C47F]/70 shadow-none rounded-lg"
					>
						{t("financial.submit")}
					</MainButton>
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
							options={[]}
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
	console.log(salaryData, deductionData);
	const salaryColumns = [
		{ accessorKey: "transaction_date", header: t("financial.date") },
		{ accessorKey: "employee", header: t("financial.employee") },
		{ accessorKey: "amount", header: t("financial.salary") },
		{ accessorKey: "net_salary", header: t("financial.netSalary") },
		{ accessorKey: "extras", header: t("financial.extras") },
		{ accessorKey: "allowances", header: t("financial.allowances") },
	];

	const deductionColumns = [
		{ accessorKey: "transaction_date", header: t("financial.date") },
		{ accessorKey: "employee", header: t("financial.employee") },
		{ accessorKey: "transaction_type", header: t("financial.type") },
		{ accessorKey: "amount", header: t("financial.amount") },
		{ accessorKey: "reason", header: t("financial.reason") },
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
								DialogContentComponent={({ closePopup }) => (
									<LeaveForm closePopup={closePopup} />
								)}
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
