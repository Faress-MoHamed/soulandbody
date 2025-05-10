"use client";

import React from "react";
import { useAttendance } from "./useAttendance";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";

export default function AttendancePage() {
	const { t } = useTypedTranslation();
	const { data: attendanceData } = useAttendance();

	// Define columns using translations
	const formatDate = (isoString: string) => {
		const date = new Date(isoString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	const columns = [
		{
			accessorKey: "check_in_created_at",
			header: t("attendance.columns.date"),
			cell: ({ row: { original } }: any) => {
				const formatted = formatDate(original?.check_in_created_at);
				return <>{formatted}</>;
			},
		},
		{ accessorKey: "employee", header: t("attendance.columns.employee") },
		{ accessorKey: "check_in_time", header: t("attendance.columns.check_in") },
		{
			accessorKey: "check_out_time",
			header: t("attendance.columns.check_out"),
		},
		{ accessorKey: "notes", header: t("attendance.columns.notes") },
		{ accessorKey: "deduction", header: t("attendance.columns.deduction") },
	];
	return (
		<div>
			<ReusableManyTable
				dataSets={[
					{
						columns,
						data: (attendanceData as any)?.data ?? [],
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
