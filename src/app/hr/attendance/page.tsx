"use client";

import React from "react";
import { useAttendance } from "./useAttendance";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { parseISO, format } from "date-fns";

export default function AttendancePage() {
	const { t } = useTypedTranslation();
	const { data: attendanceData } = useAttendance();

	// Define columns using translations
	const columns = [
		{
			accessorKey: "check_in_created_at",
			header: t("attendance.columns.date"),
			cell: ({ row: { original } }: any) => {
				const parsedDate = parseISO(original?.check_in_created_at);

				const formatted = format(parsedDate, "yyyy-MM-dd");
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
