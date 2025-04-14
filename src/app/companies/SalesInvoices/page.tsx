"use client";
import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import ReusableTable from "@/components/ReusableTable";
import SmallTable from "@/components/smallTable";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import FinalInvoicesTable from "./components/FinalInvoicesTable";
import CustomPopUp from "@/components/popups";
import TaxOnInvoice from "./components/TaxOnInvoice";
import TaxOnProduct from "./components/TaxOnProduct";
import { useSalesInvoices, type SalesInvoice } from "./hooks/useSalesInvoices";
import TopComponent from "./components/TopComponent";
import ReusableManyTable from "@/components/ReusableTableWithManyData";

export default function Page() {
	const [selectedInvoice, setSelectedInvoice] = useState<string>("");
	const { data: allData } = useSalesInvoices();

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
	const getData = () => {
		if (!selectedInvoice) {
			return [emptyRow];
		}
		return allData;
	};
	const data = getData();

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
			header: "إجمالي البيع",
		},
	];

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
						columns: columns,
						FooterComponent: () => <FinalInvoicesTable />,
						// expandableRow: !!selectedInvoice,
					},
				]}
			/>

			{/* <FinalInvoicesTable /> */}
		</div>
	);
}
