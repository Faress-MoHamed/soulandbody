"use client";

import ReusableManyTable from "@/components/ReusableTableWithManyData";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useBreakTime, type ExecuseRecord } from "./hooks/useBreakTime";
import { CustomDatePicker } from "@/components/customDatePicker";
import CustomInput from "@/components/customInput";
import CustomPopUp from "@/components/popups";
import AddCustomers from "@/app/companies/Customers/components/AddCustomers";
import AddButton from "@/components/AddButton";
import { MonthPicker } from "@/components/monthPicker";
import ExecusePopup from "./components/execusePopup";
import StatusCard from "../execuse/components/statuseCards";

export default function ExecusesPage() {
	const { data: breakTimeData, isLoading: breakTimeLoading } = useBreakTime();
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
						data: breakTimeData || [],
						loading: breakTimeLoading,
						withPrinter: true,
						containerClassName: "border-none",
						title: "سجل الراحة",
						withFilter: false,
						UserComponent: () => (
							<div className="flex md:flex-row flex-col gap-3 justify-between md:items-end items-start">
								<MonthPicker
									label="التاريخ"
									className="w-[302px] h-[48px] bg-white"
								/>
								{new Date().getHours() >= 1 && new Date().getHours() <= 2 ? (
									<AddButton AddTitle="طلب راحة" onClickAdd={() => {}} />
								) : (
									<CustomPopUp
										DialogTriggerComponent={() => (
											<div className="text-end flex justify-between">
												<AddButton AddTitle="طلب راحة" onClickAdd={() => {}} />
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
