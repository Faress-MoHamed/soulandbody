"use client";

import ReusableManyTable from "@/components/ReusableTableWithManyData";
import type { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import InvoiceTopComponent from "./components/InvoiceTopComponent";
import InvoiceDetails from "./components/InvoiceDetails";
import {
	useInventoryItemsData,
	type InventoryItemType,
} from "./hooks/useInventoryItems";
import AddInvoiceTopComponent from "./components/AddInvoiceTopComponent";

export default function Page() {
	const { data: executionsData, isLoading: executionLoading } =
		useInventoryItemsData();
	const [showAdd, setShowAdd] = useState(false);
	const inventoryColumns: ColumnDef<InventoryItemType>[] = [
		{
			accessorKey: "id",
			header: () => (
				<button onClick={() => setShowAdd(true)}>
					<svg
						width="25"
						height="24"
						viewBox="0 0 25 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M11.5 17H13.5V13H17.5V11H13.5V7H11.5V11H7.5V13H11.5V17ZM12.5 22C11.1167 22 9.81667 21.7417 8.6 21.225C7.38333 20.6917 6.325 19.975 5.425 19.075C4.525 18.175 3.80833 17.1167 3.275 15.9C2.75833 14.6833 2.5 13.3833 2.5 12C2.5 10.6167 2.75833 9.31667 3.275 8.1C3.80833 6.88333 4.525 5.825 5.425 4.925C6.325 4.025 7.38333 3.31667 8.6 2.8C9.81667 2.26667 11.1167 2 12.5 2C13.8833 2 15.1833 2.26667 16.4 2.8C17.6167 3.31667 18.675 4.025 19.575 4.925C20.475 5.825 21.1833 6.88333 21.7 8.1C22.2333 9.31667 22.5 10.6167 22.5 12C22.5 13.3833 22.2333 14.6833 21.7 15.9C21.1833 17.1167 20.475 18.175 19.575 19.075C18.675 19.975 17.6167 20.6917 16.4 21.225C15.1833 21.7417 13.8833 22 12.5 22ZM12.5 20C14.7333 20 16.625 19.225 18.175 17.675C19.725 16.125 20.5 14.2333 20.5 12C20.5 9.76667 19.725 7.875 18.175 6.325C16.625 4.775 14.7333 4 12.5 4C10.2667 4 8.375 4.775 6.825 6.325C5.275 7.875 4.5 9.76667 4.5 12C4.5 14.2333 5.275 16.125 6.825 17.675C8.375 19.225 10.2667 20 12.5 20Z"
							fill="#16C47F"
						/>
					</svg>
				</button>
			),
			cell: () => {
				return null;
			},
		},
		{
			accessorKey: "fils1",
			header: "فلس",
			cell: ({ row }) => (
				<div className="text-center">{row.getValue("fils1")}</div>
			),
		},
		{
			accessorKey: "dinar1",
			header: "دينار",
			cell: ({ row }) => (
				<div className="text-center">{row.getValue("dinar1")}</div>
			),
		},
		{
			accessorKey: "classification",
			header: "الصنف",
			cell: ({ row }) => (
				<div className="text-center">{row.getValue("classification")}</div>
			),
		},
		{
			accessorKey: "packageType",
			header: "العبوة",
			cell: ({ row }) => (
				<div className="text-center">{row.getValue("packageType")}</div>
			),
		},
		{
			accessorKey: "quantity",
			header: "العدد",
			cell: ({ row }) => (
				<div className="text-center">{row.getValue("quantity")}</div>
			),
		},
		{
			accessorKey: "weight",
			header: "الوزن",
			cell: ({ row }) => (
				<div className="text-center">{row.getValue("weight")}</div>
			),
		},

		{
			accessorKey: "dinar2",
			header: "دينار",
			cell: ({ row }) => (
				<div className="text-center">{row.getValue("dinar2")}</div>
			),
		},
		{
			accessorKey: "fils2",
			header: "فلس",
			cell: ({ row }) => (
				<div className="text-center">{row.getValue("fils2")}</div>
			),
		},
	];
	return (
		<div>
			<ReusableManyTable
				dataSets={[
					{
						columns: inventoryColumns,
						data: executionsData || [],
						loading: executionLoading,
						UserComponent: () =>
							showAdd ? <AddInvoiceTopComponent /> : <InvoiceTopComponent />,
						FooterComponent: () => <InvoiceDetails />,
					},
				]}
			/>
		</div>
	);
}
