"use client";

import ReusableTable from "@/components/ReusableTable";
import React from "react";
import { useAttendance } from "./useAttendance";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";

export default function AttendancePage() {
	const { t } = useTypedTranslation();
	const { data: attendanceData } = useAttendance();

	// Define columns using translations
	const columns = [
		{ accessorKey: "date", header: t("attendance.columns.date") },
		{ accessorKey: "employee", header: t("attendance.columns.employee") },
		{ accessorKey: "check_in", header: t("attendance.columns.check_in") },
		{ accessorKey: "check_out", header: t("attendance.columns.check_out") },
		{ accessorKey: "notes", header: t("attendance.columns.notes") },
		{ accessorKey: "deduction", header: t("attendance.columns.deduction") },
	];

	return (
		<div>
			<ReusableManyTable
				dataSets={[
					{
						columns,
						data: (attendanceData as any) ?? [],
						title: t("attendance.title"),
						withFilter: false,
						withPrinter: true,
						containerClassName: "border-none",
					},
				]}
				withTopPrinter={false}
			/>
		</div>
	);
}
