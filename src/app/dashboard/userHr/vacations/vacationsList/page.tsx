"use client";

import ReusableManyTable from "@/components/ReusableTableWithManyData";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { CustomDatePicker } from "@/components/customDatePicker";
import CustomPopUp from "@/components/popups";
import AddCustomers from "@/app/dashboard/companies/Customers/components/AddCustomers";
import AddButton from "@/components/AddButton";
import { MonthPicker } from "@/components/monthPicker";
import { useUserVacationsList } from "./hooks/useuserVacationsList";
import type { VacationBalanceEntry } from "./vacationsList.type";
import SmallTable from "@/components/smallTable";
import RequestVacation from "../components/RequestVacationPopUp";
import { useTranslations } from "next-intl";

export default function ExecusesPage() {
	const t = useTranslations("userHr.vacationsListPage");
	const { data: userVacationsListData, isLoading: userVacationsListLoading } =
		useUserVacationsList();

	const columns: ColumnDef<VacationBalanceEntry>[] = [
		{
			header: t("vacationType"),
			accessorKey: "vacationType",
		},
		{
			header: t("totalDays"),
			accessorKey: "totalDays",
		},
		{
			header: t("remaining"),
			accessorKey: "remaining",
		},
	];

	return (
		<div>
			<SmallTable
				columns={columns}
				data={userVacationsListData || []}
				title={t("recordTitle")}
				ButtonTrigger={() => {
					return (
						<div className="flex md:flex-row flex-col gap-3 justify-between md:items-end items-start">
							<MonthPicker
								label={t("monthPickerLabel")}
								className="w-[302px] h-[48px] bg-white"
							/>
							<CustomPopUp
								DialogTriggerComponent={() => (
									<div className="text-end flex justify-between">
										<AddButton
											AddTitle={t("requestVacation")}
											onClickAdd={() => {}}
										/>
									</div>
								)}
								DialogContentComponent={() => <RequestVacation />}
							/>
						</div>
					);
				}}
			/>
		</div>
	);
}
