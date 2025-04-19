"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import {
	useSalesInvoices,
	type SalesInvoice,
} from "../../SalesInvoices/hooks/useSalesInvoices";
import CustomPopUp from "@/components/popups";
import TaxOnProduct from "../../SalesInvoices/components/TaxOnProduct";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import FinalInvoicesTable from "../../SalesInvoices/components/FinalInvoicesTable";

export default function ShowInvoices() {
  const { data: allData,isLoading:allDataWithLoading } = useSalesInvoices();

	const columns: ColumnDef<SalesInvoice>[] = [
		{
			accessorKey: "code",
			header: "الكود",
		},
		{
			accessorKey: "itemName",
			header: "اسم الصنف",
		},
		{
			accessorKey: "quantity",
			header: "الكمية",
		},
		{
			accessorKey: "unit",
			header: "وحدة القياس",
		},
		{
			accessorKey: "saleUnit",
			header: "وحدة البيع",
		},
		{
			accessorKey: "total",
			header: "الإجمالي",
		},
		{
			accessorKey: "discount",
			header: "الخصم",
		},
		{
			accessorKey: "tax",
			header: "الضريبة",
			cell: ({ row }) =>
				row.original.tax === "إضافة ضريبة" ? (
					<CustomPopUp
						DialogTriggerComponent={() => (
							<span
								style={{
									color:
										row.original.tax === "إضافة ضريبة" ? "green" : "inherit",
									cursor: "pointer",
									textDecoration: "underline",
								}}
							>
								عرض الضريبه
							</span>
						)}
						DialogContentComponent={() => <TaxOnProduct />}
					/>
				) : (
					<span>{row.original.tax}</span>
				),
		},
		{
			accessorKey: "totalSale",
			header: "إجمالي البيع",
		},
	];
	return (
		<Card>
			<CardHeader>عرض الفاتورة</CardHeader>
			<CardContent className="p-5">
				<ReusableManyTable
					dataSets={[
						{
							data: allData?.slice(0, 1) || [],
							columns: columns,
							FooterComponent: () => <FinalInvoicesTable withActions={false} />,
							withPrinter: false,
							containerClassName: "bg-white border-none",
							loading: allDataWithLoading,
							// expandableRow: !!selectedInvoice,
						},
					]}
					withTopPrinter={false}
				/>
			</CardContent>
		</Card>
	);
}
