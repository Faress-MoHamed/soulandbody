"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";

import CustomPopUp from "@/components/popups";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import {
	useSalesInvoices,
	type SalesInvoice,
} from "@/app/dashboard/companies/SalesInvoices/hooks/useSalesInvoices";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import FinalInvoicesTable from "@/app/dashboard/companies/SalesInvoices/components/FinalInvoicesTable";
import TaxOnProduct from "@/app/dashboard/companies/SalesInvoices/components/TaxOnProduct";
import CategoryTable from "./CategoryTable";

export default function DisplayInovices() {
	const { data: allData, isLoading: allDataWithLoading } = useSalesInvoices();
	const { t } = useTypedTranslation();
	const columns: ColumnDef<SalesInvoice>[] = [
		{
			accessorKey: "code",
			header: t("sales.salesInvoices.columns.code"),
		},
		{
			accessorKey: "itemName",
			header: t("sales.salesInvoices.columns.itemName"),
		},
		{
			accessorKey: "category",
			header: t("sales.salesInvoices.columns.category"),
		},
		{
			accessorKey: "quantity",
			header: t("sales.salesInvoices.columns.quantity"),
		},
		{
			accessorKey: "saleUnit",
			header: t("sales.salesInvoices.columns.saleUnit"),
		},
		{
			accessorKey: "total",
			header: t("sales.salesInvoices.columns.total"),
		},
		{
			accessorKey: "discount",
			header: t("sales.salesInvoices.columns.discount"),
		},
		{
			accessorKey: "tax",
			header: t("sales.salesInvoices.columns.tax"),
			cell: ({ row }) =>
				row.original.tax === t("sales.salesInvoices.columns.addTax") ? (
					<CustomPopUp
						DialogTriggerComponent={() => (
							<span
								style={{
									color: "green",
									cursor: "pointer",
									textDecoration: "underline",
								}}
							>
								{row.original.tax}
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
			header: t("sales.salesInvoices.columns.totalSale"),
		},
	];
	return (
		<Card>
			<CardHeader>عرض الفاتورة</CardHeader>
			<CardContent className="p-5">
				<ReusableManyTable
					dataSets={[
						{
							data: allData?.slice(0, 2) || [],
							columns: columns,
							FooterComponent: () => <FinalInvoicesTable withActions={false} />,
							withPrinter: false,
							containerClassName: "bg-white border-none",
							loading: allDataWithLoading,
							onCellClick: (cell) => {
								console.log(cell);
								if (cell?.column?.id !== "category") return null;
								return <CategoryTable />;
							},
						},
					]}
					withTopPrinter={false}
				/>
			</CardContent>
		</Card>
	);
}
