"use client";
import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import FinalInvoicesTable from "./components/FinalInvoicesTable";
import CustomPopUp from "@/components/popups";
import TaxOnProduct from "./components/TaxOnProduct";
import { useSalesInvoices, type SalesInvoice } from "./hooks/useSalesInvoices";
import TopComponent from "./components/TopComponent";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";

export default function Page() {
	const { t } = useTypedTranslation();
	const [selectedInvoice, setSelectedInvoice] = useState<string>("");
	const { data: allData } = useSalesInvoices();

	const columns: ColumnDef<SalesInvoice>[] = [
		{
			accessorKey: "code",
			header: t("salesInvoicesTable.columns.code"),
		},
		{
			accessorKey: "itemName",
			header: t("salesInvoicesTable.columns.itemName"),
		},
		{
			accessorKey: "quantity",
			header: t("salesInvoicesTable.columns.quantity"),
		},
		{
			accessorKey: "unit",
			header: t("salesInvoicesTable.columns.unit"),
		},
		{
			accessorKey: "saleUnit",
			header: t("salesInvoicesTable.columns.saleUnit"),
		},
		{
			accessorKey: "total",
			header: t("salesInvoicesTable.columns.total"),
		},
		{
			accessorKey: "discount",
			header: t("salesInvoicesTable.columns.discount"),
		},
		{
			accessorKey: "tax",
			header: t("salesInvoicesTable.columns.tax"),
			cell: ({ row }) =>
				row.original.tax === t("salesInvoicesTable.columns.addTax") ? (
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
			header: t("salesInvoicesTable.columns.totalSale"),
		},
	];

	const emptyRow = {
		code: "-",
		itemName: "-",
		quantity: "-",
		unit: "-",
		saleUnit: "-",
		total: "-",
		discount: "-",
		tax: "-",
		totalSale: "-",
	};

	const getData = () => (!selectedInvoice ? [emptyRow] : allData);
	const data = getData();

	return (
		<div className="mt-[40px] flex flex-col gap-9">
			<ReusableManyTable
				dataSets={[
					{
						UserComponent: () => (
							<TopComponent
								selectedInvoice={selectedInvoice}
								setSelectedInvoice={setSelectedInvoice}
							/>
						),
						data: data || [],
						columns,
						// FooterComponent: () => <FinalInvoicesTable />,
					},
				]}
			/>
		</div>
	);
}
