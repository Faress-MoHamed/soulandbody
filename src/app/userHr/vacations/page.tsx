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
import { useTranslations } from "next-intl";

export default function ExecusesPage() {
	const { data: userVacationsData, isLoading: userVacationsLoading } =
		useUserVacations();
	const t = useTranslations("userHr.vacationsPage");

	const columns: ColumnDef<WorkRecord>[] = [
		{
			header: t("date"),
			accessorKey: "date",
		},
		{
			header: t("from"),
			accessorKey: "from",
		},
		{
			header: t("to"),
			accessorKey: "to",
		},
		{
			header: t("vacationType"),
			accessorKey: "vacationType",
			cell: ({ row }: any) => {
				const vacation = row.original.vacationType;
				const balance = row.original.balanceType;

				if (!vacation) return "-";

				return (
					<div
						style={{
							color: balance !== t("balanceInside") ? "red" : "black",
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
			header: t("reason"),
			accessorKey: "reason",
		},
		{
			header: t("deduction"),
			accessorKey: "deduction",
		},
		{
			header: t("status"),
			accessorKey: "status",
			cell: ({ row }: any) => {
				const status = row.original.status;
				return (
					<div className="flex justify-center">
						<StatusCard type={status || t("pending")} />
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
						title: t("recordTitle"),
						withFilter: false,
						UserComponent: () => (
							<div className="flex md:flex-row flex-col gap-3 justify-between md:items-end items-start">
								<MonthPicker
									label={t("monthPickerLabel")}
									className="w-[302px] h-[48px] bg-white"
								/>
								<div className="flex gap-2 items-center">
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
									<Link
										href={"vacations/vacationsList"}
										className="flex justify-center items-center border border-[#16C47F] px-3 py-2.5 w-[117px] h-[44px] self-end text-[#16C47F] rounded-[8px]"
									>
										{t("recordButton")}
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
