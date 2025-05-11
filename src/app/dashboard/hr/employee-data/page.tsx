"use client";

import React, { useState } from "react";
import AddButton from "@/components/AddButton";
import CustomPopUp from "@/components/popups";
import SelectableComponent from "@/components/selectableComponent";
import { useSalaries } from "../financial-grades/useSalaries";
import { useTransactions } from "./useTransactions";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import SalaryDetailsTable from "@/components/salaryDetails";
import { Input } from "@/components/ui/input";
import { useAttendanceEmployeeData } from "./useAttendanceEmployee";
import EmployeesForm from "../employees/add";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import CustomSelect from "@/components/customSelect";
import { MonthPicker } from "@/components/monthPicker";
import ProfessionalData from "../employees/add/ProfessionalData";
import { useEmployee, useEmployees } from "../employees/useEmployee";
import { Button } from "@/components/ui/button";

function Salaries() {
	const { t } = useTypedTranslation();
	const { data: salaryData, isLoading: salaryLoading } = useTransactions();

	const columns: ColumnDef<any>[] = [
		{ accessorKey: "transaction_date", header: t("salaries.columns.date") },
		{
			accessorKey: "transaction_type",
			header: t("salaries.columns.type"),
		},
		{ accessorKey: "amount", header: t("salaries.columns.amount") },
		{ accessorKey: "reason", header: t("salaries.columns.reason") },
	];

	return (
		<>
			<ReusableManyTable
				dataSets={[
					{
						columns,
						data: salaryData ?? [],
						withActionButtons: false,
						withPrinter: false,
						withFilter: false,
						loading: salaryLoading,
						UserComponent: ({ selectedEmployee }: any) => (
							<div className="p-6 border-t border-x border-[#02140D4D] mb-4 flex justify-between">
								<p className="text-[36px] font-[600]">S00026</p>
								<p className="text-[26px] font-bold">{"فارس محمد"}</p>
							</div>
						),
					},
				]}
				withTopPrinter={false}
			/>
			<SalaryDetailsTable />
		</>
	);
}

function AttendanceEmployee({
	selectedEmployeeId,
}: {
	selectedEmployeeId: string;
}) {
	const { t } = useTypedTranslation();
	const { data, isLoading } = useAttendanceEmployeeData(selectedEmployeeId);

	const columns: ColumnDef<any>[] = [
		{
			accessorKey: "job_start_date",
			header: t("attendanceEmployeeData.columns.date"),
		},
		{
			accessorKey: "checkIn",
			header: t("attendanceEmployeeData.columns.checkIn"),
		},
		{
			accessorKey: "checkOut",
			header: t("attendanceEmployeeData.columns.checkOut"),
		},
		{
			accessorKey: "breakTime",
			header: t("attendanceEmployeeData.columns.breakTime"),
		},
		{
			accessorKey: "permission",
			header: t("attendanceEmployeeData.columns.permission"),
		},
		{
			accessorKey: "hoursWorked",
			header: t("attendanceEmployeeData.columns.hoursWorked"),
		},
		{
			accessorKey: "workLocation",
			header: t("attendanceEmployeeData.columns.workLocation"),
		},
	];

	return (
		<ReusableManyTable
			dataSets={[
				{
					columns,
					data: [data ?? {}],
					withActionButtons: false,
					withPrinter: true,
					withPagination: false,
					loading: isLoading,
					UserComponent: ({ selectedEmployee }: any) => (
						<div className="p-6 border-t border-x border-[#02140D4D] mb-4 flex lg:flex-row flex-col justify-between">
							<p className="text-[26px] font-bold">{"فارس محمد"}</p>
							<p className="text-[24px] font-[500]">
								{t("salaries.hours")}: 15 / 64 ساعة
							</p>
						</div>
					),
					withFilter: false,
				},
			]}
			withTopPrinter={false}
		/>
	);
}

function EmployeeData() {
	const { t } = useTypedTranslation();
	const [selectedEmployee, setSelectedEmployee] = useState<
		string | undefined
	>();
	const [oneEmployee, setOneEmployee] = useState("");
	const [MonthEmployee, setMonthEmployee] = useState<any>();

	const { data, isLoading, error } = useEmployees();
	const { data: GetOneEmployeeData, isLoading: GetOneEmployeeLoading } =
		useEmployee(oneEmployee);

	return (
		<>
			<h2 className="text-[26px] font-bold">{t("employeeData.title")}</h2>

			<div className="flex md:flex-row flex-col justify-between md:items-center">
				<div className="flex flex-col lg:flex-row justify-between gap-4 mb-6 rounded-none">
					<div className="flex flex-col lg:flex-row items-end gap-5">
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
							}}
						/>

						<MonthPicker
							label={t("filter.date")}
							wrapperClassName="min-w-[240px]"
							value={MonthEmployee ?? new Date()}
							onChange={(e) => setMonthEmployee(e)}
						/>
						<Button
							className="!h-[48px] lg:w-[302px] w-full bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md"
							onClick={(e) => {
								e.stopPropagation();
								setOneEmployee(undefined as any);
								setMonthEmployee(null);
							}}
						>
							{t("clear")}
						</Button>
					</div>
				</div>
				<Link
					href={"/dashboard/hr/employees/add"}
					className="bg-emerald-500 hover:bg-emerald-600 text-nowrap lg:w-[148px] w-[180px] lg:h-[44px] h-[35px] text-[16px] flex items-center gap-[10px] cursor-pointer rounded-[8px] px-4 py-2 text-white"
				>
					<img src="/add.svg" className="h-6 w-6" />
					{t("employees.form.add")}
				</Link>
			</div>

			<SelectableComponent
				contentClassName="border mt-0"
				items={[
					{
						label: t("employees.form.personalInfo"),
						component: (
							<EmployeesForm
								CardStyle="rounded-none"
								withEmployeeManagement={false}
								withTitle={false}
								employeeId={oneEmployee}
							/>
						),
					},
					{
						label: t("attendance.title"),
						component: <AttendanceEmployee selectedEmployeeId={oneEmployee} />,
					},
					{ label: t("salaries.title"), component: <Salaries /> },
					{
						label: "بيانات مهنية",
						component: <ProfessionalData employeeId={oneEmployee} />,
					},
				]}
				withTopPrinter={false}
			/>
		</>
	);
}

export default function Page() {
	return <EmployeeData />;
}
