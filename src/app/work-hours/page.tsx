"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	useToggleWorkDay,
	useUpdateBreakHours,
	useUpdateWorkHours,
	useWorkHours,
} from "./useWorkHours";
import SmallTable from "@/components/smallTable";

export default function EmployeeManagement() {
	// const {
	// 	workHours,
	// 	updateWorkHours,
	// 	toggleWorkDay,
	// 	updateBreakHours,
	// 	refreshWorkHours,
	// 	loading,
	// 	error,
	// } = useWorkHours();

	const { data: workHours, isLoading, error } = useWorkHours();
	const { mutate: toggleWorkDay, isPending: toggleWorkDayPending } =
		useToggleWorkDay();
	const { mutate: updateWorkHours, isPending: updateWorkHoursPending } =
		useUpdateWorkHours();
	const { mutate: updateBreakHours, isPending: updateBreakHoursPending } =
		useUpdateBreakHours();

	const columns = [
		{
			accessorKey: "day",
			header: "اليوم",
			enableSorting: false,
		},
		{
			accessorKey: "is_active",
			header: "دوام",
			cell: ({ row }: any) => (
				<Switch
					checked={row.original.is_active}
					onCheckedChange={() => toggleWorkDay(row.original.day)}
				/>
				// <button onClick={() => toggleWorkDay(row.original.day)}>
				// 	{row.original.is_active ? "✅" : "❌"}
				// </button>
			),
		},
		{
			accessorKey: "start_time",
			header: "بداية الدوام",
			cell: ({ row }: any) => (
				<input
					type="time"
					defaultValue={row.original.start_time}
					onChange={(e) =>
						updateWorkHours({
							day: row.original.day,
							startTime: e.target.value,
							endTime: row.original.end_time,
						})
					}
				/>
			),
		},
		{
			accessorKey: "end_time",
			header: "انتهاء الدوام",
			cell: ({ row }: any) => (
				<input
					type="time"
					defaultValue={row.original.end_time}
					onChange={(e) =>
						updateWorkHours({
							day: row.original.day,
							endTime: e.target.value,
							startTime: row.original.start_time,
						})
					}
				/>
			),
		},
		{
			accessorKey: "break_hours",
			header: "الراحه",
			cell: ({ row }: any) => (
				<input
					type="number"
					className="max-w-[80px] justify-se"
					defaultValue={row.original.break_hours}
					onChange={(e) =>
						updateBreakHours({
							day: row.original.day,
							breakHours: +e.target.value,
						})
					}
				/>
			),
		},
	];

	return (
		<div className="">
			<SmallTable
				loading={
					isLoading ||
					toggleWorkDayPending ||
					updateWorkHoursPending ||
					updateBreakHoursPending
				}
				columns={columns}
				data={workHours}
				title="ساعات الدوام"
			/>
		</div>
		// </div>
	);
}
