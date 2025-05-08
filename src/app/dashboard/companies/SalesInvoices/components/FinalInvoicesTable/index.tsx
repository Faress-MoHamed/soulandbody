"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	type ColumnDef,
} from "@tanstack/react-table";
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
import CashPayment from "../cashPopup";
import Transaction from "../Transaction";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";

interface InvoiceItem {
	totalInvoice: string;
	totalDiscount: string;
	totalVAT: string;
	totalTableTax: string;
	totalDiscountAndAdditionTax: string;
	netInvoice: string;
	paymentMethod: string;
}
export default function FinalInvoicesTable({
	withActions = true,
	data = [],
  }: {
	withActions?: boolean;
	data: InvoiceItem[];
  }) {
	const { t } = useTypedTranslation();
  
	const paymentMethods = [
	  { value: "نقدي", label: t("salesInvoicesTable.invoiceSmallTable.cash") },
	  {
		value: "تحويل بنكي",
		label: t("salesInvoicesTable.invoiceSmallTable.bankTransfer"),
	  },
	];
  
	const [selectedType, setSelectedType] = useState(paymentMethods[0].value);
  
	const columns: ColumnDef<InvoiceItem>[] = [
	  {
		accessorKey: "totalInvoice",
		header: t("salesInvoicesTable.invoiceSmallTable.totalInvoice"),
	  },
	  {
		accessorKey: "totalDiscount",
		header: t("salesInvoicesTable.invoiceSmallTable.totalDiscount"),
	  },
	  {
		accessorKey: "totalVAT",
		header: t("salesInvoicesTable.invoiceSmallTable.totalVAT"),
	  },
	  {
		accessorKey: "totalTableTax",
		header: t("salesInvoicesTable.invoiceSmallTable.totalTableTax"),
	  },
	  {
		accessorKey: "totalDiscountAndAdditionTax",
		header: t("salesInvoicesTable.invoiceSmallTable.discountAndAdditionTax"),
	  },
	  {
		accessorKey: "netInvoice",
		header: t("salesInvoicesTable.invoiceSmallTable.netInvoice"),
	  },
	 
	];
  
	const table = useReactTable({
	  data,
	  columns,
	  getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="w-full flex flex-col gap-4 p-4">
			<Card className="border-none rounded-md">
				<div className="w-full overflow-auto">
					<table className="w-full caption-bottom text-sm border border-[#B9EDD9] rounded-[4px]">
						<thead>
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<th
											key={header.id}
											className="text-[16px] text-start font-[500] px-3 py-[10px] w-[187px] h-[62px] bg-[#00000014] border-t align-top border-l border-[#B9EDD9] text-nowrap"
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
										className="transition-colors hover:bg-muted/50"
									>
										{row.getVisibleCells().map((cell) => (
											<td
												key={cell.id}
												className="px-3 py-[10px] text-start align-middle text-[12px] border-t border-l border-[#B9EDD9]"
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
										{t("salesInvoicesTable.invoiceSmallTable.noResults")}
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</Card>

		

			{withActions && (
				<div className="self-end flex gap-2">
					<CustomPopUp
						DialogTriggerComponent={() => (
							<Button className="px-3 py-[10px] w-[148px] h-[44px] bg-[#16C47F] hover:bg-[#16C47F]/70">
								{t("salesInvoicesTable.invoiceSmallTable.saveInvoice")}
							</Button>
						)}
						DialogContentComponent={() =>
							selectedType === "نقدي" ? <CashPayment /> : <Transaction />
						}
					/>
					<Button
						variant="outline"
						className="px-3 py-[10px] w-[148px] h-[44px] border-[#16C47F]"
					>
						{t("salesInvoicesTable.invoiceSmallTable.cancel")}
					</Button>
				</div>
			)}
		</div>
	);
}
