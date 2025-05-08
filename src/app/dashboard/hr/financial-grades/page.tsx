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
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import CustomSelect from "@/components/customSelect";
import CustomInput from "@/components/customInput";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { setTransactionField } from "./financialTransactions.slice";
import { Button as MainButton } from "@heroui/react";
import type { ColumnDef } from "@tanstack/react-table";
import { MonthPicker } from "@/components/monthPicker";

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



export default function Page() {
	const { t } = useTypedTranslation();
	const { data: salaryData, isLoading: salaryLoading } = useSalaries();
	const { data: deductionData, isLoading: deductionLoading } = useDeductions();
	const [oneEmployee, setOneEmployee] = useState("");
const { data, isLoading, error } = useEmployees();
const filteredData = data?.filter((item: any) => {
	const matchEmployee =
		!oneEmployee || item.id?.toString() === oneEmployee?.toString();
	return matchEmployee ;
});

	console.log(salaryData, deductionData);
	const salaryColumns: ColumnDef<any>[] = [
		// { accessorKey: "transaction_date", header: t("financial.date") },
		{ accessorKey: "name", header: t("financial.employee") },
		{ accessorKey: "net_salary", header: t("financial.salary") },
		{
			accessorKey: "net_salary_after_deduction",
			header: t("financial.netSalary"),
			cell: ({ row: { original } }) => {
				return <>{original.net_salary_after_deduction || 0}</>;
			},
		},
		{ accessorKey: "extras", header: t("financial.extras") },
		{ accessorKey: "allowance", header: t("financial.allowances") },
	];

	const deductionColumns = [
		{ accessorKey: "transaction_date", header: t("financial.date") },
		{ accessorKey: "employee_name", header: t("financial.employee") },
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
						data: filteredData ?? [],
						withActionButtons: false,
						loading: salaryLoading,
						UserComponent: () => (<div className="flex justify-start p-6">
<div className="flex flex-col lg:flex-row justify-start gap-4 mb-6">
	<div className="flex flex-col lg:flex-row items-end gap-5">
		<CustomSelect
			value={oneEmployee}
			options={data?.map((el: any) => ({
				label: el?.name,
				value: el?.id,
			}))}
			label={t("filter.employee")}
			onValueChange={(e) => {
				setOneEmployee(prev => (prev === e ? "" : e));
			}}
		/>


		<Button
			className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md"
			onClick={() => {
				setOneEmployee("");
			}}
		>
			clear
		</Button>
	</div>
	</div>
</div>

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
