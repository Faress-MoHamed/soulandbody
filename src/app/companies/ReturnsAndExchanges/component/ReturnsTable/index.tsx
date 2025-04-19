"use client";

import { useState } from "react";
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	type ColumnDef,
} from "@tanstack/react-table";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import CustomPopUp from "@/components/popups";
import CashPayment from "@/app/companies/SalesInvoices/components/cashPopup";
import Transaction from "@/app/companies/SalesInvoices/components/Transaction";

interface InvoiceItem {
	totalInvoice: string;
	totalDiscount: string;
	totalVAT: string;
	totalTableTax: string;
	totalDiscountAndAdditionTax: string;
	netInvoice: string;
	paymentMethod: string;
}

export default function ReturnsTable() {
	const t = useTranslations("returnsTable");

	const [data, setData] = useState<InvoiceItem[]>([
		{
			totalInvoice: "5454",
			totalDiscount: "15",
			totalVAT: "15",
			totalTableTax: "15",
			totalDiscountAndAdditionTax: "300 ج.م",
			netInvoice: "1850 ج.م",
			paymentMethod: t("paymentMethods.cash"),
		},
	]);

	const paymentMethods = [
		{ value: t("paymentMethods.cash"), label: t("paymentMethods.cash") },
		{
			value: t("paymentMethods.bankTransfer"),
			label: t("paymentMethods.bankTransfer"),
		},
	];
	const [selectedType, setSelectedType] = useState(paymentMethods[0].value);

	const columns: ColumnDef<InvoiceItem>[] = [
		{
			accessorKey: "totalInvoice",
			header: t("columns.totalInvoice"),
		},
		{
			accessorKey: "totalDiscount",
			header: t("columns.totalDiscount"),
		},
		{
			accessorKey: "totalVAT",
			header: t("columns.totalVAT"),
		},
		{
			accessorKey: "totalTableTax",
			header: t("columns.totalTableTax"),
		},
		{
			accessorKey: "totalDiscountAndAdditionTax",
			header: t("columns.totalDiscountAndAdditionTax"),
		},
		{
			accessorKey: "netInvoice",
			header: t("columns.netInvoice"),
		},
		{
			accessorKey: "paymentMethod",
			header: t("columns.paymentMethod"),
			cell: ({ row }) => {
				return (
					<Select
						value={selectedType}
						onValueChange={(value) => {
							setSelectedType(value);
						}}
					>
						<SelectTrigger className="w-[180px] border-none shadow-none focus-visible:ring-0">
							<SelectValue placeholder={t("columns.paymentMethod")} />
						</SelectTrigger>
						<SelectContent>
							{paymentMethods.map((method) => (
								<SelectItem key={method.value} value={method.value}>
									{method.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				);
			},
		},
	];

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="w-full flex flex-col gap-4">
			<Card className="border-none rounded-md">
				<div className="w-full overflow-auto">
					<table className="w-full caption-bottom text-sm border border-[#B9EDD9] rounded-[4px]">
						<thead className="">
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<th
											key={header.id}
											className="text-[16px] text-start font-[500] px-3 py-[10px] w-[187px] h-[62px] bg-[#00000014] border-t align-top border-l border-[#B9EDD9]"
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<tr
										key={row.id}
										className=" transition-colors hover:bg-muted/50"
									>
										{row.getVisibleCells().map((cell) => (
											<td
												key={cell.id}
												className="px-3 py-[10px] align-middle text-center text-[12px] border-t border-l border-[#B9EDD9]"
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</td>
										))}
									</tr>
								))
							) : (
								<tr>
									<td colSpan={columns.length} className="h-24 text-center">
										{t("noResults")}
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</Card>
			<div className="flex gap-6">
				<p>{t("receiptNumber")}: 2542554854891</p>
				<p>{t("amount")}: 5000</p>
			</div>
			<div className="self-end flex gap-2">
				<CustomPopUp
					DialogTriggerComponent={() => (
						<Button className="px-3 py-[10px] w-[148px] h-[44px] bg-[#16C47F] hover:bg-[#16C47F]/70">
							{t("buttons.saveInvoice")}
						</Button>
					)}
					DialogContentComponent={() =>
						selectedType === t("paymentMethods.cash") ? (
							<CashPayment />
						) : (
							<Transaction />
						)
					}
				/>
				<Button
					variant={"outline"}
					className="px-3 py-[10px] w-[148px] h-[44px] border-[#16C47F]"
				>
					{t("buttons.cancel")}
				</Button>
			</div>
		</div>
	);
}
