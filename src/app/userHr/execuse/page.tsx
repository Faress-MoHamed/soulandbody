"use client";

import ReusableManyTable from "@/components/ReusableTableWithManyData";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useExecutions, type ExecuseRecord } from "./hooks/useExecuses";
import { CustomDatePicker } from "@/components/customDatePicker";
import StatusCard from "./components/statuseCards";
import CustomInput from "@/components/customInput";
import CustomPopUp from "@/components/popups";
import AddCustomers from "@/app/companies/Customers/components/AddCustomers";
import AddButton from "@/components/AddButton";
import { MonthPicker } from "@/components/monthPicker";
import InOutPopUp from "./components/InAndOutPopUp";
import ExecusePopup from "./components/execusePopup";

export default function ExecusesPage() {
	const { data: executionsData, isLoading: executionLoading } = useExecutions();
	const columns: ColumnDef<ExecuseRecord>[] = [
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
			header: "وقت الإنتهاء الفعلي",
			accessorKey: "actualEnd",
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
			cell: ({
				row: {
					original: { status },
				},
			}) => {
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
						data: executionsData || [],
						loading: executionLoading,
						withPrinter: true,
						containerClassName: "border-none",
						title: "سجل استاذان",
						withFilter: false,
						UserComponent: () => (
							<div className="flex justify-between items-end">
								<MonthPicker
									label="التاريخ"
									className="w-[302px] h-[48px] bg-white"
								/>
								{new Date().getHours() >= 1 && new Date().getHours() <= 2 ? (
									<AddButton AddTitle="استأذان" onClickAdd={() => {}} />
								) : (
									<CustomPopUp
										DialogTriggerComponent={() => (
											<div className="text-end flex justify-between">
												<AddButton AddTitle="استأذان" onClickAdd={() => {}} />
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
