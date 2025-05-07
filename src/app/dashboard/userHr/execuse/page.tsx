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
import { Button } from "@/components/ui/button";

export default function ExecusesPage() {
	const t = useTranslations("userHr.execuses");
	const { data: executionsData, isLoading: executionLoading } = useExecutions();
	const [selectedMonth, setSelectedMonth] = React.useState<Date | null>(null);

	const columns: ColumnDef<ExecuseRecord>[] = [
		{ header: t("date"), accessorKey: "permission_date" },
		{ header: t("from"), accessorKey: "permission_start" },
		{ header: t("to"), accessorKey: "permission_end" },
		{ header: t("actualEnd"), accessorKey: "actual_end_time" },
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
	const filteredExecutions = React.useMemo(() => {
		if (!executionsData || !selectedMonth) return executionsData;

		const selectedMonthValue = selectedMonth.getMonth(); // 0-based (0 = Jan)
		const selectedYear = selectedMonth.getFullYear();

		return executionsData.filter((record: any) => {
			const permissionDate = new Date(record.permission_date);
			return (
				permissionDate.getMonth() === selectedMonthValue &&
				permissionDate.getFullYear() === selectedYear
			);
		});
	}, [executionsData, selectedMonth]);
	return (
		<div>
			<ReusableManyTable
				dataSets={[
					{
						columns,
						data: filteredExecutions || [],
						loading: executionLoading,
						withPrinter: true,
						containerClassName: "border-none",
						title: t("title"),
						withFilter: false,
						UserComponent: () => (
							<div className="flex md:flex-row flex-col gap-3 justify-between md:items-end items-start">
								<div className="flex flex-col md:flex-row items-end gap-4">
									<MonthPicker
										onChange={setSelectedMonth}
										label={t("date")}
										value={selectedMonth || undefined}
										className="w-[302px] h-[48px] bg-white"
									/>
									<Button onClick={(e) => setSelectedMonth(null)}>clear</Button>
								</div>

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
										DialogContentComponent={({ closePopup }) => (
											<ExecusePopup closePopUp={closePopup} />
										)}
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
