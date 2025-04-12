"use client";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";

export default function page() {
	type EmployeeData = {
		id: number;
		employee: string;
		position: string;
		date: string;
		hours: number;
	};

	const columns: ColumnDef<EmployeeData>[] = [
		{
			accessorKey: "id",
			header: "ID",
		},
		{
			accessorKey: "employee",
			header: "اسم الموظف",
		},
		{
			accessorKey: "position",
			header: "الوظيفة",
		},
		{
			accessorKey: "date",
			header: "التاريخ",
		},
		{
			accessorKey: "hours",
			header: "عدد الساعات",
		},
	];
	const mockData: EmployeeData[] = [
		{ id: 1, employee: "أحمد", position: "محاسب", date: "2025-04", hours: 160 },
		{ id: 2, employee: "ليلى", position: "مديرة", date: "2025-04", hours: 155 },
		{ id: 3, employee: "سعيد", position: "مبرمج", date: "2025-04", hours: 170 },
		{ id: 4, employee: "منى", position: "مصممة", date: "2025-03", hours: 165 },
		{
			id: 5,
			employee: "خالد",
			position: "مدير مشروع",
			date: "2025-03",
			hours: 150,
		},
	];
	const mockData1: EmployeeData[] = [
		{ id: 1, employee: "فارس", position: "محاسب", date: "2025-04", hours: 160 },
		{ id: 2, employee: "ليلى", position: "مديرة", date: "2025-04", hours: 155 },
		{ id: 3, employee: "سعيد", position: "مبرمج", date: "2025-04", hours: 170 },
		{ id: 4, employee: "منى", position: "مصممة", date: "2025-03", hours: 165 },
		{
			id: 5,
			employee: "خالد",
			position: "مدير مشروع",
			date: "2025-03",
			hours: 150,
		},
		{ id: 1, employee: "فارس", position: "محاسب", date: "2025-04", hours: 160 },
		{ id: 2, employee: "ليلى", position: "مديرة", date: "2025-04", hours: 155 },
		{ id: 3, employee: "سعيد", position: "مبرمج", date: "2025-04", hours: 170 },
		{ id: 4, employee: "منى", position: "مصممة", date: "2025-03", hours: 165 },
		{
			id: 5,
			employee: "خالد",
			position: "مدير مشروع",
			date: "2025-03",
			hours: 150,
		},
		{ id: 1, employee: "فارس", position: "محاسب", date: "2025-04", hours: 160 },
		{ id: 2, employee: "ليلى", position: "مديرة", date: "2025-04", hours: 155 },
		{ id: 3, employee: "سعيد", position: "مبرمج", date: "2025-04", hours: 170 },
		{ id: 4, employee: "منى", position: "مصممة", date: "2025-03", hours: 165 },
		{
			id: 5,
			employee: "خالد",
			position: "مدير مشروع",
			date: "2025-03",
			hours: 150,
		},
		{ id: 1, employee: "فارس", position: "محاسب", date: "2025-04", hours: 160 },
		{ id: 2, employee: "ليلى", position: "مديرة", date: "2025-04", hours: 155 },
		{ id: 3, employee: "سعيد", position: "مبرمج", date: "2025-04", hours: 170 },
		{ id: 4, employee: "منى", position: "مصممة", date: "2025-03", hours: 165 },
		{
			id: 5,
			employee: "خالد",
			position: "مدير مشروع",
			date: "2025-03",
			hours: 150,
		},
		{ id: 1, employee: "فارس", position: "محاسب", date: "2025-04", hours: 160 },
		{ id: 2, employee: "ليلى", position: "مديرة", date: "2025-04", hours: 155 },
		{ id: 3, employee: "سعيد", position: "مبرمج", date: "2025-04", hours: 170 },
		{ id: 4, employee: "منى", position: "مصممة", date: "2025-03", hours: 165 },
		{
			id: 5,
			employee: "خالد",
			position: "مدير مشروع",
			date: "2025-03",
			hours: 150,
		},
		{ id: 1, employee: "فارس", position: "محاسب", date: "2025-04", hours: 160 },
		{ id: 2, employee: "ليلى", position: "مديرة", date: "2025-04", hours: 155 },
		{ id: 3, employee: "سعيد", position: "مبرمج", date: "2025-04", hours: 170 },
		{ id: 4, employee: "منى", position: "مصممة", date: "2025-03", hours: 165 },
		{
			id: 5,
			employee: "خالد",
			position: "مدير مشروع",
			date: "2025-03",
			hours: 150,
		},
		{ id: 1, employee: "فارس", position: "محاسب", date: "2025-04", hours: 160 },
		{ id: 2, employee: "ليلى", position: "مديرة", date: "2025-04", hours: 155 },
		{ id: 3, employee: "سعيد", position: "مبرمج", date: "2025-04", hours: 170 },
		{ id: 4, employee: "منى", position: "مصممة", date: "2025-03", hours: 165 },
		{
			id: 5,
			employee: "خالد",
			position: "مدير مشروع",
			date: "2025-03",
			hours: 150,
		},
		{ id: 1, employee: "فارس", position: "محاسب", date: "2025-04", hours: 160 },
		{ id: 2, employee: "ليلى", position: "مديرة", date: "2025-04", hours: 155 },
		{ id: 3, employee: "سعيد", position: "مبرمج", date: "2025-04", hours: 170 },
		{ id: 4, employee: "منى", position: "مصممة", date: "2025-03", hours: 165 },
		{
			id: 5,
			employee: "خالد",
			position: "مدير مشروع",
			date: "2025-03",
			hours: 150,
		},
		{ id: 1, employee: "فارس", position: "محاسب", date: "2025-04", hours: 160 },
		{ id: 2, employee: "ليلى", position: "مديرة", date: "2025-04", hours: 155 },
		{ id: 3, employee: "سعيد", position: "مبرمج", date: "2025-04", hours: 170 },
		{ id: 4, employee: "منى", position: "مصممة", date: "2025-03", hours: 165 },
		{
			id: 5,
			employee: "خالد",
			position: "مدير مشروع",
			date: "2025-03",
			hours: 150,
		},
		{ id: 1, employee: "فارس", position: "محاسب", date: "2025-04", hours: 160 },
		{ id: 2, employee: "ليلى", position: "مديرة", date: "2025-04", hours: 155 },
		{ id: 3, employee: "سعيد", position: "مبرمج", date: "2025-04", hours: 170 },
		{ id: 4, employee: "منى", position: "مصممة", date: "2025-03", hours: 165 },
		{
			id: 5,
			employee: "خالد",
			position: "مدير مشروع",
			date: "2025-03",
			hours: 150,
		},
	];

	const employees = ["أحمد", "ليلى", "سعيد", "منى", "خالد"];
	return (
		<ReusableManyTable
			dataSets={[
				{
					columns,
					data: mockData,
					employees: [
						"أحمد",
						"محمد علي",
						"خالد حسن",
						"ياسر عبد الله",
						"سعيد عمر",
					],
				},
				{
					columns,
					data: mockData1,
					UserComponent: ({ selectedEmployee }: any) => {
						return (
							<div className="p-6 border-t border-x border-[#02140D4D] mb-4 flex lg:flex-row flex-col justify-between in-checked:">
								<p className="text-[26px] font-bold">{"فارس محمد"}</p>
								<p className="text-[24px] font-[500]">
									{" "}
									ساعات الدوام : 15 /64 ساعة
								</p>
							</div>
						);
					},
				},
			]}
		/>
	);
	// return <div></div>;
}
