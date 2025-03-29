"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import SmallTable from "@/components/smallTable";
import {
	useToggleWorkDay,
	useUpdateBreakHours,
	useUpdateWorkHours,
	useWorkHours,
} from "./useWorkHours";

export default function EmployeeManagement() {
	const { data: workHours, isLoading, error } = useWorkHours();
	const { mutate: toggleWorkDay, isPending: toggleWorkDayPending } =
		useToggleWorkDay();
	const { mutate: updateWorkHours, isPending: updateWorkHoursPending } =
		useUpdateWorkHours();
	const { mutate: updateBreakHours, isPending: updateBreakHoursPending } =
		useUpdateBreakHours();

	const [pendingChanges, setPendingChanges] = useState<Record<string, any>>({});

	// Function to handle changes in state
	const handleChange = (day: string, field: string, value: any) => {
		setPendingChanges((prev) => ({
			...prev,
			[day]: {
				...prev[day],
				[field]: value,
			},
		}));
	};

	// Function to save changes
	const handleSave = () => {
		Object.entries(pendingChanges).forEach(([day, changes]: any) => {
			if (changes.is_active !== undefined) {
				toggleWorkDay(day);
			}
			if (changes.start_time || changes.end_time) {
				updateWorkHours({
					day,
					startTime:
						changes.start_time ??
						workHours.find((d: { day: any; }) => d.day === day)?.start_time,
					endTime:
						changes.end_time ?? workHours.find((d: { day: any; }) => d.day === day)?.end_time,
				});
			}
			if (changes.break_hours !== undefined) {
				updateBreakHours({
					day,
					breakHours: changes.break_hours,
				});
			}
		});
		setPendingChanges({});
	};

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
					checked={
						pendingChanges[row.original.day]?.is_active ??
						row.original.is_active
					}
					onCheckedChange={(checked) =>
						handleChange(row.original.day, "is_active", checked)
					}
				/>
			),
		},
		{
			accessorKey: "start_time",
			header: "بداية الدوام",
			cell: ({ row }: any) => (
				<input
					type="time"
					value={
						pendingChanges[row.original.day]?.start_time ??
						row.original.start_time
					}
					onChange={(e) =>
						handleChange(row.original.day, "start_time", e.target.value)
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
					value={
						pendingChanges[row.original.day]?.end_time ?? row.original.end_time
					}
					onChange={(e) =>
						handleChange(row.original.day, "end_time", e.target.value)
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
					className="max-w-[80px]"
					value={
						pendingChanges[row.original.day]?.break_hours ??
						row.original.break_hours
					}
					onChange={(e) =>
						handleChange(row.original.day, "break_hours", +e.target.value)
					}
				/>
			),
		},
	];

	return (
		<div>
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
			<Button
				className="mt-4"
				onClick={handleSave}
				disabled={Object.keys(pendingChanges).length === 0}
			>
				حفظ التغييرات
			</Button>
		</div>
	);
}
