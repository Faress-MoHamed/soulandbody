"use client";
import ReusableTable from "@/components/ReusableTable";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";

type Branch = {
	branch: string;
	address: string;
	phone: string;
	remaining: number;
};
export default function OtherBranches() {
	const getBranchesData = () => {
		const basePhone = "01021212";
		const floors = [
			"الدور الأول",
			"الدور الثاني",
			"الدور الثالث",
			"الدور الرابع",
			"الدور الخامس",
			"الدور السادس",
			"الدور السابع",
			"الدور الثامن",
			"الدور التاسع",
			"الدور العاشر",
		];

		const branchData = Array.from({ length: 10 }, (_, i) => {
			return {
				branch: "مول مصر",
				address: `مول مصر ${floors[i]}`,
				phone: `${basePhone}${10 + i}`, // e.g., 0102121210, 0102121211...
				remaining: Math.floor(Math.random() * 10), // 0 - 9
			};
		});

		return branchData;
	};

	const branches = getBranchesData();
	const columns: ColumnDef<Branch>[] = [
		{
			accessorKey: "branch",
			header: "اسم الفرع",
			// cell: ({ row }) => (
			// 	<div className="text-right">{row.getValue("branch")}</div>
			// ),
		},
		{
			accessorKey: "address",
			header: "العنوان",
			// cell: ({ row }) => (
			// 	<div className="text-right">{row.getValue("address")}</div>
			// ),
		},
		{
			accessorKey: "phone",
			header: "رقم الهاتف",
			// cell: ({ row }) => (
			// 	<div className="text-right">{row.getValue("phone")}</div>
			// ),
		},
		{
			accessorKey: "remaining",
			header: "العدد المتبقي",
			// cell: ({ row }) => (
			// 	<div className="text-center">{row.getValue("remaining")}</div>
			// ),
		},
	];
	return (
		<div className="flex flex-col gap-6">
			<ReusableTable
				withPrinter={false}
				containerClassName="md:w-[943px] pt-[35px] pr-[51px] pb-[60px] pl-[67px]"
				data={branches}
				UserComponent={() => <p className=" pb-6 text-start font-[500] text-[24px]">لاب توب </p>}
				columns={columns}
			/>
		</div>
	);
}
