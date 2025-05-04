"use client";

import ReusableManyTable from "@/components/ReusableTableWithManyData";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import {
	useUserAttendance,
	type UserAttendance,
} from "./hooks/useAttendanceForUser";
import { MonthPicker } from "@/components/monthPicker";
import CustomPopUp from "@/components/popups";
import AddButton from "@/components/AddButton";
import { useTranslations } from "next-intl";

export default function UserAttendacePage() {
	const { data: userAttendanceData, isLoading: userAttendanceLoading } =
		useUserAttendance();

	const t = useTranslations("userAttendance"); // adjust key to your i18n namespace

	const columns: ColumnDef<UserAttendance>[] = [
		{
			header: t("date"),
			accessorKey: "date",
		},
		{
			header: t("arrivalTime"),
			accessorKey: "arrivalTime",
		},
		{
			header: t("leaveTime"),
			accessorKey: "leaveTime",
		},
		{
			header: t("execuseTotalTime"),
			accessorKey: "execuseTotalTime",
		},
		{
			header: t("breakTotalTime"),
			accessorKey: "breakTotalTime",
		},
		{
			header: t("execuseNoteDeduction"),
			accessorKey: "execuseNoteDeduction",
		},
		{
			header: "الخصم",
			accessorKey: "deduction",
		},
	];
	return (
		<div>
			<ReusableManyTable
				dataSets={[
					{
						columns,
						data: userAttendanceData || [],
						loading: userAttendanceLoading,
						withPrinter: true,
						containerClassName: "border-none",
						title: "سجلات حضور الموظفين",
						withFilter: false,
						UserComponent: () => (
							<div className="flex md:flex-row flex-col gap-3 justify-between md:items-end items-start">
								<MonthPicker
									label={t("date")}
									className="w-[302px] h-[48px] bg-white"
								/>
								{/* {new Date().getHours() >= 1 && new Date().getHours() <= 2 ? (
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
								)} */}
							</div>
						),
					},
				]}
				withTopPrinter={false}
			/>
		</div>
	);
}
