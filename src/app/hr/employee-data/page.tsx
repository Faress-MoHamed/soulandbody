"use client";
import AddButton from "@/components/AddButton";
import CustomPopUp from "@/components/popups";
import ReusableTable from "@/components/ReusableTable";
import SelectableComponent from "@/components/selectableComponent";
import React, { useState } from "react";
import { useSalaries } from "../financial-grades/useSalaries";
import { useTransactions } from "./useTransactions";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import SalaryDetailsTable from "@/components/salaryDetails";
import { Input } from "@/components/ui/input";
import { useAttendanceData } from "./useAttendanceEmployee";
import EmployeesForm from "../employees/add";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";
import CustomSelect from "@/components/customSelect";
import { MonthPicker } from "@/components/monthPicker";
import ProfessionalData from "../employees/add/ProfessionalData";

function Salaries() {
	const { t } = useTypedTranslation();
	const { data: salaryData, isLoading: salaryLoading } = useTransactions();

	const columns: ColumnDef<any>[] = [
		{
			accessorKey: "date",
			header: t("salaries.columns.date"),
		},
		{
			accessorKey: "type",
			header: t("salaries.columns.type"),
			cell: ({ row }) => {
				return <>{row?.original?.type}</>;
			},
		},
		{ accessorKey: "amount", header: t("salaries.columns.amount") },
		{ accessorKey: "reason", header: t("salaries.columns.reason") },
	];
	const distinctEmployees = [
		...new Set(salaryData?.map((el: any) => el?.employee)),
	];

	return (
		<>
			<ReusableManyTable
				dataSets={[
					{
						columns,
						data: salaryData ?? [],
						employees: distinctEmployees,
						withActionButtons: false,
						withPrinter: false,
						withFilter: false,
						loading: salaryLoading,
						UserComponent: ({ selectedEmployee }: any) => {
							return (
								<div className="p-6 border-t border-x border-[#02140D4D] mb-4 flex justify-between in-checked:">
									<p className="text-[36px] font-[600]">S00026</p>
									<p className="text-[26px] font-bold">{"فارس محمد"}</p>
								</div>
							);
						},
					},
				]}
				withTopPrinter={false}
			/>
			<SalaryDetailsTable />
		</>
	);
}

function AttendanceEmployee() {
	const { t } = useTypedTranslation();
	const { data } = useAttendanceData();

	const columns: ColumnDef<any>[] = [
		{
			accessorKey: "date",
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
		<>
			<ReusableManyTable
				dataSets={[
					{
						columns,
						data: data ?? [],
						withActionButtons: false,
						withPrinter: true,
						withPagination:false,
						UserComponent: ({ selectedEmployee }: any) => {
							return (
								<div className="p-6 border-t border-x border-[#02140D4D] mb-4 flex lg:flex-row flex-col justify-between in-checked:">
									<p className="text-[26px] font-bold">{"فارس محمد"}</p>
									<p className="text-[24px] font-[500]">
										{" "}
										{t("salaries.hours")}: 15 / 64 ساعة
									</p>
								</div>
							);
						},
						withFilter: false,
					},
				]}
				withTopPrinter={false}
			/>
		</>
	);
}

export  function EmployeeData() {
	const { t } = useTypedTranslation();
	const [selectedEmployee, setSelectedEmployee] = useState<
		string | undefined
	>();
	// const [selectedMonth, setSelectedMonth] = useState<string | undefined>();
	return (
		<>
			<h2 className="text-[26px] font-bold">{t("employeeData.title")}</h2>

			<div className="flex md:flex-row flex-col justify-between md:items-center">
				<div className="flex flex-col lg:flex-row justify-between gap-4 mb-6 rounded-none">
					<div className="flex flex-col lg:flex-row gap-5">
						<CustomSelect
							options={[
								"أحمد محمود",
								"محمد علي",
								"خالد حسن",
								"ياسر عبد الله",
								"سعيد عمر",
							]}
							label={t("employeeData.filter.employee")}
							value={selectedEmployee}
							onValueChange={(e) => {
								setSelectedEmployee((prev) => (prev === e ? "" : e));
							}}
							placeholder={t("employeeData.filter.all")}
						/>
						<MonthPicker
							// value={selectedMonth}
							// onChange={(e) => {
							// 	console.log(e?.target.value);
							// 	setSelectedMonth((prev) =>
							// 		prev === e.target.value ? undefined : e.target.value
							// 	);
							// }}
							label={t("employeeData.filter.date")}
						/>
					</div>
				</div>
				<Link
					href={"/hr/employees/add"}
					className="bg-emerald-500 hover:bg-emerald-600 text-nowrap lg:w-[148px] lg:min-w-fit w-[180px] lg:h-[44px] h-[35px] text-[16px] flex items-center gap-[10px] cursor-pointer rounded-[8px] px-4 py-2 has-[>svg]:px-3 text-white"
				>
					<img src="/add.svg" className="h-6 w-6" />
					{t("employees.form.add")}
				</Link>
			</div>
			<SelectableComponent
				contentClassName="border mt-0"
				className=""
				items={[
					{
						label: t("employees.form.personalInfo"),
						component: (
							<EmployeesForm
								CardStyle={"rounded-none"}
								withEmployeeManagement={false}
								withTitle={false}
								employeeId={5}
							/>
						),
					},
					{ label: t("attendance.title"), component: <AttendanceEmployee /> },
					{
						label: t("salaries.title"),
						component: <Salaries />,
					},
					{
						component: <ProfessionalData />,
						label: "بيانات مهنية",
					},
				]}
				withTopPrinter={false}
			/>
		</>
	);
}
export default function page(){
	return <EmployeeData/>
}