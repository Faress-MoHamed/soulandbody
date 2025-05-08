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
import { useTypedTranslation } from "@/hooks/useTypedTranslation";

export default function EmployeeManagement({
	saveHandler,
	mode = "edit", // default to edit mode
}: {
	saveHandler?: any;
	mode?: "edit" | "view";
}) {
	const { t } = useTypedTranslation();

	const { data: workHours, isLoading } = useWorkHours();
	const { mutate: toggleWorkDay, isPending: toggleWorkDayPending } =
		useToggleWorkDay();
	const { mutate: updateWorkHours, isPending: updateWorkHoursPending } =
		useUpdateWorkHours();
	const { mutate: updateBreakHours, isPending: updateBreakHoursPending } =
		useUpdateBreakHours();

	const [pendingChanges, setPendingChanges] = useState<Record<string, any>>({});

	const handleChange = (day: string, field: string, value: any) => {
		if (mode !== "edit") return; // Don't allow changes in view mode
		setPendingChanges((prev) => ({
			...prev,
			[day]: {
				...prev[day],
				[field]: value,
			},
		}));
	};

	const handleSave = () => {
		if (mode !== "edit") return; // Don't allow saving in view mode
		Object.entries(pendingChanges).forEach(([day, changes]: any) => {
			if (changes.is_active !== undefined) {
				toggleWorkDay(day);
			}
			if (changes.start_time || changes.end_time) {
				updateWorkHours({
					day,
					startTime:
						changes.start_time ??
						workHours.find((d: { day: any }) => d.day === day)?.start_time,
					endTime:
						changes.end_time ??
						workHours.find((d: { day: any }) => d.day === day)?.end_time,
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
			header: t("workHours.columns.day"),
			enableSorting: false,
		},
		{
			accessorKey: "is_active",
			header: t("workHours.columns.is_active"),
			cell: ({ row }: any) => (
				<Switch
					disabled={mode !== "edit"}
					checked={
						pendingChanges[row.original.day]?.is_active ??
						row.original.work_status === "work"
					}
					onCheckedChange={(checked) =>
						handleChange(row.original.day, "is_active", checked)
					}
				/>
			),
		},
		{
			accessorKey: "work_start_time",
			header: t("workHours.columns.start_time"),
			cell: ({ row }: any) =>
				mode === "edit" ? (
					<input
						type="time"
						value={
							pendingChanges[row.original.day]?.start_time ??
							row.original.work_start_time
						}
						onChange={(e) =>
							handleChange(row.original.day, "start_time", e.target.value)
						}
					/>
				) : (
					<span>{row.original.start_time || "-"}</span>
				),
		},
		{
			accessorKey: "work_end_time",
			header: t("workHours.columns.end_time"),
			cell: ({ row }: any) =>
				mode === "edit" ? (
					<input
						type="time"
						value={
							pendingChanges[row.original.day]?.end_time ??
							row.original.work_end_time
						}
						onChange={(e) =>
							handleChange(row.original.day, "work_end_time", e.target.value)
						}
					/>
				) : (
					<span>{row.original.end_time || "-"}</span>
				),
		},
		{
			accessorKey: "break_hours",
			header: t("workHours.columns.break_hours"),
			cell: ({ row }: any) =>
				mode === "edit" ? (
					<input
						type="number"
						className="max-w-[80px]"
						value={
							pendingChanges[row.original.day]?.break_hours ??
							row.original.break_time
						}
						onChange={(e) =>
							handleChange(row.original.day, "break_time", +e.target.value)
						}
					/>
				) : (
					<span>{row.original.break_time || "0"}</span>
				),
		},
	];
	console.log(workHours);

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
				data={workHours?.data ||[]}
				title={t("workHours.title")}
			/>
			{mode === "edit" && (
				<Button
					type="submit"
					className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md mt-2"
					onClick={() => {
						console.log(pendingChanges);

						// handleSave();
						// saveHandler?.();
					}}
					disabled={Object.keys(pendingChanges).length === 0 && !saveHandler}
				>
					{t("workHours.save")}
				</Button>
			)}
		</div>
	);
}
