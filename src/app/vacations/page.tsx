"use client";
import React from "react";
import ReusableTable from "@/components/ReusableTable";

const columns = [
	{ accessorKey: "date", header: "التاريخ" },
	{ accessorKey: "employee", header: "الموظف" },
	{ accessorKey: "fromTime", header: "من" },
	{ accessorKey: "toTime", header: "إلى" },
	{ accessorKey: "duration", header: "مدة الاستئذان" },
	{ accessorKey: "reason", header: "السبب" },
	{ accessorKey: "discount", header: "الخصم" },
];

const data: any = Array.from({ length: 100 }, (_, i) => ({
	id: i + 1,
	date: `12/${(i % 30) + 1}/2023`, // Unique day for variation
	employee: i % 2 === 0 ? "Ahmed Mahmoud" : "Mohamed Ali",
	fromTime: `${(i % 12) + 1}:00 ${i % 2 === 0 ? "م" : "ص"}`, // Alternating AM/PM
	toTime: `${((i + 1) % 12) + 1}:00 ${i % 2 === 0 ? "م" : "ص"}`,
	duration: `${(i % 9) + 1}:00`,
	reason: i % 3 === 0 ? "معاد طبي" : i % 3 === 1 ? "اجتماع" : "ظرف طارئ",
	discount: `${100 + (i % 50) * 5}`, // Varying discount
	even: i % 2 === 0,
}));
export default function Page() {
	return <ReusableTable columns={columns} data={data} title="سجل الاستئذان" />;
}
