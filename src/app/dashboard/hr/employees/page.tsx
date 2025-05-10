"use client";
import React, { useEffect, useState } from "react";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import AddButton from "@/components/AddButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
	useDeleteEmployee,
	useDistinctEmployees,
	useEmployees,
} from "./useEmployee";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import CustomSelect from "@/components/customSelect";
import { MonthPicker } from "@/components/monthPicker";
import { X } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@heroui/react";

export default function Page() {
	const { t } = useTypedTranslation();
	const { data, isLoading, error } = useEmployees();
	const [oneEmployee, setOneEmployee] = useState("");
	const [MonthEmployee, setMonthEmployee] = useState<any>();
	const route = useRouter();
	const { mutate: DeleteEmployee, isPending: DeleteEmployeeLoading } =
		useDeleteEmployee();

	const handleNavigation = (id: string) => {
		route.push(`/dashboard/hr/employees/${id}`);
	};

	let columns = [
		{ accessorKey: "job_start_date", header: t("employees.date") },
		{ accessorKey: "name", header: t("employees.employee") },
		{ accessorKey: "job_nature", header: t("employees.workNature") },
		{ accessorKey: "net_salary", header: t("employees.netSalary") },
		{ accessorKey: "phone", header: t("employees.phoneNumber") },
		{ accessorKey: "address", header: t("employees.address") },
		{
			accessorKey: "action",
			header: "الإجراء",
			cell: ({ row: { original } }: any) => (
				<div className="flex justify-center gap-1">
					<Button
						isLoading={DeleteEmployeeLoading}
						onPress={() => DeleteEmployee(original?.id)}
						className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#C41619]"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-trash-2"
						>
							<path d="M3 6h18" />
							<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
							<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
							<line x1="10" x2="10" y1="11" y2="17" />
							<line x1="14" x2="14" y1="11" y2="17" />
						</svg>
						حذف
					</Button>
					<Link
						href={`/dashboard/hr/employees/${original?.id}`}
						className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-[#16C47F] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#16C47F]"
					>
						<div>
							<svg
								width="15"
								height="14"
								viewBox="0 0 15 14"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g clip-path="url(#clip0_2272_12726)">
									<path
										d="M6.91797 2.33314H2.83464C2.52522 2.33314 2.22847 2.45606 2.00968 2.67485C1.79089 2.89364 1.66797 3.19039 1.66797 3.49981V11.6665C1.66797 11.9759 1.79089 12.2726 2.00968 12.4914C2.22847 12.7102 2.52522 12.8331 2.83464 12.8331H11.0013C11.3107 12.8331 11.6075 12.7102 11.8263 12.4914C12.0451 12.2726 12.168 11.9759 12.168 11.6665V7.58314M11.293 1.45814C11.525 1.22608 11.8398 1.0957 12.168 1.0957C12.4962 1.0957 12.8109 1.22608 13.043 1.45814C13.275 1.6902 13.4054 2.00495 13.4054 2.33314C13.4054 2.66133 13.275 2.97608 13.043 3.20814L7.5013 8.74981L5.16797 9.33314L5.7513 6.99981L11.293 1.45814Z"
										stroke="#16C47F"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</g>
								<defs>
									<clipPath id="clip0_2272_12726">
										<rect
											width="14"
											height="14"
											fill="white"
											transform="translate(0.5)"
										/>
									</clipPath>
								</defs>
							</svg>
						</div>
						تعديل
					</Link>
				</div>
			),
		},
	];
	return (
		<ReusableManyTable
			dataSets={[
				{
					columns,
					data: oneEmployee
						? data?.filter(
								(el: any) => el?.id.toString() === oneEmployee?.toString()
						  )
						: MonthEmployee
						? data?.filter((el: any) => {
								const jobStartDate = new Date(el?.job_start_date);

								// Selected date (from your date selector)
								const selectedDate = new Date(MonthEmployee);

								// Get the year and month from both dates
								const jobStartYear = jobStartDate.getFullYear();
								const jobStartMonth = jobStartDate.getMonth(); // 0 is January, 1 is February, etc.

								const selectedYear = selectedDate.getFullYear();
								const selectedMonth = selectedDate.getMonth();
								return (
									jobStartYear === selectedYear &&
									jobStartMonth === selectedMonth
								);
						  })
						: data ?? [],
					title: t("employees.title"),
					loading: isLoading,
					error: error?.message,
					UserComponent: () => {
						return (
							<div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
								<div className="flex flex-col lg:flex-row items-end gap-5">
									<CustomSelect
										value={data
											?.map((el: any) => ({
												label: el?.name,
												value: el?.id,
											}))
											?.find(
												(el: any) =>
													el?.value?.toString() === oneEmployee?.toString()
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
										className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md"
										onClick={(e) => {
											e.stopPropagation();
											setOneEmployee(undefined as any);
											setMonthEmployee(null);
										}}
									>
										clear
									</Button>
								</div>
							</div>
						);
					},
					withActionButtons: false,
					withFilter: false,
					ButtonTrigger: () => (
						<Link href={"/dashboard/hr/employees/add"}>
							<AddButton
								onClickAdd={() => {}}
								AddTitle={t("employees.newEmployee")}
							/>
						</Link>
					),
					withPrinter: true,
					containerClassName: "border-none mt-8",
				},
			]}
			withTopPrinter={false}
		/>
	);
}
