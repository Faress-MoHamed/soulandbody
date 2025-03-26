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
import { useWorkHours } from "./useWorkHours";
import SmallTable from "@/components/smallTable";

export default function EmployeeManagement() {
	const {
		workHours,
		updateWorkHours,
		toggleWorkDay,
		updateBreakHours,
		refreshWorkHours,
		loading,
		error,
	} = useWorkHours();


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
						updateWorkHours(
							row.original.day,
							e.target.value,
							row.original.end_time
						)
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
						updateWorkHours(
							row.original.day,
							row.original.start_time,
							e.target.value
						)
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
					onChange={(e) => updateBreakHours(row.original.day, +e.target.value)}
				/>
			),
		},
	];
	console.log("workHours:", workHours);
	useEffect(() => {
		refreshWorkHours();
	}, []);
	return (
		<div className="">
			{/* <h1 className="text-2xl font-bold mb-4 text-right">الموظفين</h1>

			<div className="bg-white p-6 rounded-lg shadow-sm">
				<div className="flex justify-between mb-4">
					<Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
						الملاحظات
					</Button>
				</div>

				<div className="grid grid-cols-3 gap-6 mb-8">
					<div>
						<label className="block text-sm font-medium text-right mb-1">
							الاسم
						</label>
						<Input placeholder="محمد أحمد" className="text-right" />
					</div>

					<div>
						<label className="block text-sm font-medium text-right mb-1">
							تاريخ الميلاد
						</label>
						<Input
							type="date"
							defaultValue="2023-01-01"
							className="text-right"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-right mb-1">
							الوظيفة
						</label>
						<Input placeholder="مهندس برمجيات" className="text-right" />
					</div>

					<div>
						<label className="block text-sm font-medium text-right mb-1">
							القسم
						</label>
						<Input placeholder="تكنولوجيا المعلومات" className="text-right" />
					</div>

					<div>
						<label className="block text-sm font-medium text-right mb-1">
							تاريخ بدء العمل
						</label>
						<Input
							type="date"
							defaultValue="2023-10-17"
							className="text-right"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-right mb-1">
							طبيعة العمل
						</label>
						<Select defaultValue="fulltime">
							<SelectTrigger className="text-right">
								<SelectValue placeholder="اختر طبيعة العمل" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="fulltime">دوام كامل</SelectItem>
								<SelectItem value="parttime">دوام جزئي</SelectItem>
								<SelectItem value="remote">عن بعد</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div>
						<label className="block text-sm font-medium text-right mb-1">
							إجمالي الراتب
						</label>
						<Input type="number" defaultValue="2500" className="text-right" />
					</div>

					<div>
						<label className="block text-sm font-medium text-right mb-1">
							الراتب
						</label>
						<Input type="number" defaultValue="2500" className="text-right" />
					</div>
				</div> */}
			<SmallTable
				loading={loading}
				columns={columns}
				data={workHours}
				title="ساعات الدوام"
			/>
			{/* <div className="mb-4">
					<h2 className="text-lg font-medium mb-2 text-right">مواعيد الدوام</h2>

					<div className="border rounded-md overflow-hidden">
						<table className="w-full">
							<thead>
								<tr className="bg-gray-50">
									<th className="py-2 px-4 text-right">اليوم</th>
									<th className="py-2 px-4 text-right">بداية الدوام</th>
									<th className="py-2 px-4 text-right">دوام</th>
									<th className="py-2 px-4 text-right">نهاية الدوام</th>
								</tr>
							</thead>
							<tbody>
								<tr className="border-t">
									<td className="py-3 px-4 text-right">السبت</td>
									<td className="py-3 px-4 text-right">16:00</td>
									<td className="py-3 px-4">
										<div className="flex justify-end">
											<Switch
												checked={workDays.saturday}
												onCheckedChange={() => handleWorkDayChange("saturday")}
											/>
										</div>
									</td>
									<td className="py-3 px-4 text-right">20:00</td>
								</tr>
								<tr className="border-t">
									<td className="py-3 px-4 text-right">الأحد</td>
									<td className="py-3 px-4 text-right">16:00</td>
									<td className="py-3 px-4">
										<div className="flex justify-end">
											<Switch
												checked={workDays.sunday}
												onCheckedChange={() => handleWorkDayChange("sunday")}
											/>
										</div>
									</td>
									<td className="py-3 px-4 text-right">20:00</td>
								</tr>
								<tr className="border-t">
									<td className="py-3 px-4 text-right">الإثنين</td>
									<td className="py-3 px-4 text-right">16:00</td>
									<td className="py-3 px-4">
										<div className="flex justify-end">
											<Switch
												checked={workDays.monday}
												onCheckedChange={() => handleWorkDayChange("monday")}
											/>
										</div>
									</td>
									<td className="py-3 px-4 text-right">20:00</td>
								</tr>
								<tr className="border-t">
									<td className="py-3 px-4 text-right">الثلاثاء</td>
									<td className="py-3 px-4 text-right">16:00</td>
									<td className="py-3 px-4">
										<div className="flex justify-end">
											<Switch
												checked={workDays.tuesday}
												onCheckedChange={() => handleWorkDayChange("tuesday")}
											/>
										</div>
									</td>
									<td className="py-3 px-4 text-right">20:00</td>
								</tr>
								<tr className="border-t">
									<td className="py-3 px-4 text-right">الأربعاء</td>
									<td className="py-3 px-4 text-right">16:00</td>
									<td className="py-3 px-4">
										<div className="flex justify-end">
											<Switch
												checked={workDays.wednesday}
												onCheckedChange={() => handleWorkDayChange("wednesday")}
											/>
										</div>
									</td>
									<td className="py-3 px-4 text-right">20:00</td>
								</tr>
								<tr className="border-t">
									<td className="py-3 px-4 text-right">الخميس</td>
									<td className="py-3 px-4 text-right">16:00</td>
									<td className="py-3 px-4">
										<div className="flex justify-end">
											<Switch
												checked={workDays.thursday}
												onCheckedChange={() => handleWorkDayChange("thursday")}
											/>
										</div>
									</td>
									<td className="py-3 px-4 text-right">20:00</td>
								</tr>
								<tr className="border-t">
									<td className="py-3 px-4 text-right">الجمعة</td>
									<td className="py-3 px-4 text-right">16:00</td>
									<td className="py-3 px-4">
										<div className="flex justify-end">
											<Switch
												checked={workDays.friday}
												onCheckedChange={() => handleWorkDayChange("friday")}
											/>
										</div>
									</td>
									<td className="py-3 px-4 text-right">20:00</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div> */}
		</div>
		// </div>
	);
}
