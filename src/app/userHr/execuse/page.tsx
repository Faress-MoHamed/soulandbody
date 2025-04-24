"use client";

import ReusableManyTable from "@/components/ReusableTableWithManyData";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useExecutions, type ExecuseRecord } from "./hooks/useExecuses";
import { MonthPicker } from "@/components/monthPicker";
import StatusCard from "./components/statuseCards";
import CustomPopUp from "@/components/popups";
import AddButton from "@/components/AddButton";
import ExecusePopup from "./components/execusePopup";
import { useTranslations } from "next-intl";

export default function ExecusesPage() {
	const t = useTranslations("userHr.execuses");
	const { data: executionsData, isLoading: executionLoading } = useExecutions();

	const columns: ColumnDef<ExecuseRecord>[] = [
		{ header: t("date"), accessorKey: "date" },
		{ header: t("from"), accessorKey: "from" },
		{ header: t("to"), accessorKey: "to" },
		{ header: t("actualEnd"), accessorKey: "actualEnd" },
		{ header: t("reason"), accessorKey: "reason" },
		{ header: t("deduction"), accessorKey: "deduction" },
		{
			header: t("status"),
			accessorKey: "status",
			cell: ({
				row: {
					original: { status },
				},
			}) => (
				<div className="flex justify-center">
					<StatusCard type={status || "pending"} />
				</div>
			),
		},
	];

	return (
		<div>
			<ReusableManyTable
				dataSets={[
					{
						columns,
						data: executionsData || [],
						loading: executionLoading,
						withPrinter: true,
						containerClassName: "border-none",
						title: t("title"),
						withFilter: false,
						UserComponent: () => (
							<div className="flex md:flex-row flex-col gap-3 justify-between md:items-end items-start">
								<MonthPicker
									label={t("date")}
									className="w-[302px] h-[48px] bg-white"
								/>
								{new Date().getHours() >= 1 && new Date().getHours() <= 2 ? (
									<AddButton AddTitle={t("addTitle")} onClickAdd={() => {}} />
								) : (
									<CustomPopUp
										DialogTriggerComponent={() => (
											<div className="text-end flex justify-between">
												<AddButton
													AddTitle={t("addTitle")}
													onClickAdd={() => {}}
												/>
											</div>
										)}
										DialogContentComponent={() => <ExecusePopup />}
									/>
								)}
							</div>
						),
					},
				]}
				withTopPrinter={false}
			/>
		</div>
	);
}
