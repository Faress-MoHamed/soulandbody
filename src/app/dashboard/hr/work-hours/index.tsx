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
import { ColumnDef } from "@tanstack/react-table";

export default function EmployeeManagement({
	saveHandler,
	mode = "edit", // default to edit mode
}: {
	saveHandler?: any;
	mode?: "edit" | "view";
}) {
	const { t } = useTypedTranslation();
	const { data: workHours, isLoading } = useWorkHours();
	const updateWorkHours = useUpdateWorkHours();
	const [pendingChanges, setPendingChanges] = useState<Record<string, any>>({});

	const handleChange = (day: string, field: string, value: any) => {
		if (mode !== "edit") return;
		setPendingChanges((prev) => ({
			...prev,
			[day]: {
				...prev[day],
				[field]: value,
			},
		}));
	};

	const handleSave = () => {
		if (mode !== "edit") return;
		Object.entries(pendingChanges).forEach(([day, changes]: any) => {
			const original = workHours?.data.find((d: { day: string }) => d.day === day) || {};

			updateWorkHours.mutate({
				id:original.id,
				day,
				work_start_time: changes.work_start_time ?? original.work_start_time,
				work_end_time: changes.work_end_time ?? original.work_end_time,
				break_start_time: original.break_start_time,
				break_end_time: original.break_end_time,
				break_time: changes.break_time ?? original.break_time,
				work_status:
					changes.is_active !== undefined
						? changes.is_active
							? "work"
							: "dayoff"
						: original.work_status,
			});
		});
		setPendingChanges({});
	};

	const columns:ColumnDef<any>[] = [
		{
			accessorKey: "day",
			header: t("workHours.columns.day"),
			enableSorting: false,
			cell:({ row }: any) =>{return <>{row.original.day}
							<input
						type="hidden"
						value={
							pendingChanges[row.original.day]?.id ??
							row.original.id
						}
						onChange={(e) =>
							handleChange(row.original.day, "id", e.target.value)
						}
					/></>}
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
							pendingChanges[row.original.day]?.work_start_time ??
							row.original.work_start_time
						}
						onChange={(e) =>
							handleChange(row.original.day, "work_start_time", e.target.value)
						}
					/>
				) : (
					<span>{row.original.work_start_time || "-"}</span>
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
							pendingChanges[row.original.day]?.work_end_time ??
							row.original.work_end_time
						}
						onChange={(e) =>
							handleChange(row.original.day, "work_end_time", e.target.value)
						}
					/>
				) : (
					<span>{row.original.work_end_time || "-"}</span>
				),
		},
		{
			accessorKey: "break_time",
			header: t("workHours.columns.break_hours"),
			cell: ({ row }: any) =>
				mode === "edit" ? (
					<input
						type="number"
						className="max-w-[80px]"
						value={
							pendingChanges[row.original.day]?.break_time ??
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

	return (
		<div>
			<SmallTable
				loading={isLoading || updateWorkHours.isPending}
				columns={columns}
				data={workHours?.data || []}
				title={t("workHours.title")}
			/>
			{mode === "edit" && (
				<Button
					type="submit"
					className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md mt-2"
					onClick={() => {
						console.log(pendingChanges);
						handleSave();
						saveHandler?.();
					}}
					disabled={Object.keys(pendingChanges).length === 0 && !saveHandler}
				>
					{t("workHours.save")}
				</Button>
			)}
		</div>
	);
}
