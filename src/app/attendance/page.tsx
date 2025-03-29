"use client";

import ReusableTable from "@/components/ReusableTable";
import React from "react";
import { useAttendance } from "./useAttendance";

export default function page() {
	const { data: attendanceData } = useAttendance();
  console.log(attendanceData);
	const columns = [
		{ accessorKey: "date", header: "التاريخ" },
		{ accessorKey: "employee", header: "الموظف" },
		{ accessorKey: "check_in", header: "تسجيل دخول" },
		{ accessorKey: "check_out", header: "تسجيل خروج" },
		{ accessorKey: "notes", header: "ملاحظات" },
		{ accessorKey: "deduction", header: "خصم" },
	];
	return (
		<div>
			<ReusableTable
				title="سجل الحضور"
				data={attendanceData ?? []}
				columns={columns}
			/>
		</div>
	);
}
