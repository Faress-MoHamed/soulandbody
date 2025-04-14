"use client";

import ReusableManyTable from "@/components/ReusableTableWithManyData";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { CustomDatePicker } from "@/components/customDatePicker";
import CustomPopUp from "@/components/popups";
import AddCustomers from "@/app/companies/Customers/components/AddCustomers";
import AddButton from "@/components/AddButton";
import { MonthPicker } from "@/components/monthPicker";
import { useUserVacationsList } from "./hooks/useuserVacationsList";
import type { VacationBalanceEntry } from "./vacationsList.type";
import SmallTable from "@/components/smallTable";
import RequestVacation from "../components/RequestVacationPopUp";

export default function ExecusesPage() {
	const { data: userVacationsListData, isLoading: userVacationsListLoading } =
		useUserVacationsList();
	const columns: ColumnDef<VacationBalanceEntry>[] = [
		{
			header: "نوع الإجازة",
			accessorKey: "vacationType",
		},
		{
			header: "عدد الأيام",
			accessorKey: "totalDays",
		},
		{
			header: "المتبقي",
			accessorKey: "remaining",
		},
	];

	return (
		<div>
			<SmallTable
				columns={columns}
				data={userVacationsListData || []}
				title="سجل الأجازة"
				ButtonTrigger={() => {
					return (
						<div className="flex md:flex-row flex-col gap-3 justify-between md:items-end items-start">
							<MonthPicker
								label="التاريخ"
								className="w-[302px] h-[48px] bg-white"
							/>
							{
								<CustomPopUp
									DialogTriggerComponent={() => (
										<div className="text-end flex justify-between">
											<AddButton AddTitle="طلب أجازة" onClickAdd={() => {}} />
										</div>
									)}
									DialogContentComponent={() => <RequestVacation />}
								/>
							}
						</div>
					);
				}}
			/>
		</div>
	);
}
