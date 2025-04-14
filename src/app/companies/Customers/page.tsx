"use client";
import AddButton from "@/components/AddButton";
import CustomPopUp from "@/components/popups";
import ReusableTable from "@/components/ReusableTable";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import AddNewEmployee from "../Employees/component/AddNewEmployee";
import { Button } from "@/components/ui/button";
import AddCustomers from "./components/AddCustomers";
type Client = {
	name: string;
	phone: string;
	address: string;
	sales: string;
};

function generateClientTableRows(rowCount = 100): Client[] {
	const names = [
		"أحمد",
		"سارة",
		"محمد",
		"فاطمة",
		"يوسف",
		"ليلى",
		"خالد",
		"هند",
		"سلمان",
		"نورة",
	];
	const phones = [
		"0501234567",
		"0559876543",
		"0541122334",
		"0539988776",
		"0566655443",
	];
	const addresses = [
		"الرياض",
		"جدة",
		"الدمام",
		"مكة",
		"المدينة",
		"أبها",
		"الطائف",
		"بريدة",
	];
	const sales = [
		"عميل مميز",
		"عميل دائم",
		"خصم خاص",
		"دفع نقدي",
		"فاتورة مؤجلة",
		"عميل جديد",
	];

	const rows: Client[] = [];

	for (let i = 0; i < rowCount; i++) {
		const row = {
			name: names[Math.floor(Math.random() * names.length)],
			phone: phones[Math.floor(Math.random() * phones.length)],
			address: addresses[Math.floor(Math.random() * addresses.length)],
			sales: "5+1",
		};

		rows.push(row);
	}

	return rows;
}

const columns: ColumnDef<Client>[] = [
	{
		accessorKey: "name",
		header: "اسم العميل",
	},
	{
		accessorKey: "phone",
		header: "الهاتف",
	},
	{
		accessorKey: "address",
		header: "العنوان",
	},
	{
		accessorKey: "sales",
		header: "خصومات العميل",
	},
	{
		header: "خيارات",
		cell: ({ row }) => {
			return (
				<div className="flex justify-center gap-1 ">
					<Button
						// onClick={() => onEdit(row?.original?.id)}
						className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F]   hover:bg-white hover:opacity-70 h-[32px] w-[83px] rounded-[8px] border border-[#16C47F]"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-pencil"
						>
							<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
							<path d="m15 5 4 4" />
						</svg>
						تعديل
					</Button>
					<Button
						// onClick={() => onDelete(row?.original?.id)}
						className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619]   hover:bg-white hover:opacity-70 h-[32px] w-[83px] rounded-[8px] border border-[#C41619]"
					>
						<>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="lucide lucide-trash-2"
							>
								<path d="M3 6h18" />
								<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
								<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
								<line x1="10" x2="10" y1="11" y2="17" />
								<line x1="14" x2="14" y1="11" y2="17" />
							</svg>
							حذف
						</>
					</Button>
				</div>
			);
		},
	},
];

export default function CustomersPage() {
	const data = generateClientTableRows(10);

	return (
		<ReusableTable
			title="العملاء"
			withFilter={false}
			ButtonTrigger={() => (
				<CustomPopUp
					DialogTriggerComponent={() => (
						<div className="text-end flex justify-between">
							<AddButton AddTitle="اضافة عميل" onClickAdd={() => {}} />
						</div>
					)}
					DialogContentComponent={() => <AddCustomers />}
				/>
			)}
			data={data}
			columns={columns}
		/>
	);
}
