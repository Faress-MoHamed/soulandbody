"use client";
import React, { useState } from "react";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import AddButton from "@/components/AddButton";
import CustomPopUp from "@/components/popups";
import CustomSelect from "@/components/customSelect";
import { MonthPicker } from "@/components/monthPicker";
import { useHrVacations, type VacationRecord } from "./hook/useHrVacations";
import VacationRequestPopUp from "./component/VacationRequestPopUp";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { useEmployees } from "../employees/useEmployee";
import { Button } from "@/components/ui/button";
import StatusButton from "./component/StatusButton";

function VacationsRecodrs() {
	const { t } = useTypedTranslation();
	const { data, isLoading, error } = useEmployees();
	const [oneEmployee, setOneEmployee] = useState("");
	const [MonthEmployee, setMonthEmployee] = useState<any>();


	
	const formatDate = (isoString: string) => {
		const date = new Date(isoString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};
	let columns: ColumnDef<any>[] = [
		{
			accessorKey: "created_at",
			header: t("hrVacations.table.date"),
			cell: ({ row: { original } }) => {

				return <>{formatDate(original?.created_at)}</>;
			},
		},
		{ accessorKey: "employee", header: t("hrVacations.table.employee") },
		{
			accessorKey: "vacation_start_date",
			header: t("hrVacations.table.leaveStart"),
			cell: ({ row: { original } }) => {

				return <>{formatDate(original?.vacation_start_date)}</>;
			},
		},
		{
			accessorKey: "return_date",
			header: t("hrVacations.table.leaveEnd"),
			cell: ({ row: { original } }) => {

				return <>{formatDate(original?.return_date)}</>;
			},
		},
		{ accessorKey: "number_of_days", header: t("hrVacations.table.leaveDays") },
		{ accessorKey: "vacation_type", header: t("hrVacations.table.leaveType") },
		{
			accessorKey: "medical_attachments",
			header: t("hrVacations.table.attachment"),
			cell: ({
				row: {
					original: { medical_attachments },
				},
			}) => {
				return (
					medical_attachments && (
						<div className="flex justify-center">
							<Link href={medical_attachments}>
								{/* Attachment icon SVG here (unchanged) */}
								<svg
									width="26"
									height="26"
									viewBox="0 0 26 26"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g clipPath="url(#clip0_2152_4709)">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M6.30306 0H15.6016L23.4016 7.8V22.6152C23.4016 24.4862 21.7823 26 19.7878 26H6.22227C4.2208 26 2.60156 24.4862 2.60156 22.6152V3.38476C2.60153 1.51371 4.30157 0 6.30306 0Z"
											fill="#D92D20"
										/>
										<path
											d="M15.6182 5.304V0L23.4016 7.8H18.2127C15.8777 7.8 15.5101 6.136 15.6182 5.304Z"
											fill="white"
											fillOpacity="0.3"
										/>
										<path
											d="M4.74907 21.3V14.7546H7.33145C7.8279 14.7546 8.25084 14.8494 8.60028 15.039C8.94971 15.2265 9.21604 15.4875 9.39928 15.8221C9.58465 16.1545 9.67734 16.538 9.67734 16.9726C9.67734 17.4073 9.58359 17.7908 9.39609 18.1232C9.20859 18.4556 8.93692 18.7145 8.5811 18.8998C8.22741 19.0852 7.79914 19.1779 7.2963 19.1779H5.65035V18.0689H7.07258C7.33891 18.0689 7.55837 18.0231 7.73096 17.9314C7.90567 17.8377 8.03564 17.7088 8.12087 17.5447C8.20823 17.3785 8.25191 17.1878 8.25191 16.9726C8.25191 16.7553 8.20823 16.5657 8.12087 16.4037C8.03564 16.2397 7.90567 16.1129 7.73096 16.0234C7.55624 15.9318 7.33465 15.886 7.06618 15.886H6.13295V21.3H4.74907ZM12.8965 21.3H10.5762V14.7546H12.9157C13.5741 14.7546 14.1408 14.8856 14.616 15.1477C15.0911 15.4076 15.4565 15.7816 15.7122 16.2695C15.97 16.7574 16.0989 17.3412 16.0989 18.0209C16.0989 18.7027 15.97 19.2887 15.7122 19.7787C15.4565 20.2688 15.089 20.6449 14.6096 20.9069C14.1323 21.169 13.5613 21.3 12.8965 21.3ZM11.9601 20.1143H12.839C13.2481 20.1143 13.5922 20.0419 13.8713 19.897C14.1526 19.75 14.3635 19.5231 14.5041 19.2162C14.6469 18.9073 14.7183 18.5089 14.7183 18.0209C14.7183 17.5373 14.6469 17.142 14.5041 16.8352C14.3635 16.5284 14.1536 16.3025 13.8745 16.1576C13.5954 16.0128 13.2513 15.9403 12.8422 15.9403H11.9601V20.1143ZM17.1241 21.3V14.7546H21.4579V15.8956H18.5079V17.4552H21.1702V18.5962H18.5079V21.3H17.1241Z"
											fill="white"
										/>
									</g>
									<defs>
										<clipPath id="clip0_2152_4709">
											<rect width="26" height="26" fill="white" />
										</clipPath>
									</defs>
								</svg>
							</Link>
						</div>
					)
				);
			},
		},
		{ accessorKey: "deduction", header: t("hrVacations.table.deduction") },
	];

	if (oneEmployee) {
		columns.push({
			accessorKey: "status",
			header: "الحاله",
			cell: ({ row: { original } }: any) => {
				return (
					<StatusButton
						id={original?.employee_id}
						status={original?.status || "pending"}
					/>
				);
			},
		});
	}
	const { data: HrVacations, isLoading: loading } = useHrVacations();

	return (
		<ReusableManyTable
			dataSets={[
				{
					columns,
					data: oneEmployee
						? HrVacations?.data?.filter(
								(el: any) =>
									el?.employee_id.toString() === oneEmployee?.toString()
						  )
						: MonthEmployee
						? HrVacations?.data?.filter((el: any) => {
								const jobStartDate = new Date(el?.created_at);

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
						: HrVacations?.data ?? [],
					loading,
					title: t("hrVacations.titles.vacationLog"),
					UserComponent: () => (
						<div className="flex md:flex-row flex-col justify-between md:items-center gap-5">
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
							<CustomPopUp
								DialogTriggerComponent={() => (
									<AddButton
										onClickAdd={() => {}}
										AddTitle={t("hrVacations.titles.addVacation")}
									/>
								)}
								DialogContentComponent={({closePopup}) => <VacationRequestPopUp closePopup={closePopup}/>}
							/>
						</div>
					),
					withPrinter: true,
					containerClassName: "border-none mt-8",
					withFilter: false,
				},
			]}
			withTopPrinter={false}
		/>
	);
}
export default function page() {
	return <VacationsRecodrs />;
}
