"use client";
import AddButton from "@/components/AddButton";
import CustomPopUp from "@/components/popups";
import ReusableTable from "@/components/ReusableTable";
import SelectableComponent from "@/components/selectableComponent";
import React, { useState } from "react";
import { useSalaries } from "../financial-grades/useSalaries";
import { useTransactions } from "./useTransactions";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import SalaryDetailsTable from "@/components/salaryDetails";
import { Input } from "@/components/ui/input";
import { useAttendanceData } from "./useAttendanceEmployee";
import EmployeesForm from "../employees/add";
function Salaries() {
	const { data: salaryData, isLoading: salaryLoading } = useTransactions();

	const columns: ColumnDef<any>[] = [
		{
			accessorKey: "date",
			header: "التاريخ",
		},
		{
			accessorKey: "type",
			header: "نوع الحركة",
			cell: ({ row }) => {
				return (
					<div className="flex gap-2.5 items-center justify-center w-full ">
						<img
							src="/add-green.svg"
							alt=""
							className="w-[24px] h-[24px] fill-red-300"
						/>
						{row?.original?.type}
					</div>
				);
			},
		},
		{ accessorKey: "amount", header: "المبلغ" },
		{ accessorKey: "reason", header: "السبب" },
	];
	const distinctEmployees = [
		...new Set(salaryData?.map((el: any) => el?.employee)),
	];

	return (
		<>
			<ReusableTable
				columns={columns}
				data={salaryData ?? []}
				employees={distinctEmployees}
				withActionButtons={false}
				withPrinter={false}
				// title="الموظفين"
				withColspan
				loading={salaryLoading}
				UserComponent={({ selectedEmployee }: any) => {
					return (
						<div className="p-6 border-t border-x border-[#02140D4D] mb-4 flex justify-between in-checked:">
							<p className="text-[26px] font-bold">{"فارس محمد"}</p>
							<p className="text-[36px] font-[600]">S00026</p>
						</div>
					);
				}}
				withFilter={false}
			/>
			<SalaryDetailsTable />
		</>
	);
}

function AttendanceEmployee() {
	const { data } = useAttendanceData();

	const columns: ColumnDef<any>[] = [
		{
			accessorKey: "date",
			header: "التاريخ",
		},
		{ accessorKey: "checkIn", header: "تسجيل دخول" },
		{ accessorKey: "checkOut", header: "تسجيل خروج" },
		{ accessorKey: "breakTime", header: "الراحة" },
		{ accessorKey: "permission", header: "أذن" },
		{ accessorKey: "hoursWorked", header: "عدد الساعات" },
		{ accessorKey: "workLocation", header: "موقع الدوام" },
	];
	return (
		<>
			<ReusableTable
				columns={columns}
				data={data ?? []}
				withActionButtons={false}
				withPrinter={false}
				// title="الموظفين"
				withColspan
				loading={false}
				UserComponent={({ selectedEmployee }: any) => {
					return (
						<div className="p-6 border-t border-x border-[#02140D4D] mb-4 flex lg:flex-row flex-col justify-between in-checked:">
							<p className="text-[26px] font-bold">{"فارس محمد"}</p>
							<p className="text-[24px] font-[500]">
								{" "}
								ساعات الدوام : 15 /64 ساعة
							</p>
						</div>
					);
				}}
				withFilter={false}
			/>
			<SalaryDetailsTable />
		</>
	);
}

export default function page() {
	const [selectedEmployee, setSelectedEmployee] = useState<
		string | undefined
	>();
	const [selectedMonth, setSelectedMonth] = useState<string | undefined>();
	return (
		<>
			<h2 className="text-[26px] font-bold">بيانات موظف</h2>

			<div className="flex justify-between items-center">
				<div className="flex flex-col lg:flex-row justify-between gap-4 mb-6 rounded-none">
					<div className="flex flex-col lg:flex-row gap-5">
						<div className="flex flex-col gap-2">
							<label className="text-[16px] text-black font-[500]">
								الموظف
							</label>
							<Select
								value={selectedEmployee}
								dir="rtl"
								onValueChange={(e) => {
									setSelectedEmployee((prev) => (prev === e ? "" : e));
								}}
							>
								<SelectTrigger className="min-w-[240px]">
									<SelectValue placeholder="الكل" />
								</SelectTrigger>
								<SelectContent>
									{[
										"أحمد محمود",
										"محمد علي",
										"خالد حسن",
										"ياسر عبد الله",
										"سعيد عمر",
									]?.map((el: any) => (
										<SelectItem value={el}>{el}</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col gap-2">
							<label className="text-[16px] text-black font-[500]">
								التاريخ
							</label>
							<Input
								type="month"
								className="min-w-[240px] bg-white border-[#D9D9D9] placeholder:text-black text-right flex justify-end"
								value={selectedMonth}
								onChange={(e) => {
									console.log(e?.target.value);
									setSelectedMonth((prev) =>
										prev === e.target.value ? undefined : e.target.value
									);
								}}
							/>
						</div>
					</div>
				</div>

				<AddButton AddTitle={"اضافة موظف"} onClickAdd={() => {}} />
			</div>
			<SelectableComponent
				contentClassName="border-0 mt-0 rounded-lg"
				className=""
				items={[
					{
						label: "معلومات شخصية",
						component: (
							<EmployeesForm
								CardStyle={"rounded-none"}
								withEmployeeManagement={false}
								withTitle={false}
								employeeId={5}
							/>
						),
					},
					{ label: "سجلات حضور", component: <AttendanceEmployee /> },
					{
						label: "تفاصيل المرتب",
						component: <Salaries />,
					},
				]}
			/>
		</>
	);
}
