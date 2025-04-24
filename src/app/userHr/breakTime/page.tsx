"use client";

import ReusableManyTable from "@/components/ReusableTableWithManyData";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useBreakTime, type ExecuseRecord } from "./hooks/useBreakTime";
import { MonthPicker } from "@/components/monthPicker";
import CustomPopUp from "@/components/popups";
import AddButton from "@/components/AddButton";
import ExecusePopup from "./components/execusePopup";
import StatusCard from "../execuse/components/statuseCards";
import { useTranslations } from "next-intl";

export default function BreakTimePage() {
	const t = useTranslations("userHr.breakTimePage");
	const { data: breakTimeData, isLoading: breakTimeLoading } = useBreakTime();

	const columns: ColumnDef<ExecuseRecord>[] = [
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
			header: t("actualEnd"),
			accessorKey: "actualEnd",
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
						data: breakTimeData || [],
						loading: breakTimeLoading,
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
									<AddButton
										AddTitle={t("requestBreak")}
										onClickAdd={() => {}}
									/>
								) : (
									<CustomPopUp
										DialogTriggerComponent={() => (
											<div className="text-end flex justify-between">
												<AddButton
													AddTitle={t("requestBreak")}
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
