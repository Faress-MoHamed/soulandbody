"use client";

import ReusableManyTable from "@/components/ReusableTableWithManyData";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useUserVacations } from "./hooks/useUserVacations";
import { CustomDatePicker } from "@/components/customDatePicker";
import CustomPopUp from "@/components/popups";
import AddCustomers from "@/app/companies/Customers/components/AddCustomers";
import AddButton from "@/components/AddButton";
import { MonthPicker } from "@/components/monthPicker";
import type { WorkRecord } from "./vacations.type";
import StatusCard from "../execuse/components/statuseCards";
import RequestVacation from "./components/RequestVacationPopUp";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ExecusesPage() {
	const { data: userVacationsData, isLoading: userVacationsLoading } =
		useUserVacations();
	const columns: ColumnDef<WorkRecord>[] = [
		{
			header: "التاريخ",
			accessorKey: "date",
		},
		{
			header: "من",
			accessorKey: "from",
		},
		{
			header: "الى",
			accessorKey: "to",
		},
		{
			header: "نوع الإجازة",
			accessorKey: "vacationType",
			cell: ({ row }: any) => {
				const vacation = row.original.vacationType;
				const balance = row.original.balanceType;

				if (!vacation) return "-";

				return (
					<div
						style={{
							color: balance !== "داخل رصيد الإجازات" ? "red" : "black",
            }}
            className="min-w-full text-nowrap"
					>
						<span className="font-[400] text-[16px]">{vacation}</span>
						{balance ? (
							<span className="font-[400] text-[12px]"> ({balance})</span>
						) : null}
					</div>
				);
			},
		},
		{
			header: "السبب",
			accessorKey: "reason",
		},
		{
			header: "الخصم",
			accessorKey: "deduction",
		},
		{
			header: "الحالة",
			accessorKey: "status",
			cell: ({ row }: any) => {
				const status = row.original.status;
				const colors: Record<string, string> = {
					مقبول: "green",
					مرفوض: "red",
					"في انتظار الرد": "orange",
				};
				return (
					<div className="flex justify-center">
						<StatusCard type={status || "pending"} />
					</div>
				);
			},
		},
	];

	return (
		<div>
			<ReusableManyTable
				dataSets={[
					{
						columns,
						data: userVacationsData || [],
						loading: userVacationsLoading,
						withPrinter: true,
						containerClassName: "border-none",
						title: "سجل الأجازة",
						withFilter: false,
						UserComponent: () => (
							<div className="flex md:flex-row flex-col gap-3 justify-between md:items-end items-start">
								<MonthPicker
									label="التاريخ"
									className="w-[302px] h-[48px] bg-white"
								/>
								<div className="flex gap-2 items-center">
									<CustomPopUp
										DialogTriggerComponent={() => (
											<div className="text-end flex justify-between">
												<AddButton AddTitle="طلب أجازة" onClickAdd={() => {}} />
											</div>
										)}
										DialogContentComponent={() => <RequestVacation />}
									/>
									<Link
										href={"vacations/vacationsList"}
										className="flex justify-center items-center border border-[#16C47F] px-3 py-2.5 w-[117px] h-[44px] self-end text-[#16C47F] rounded-[8px]"
									>
										السجل
									</Link>
								</div>
							</div>
						),
					},
				]}
				withTopPrinter={false}
			/>
		</div>
	);
}
