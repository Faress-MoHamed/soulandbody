"use client";

import CustomPopUp from "@/components/popups";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import TaxOnInvoice from "../SalesInvoices/components/TaxOnInvoice";
import TaxOnProduct from "../SalesInvoices/components/TaxOnProduct";
import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import FinalInvoicesTable from "../SalesInvoices/components/FinalInvoicesTable";
import ReturnsTable from "./component/ReturnsTable";
import { useReturns, type ReturnsType } from "./hooks/useReturns";
import { useExchange, type ExchangeType } from "./hooks/useExchange";
import ExchangeTopComponent from "./component/ExchangeTopComponent";
import ReturnTopComponent from "./component/ReturnTopComponent";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { ExchangeIcon, ReturnIcon } from "@/svgIcons/deleteIcon";

export default function ReturnsAndExchanges() {
	const { t } = useTypedTranslation();
	const [selectedInvoice, setSelectedInvoice] = useState<string>("");
	const { data: ReturnsData, isLoading: ReturnsLoading } = useReturns();
	const { data: ExchangeData, isLoading: ExchangeLoading } = useExchange();

	const Returnscolumns: ColumnDef<ReturnsType>[] = [
		{ accessorKey: "code", header: t("ReturnsAndExchanges.ReturnsTable.code") },
		{
			accessorKey: "itemName",
			header: t("ReturnsAndExchanges.ReturnsTable.itemName"),
		},
		{
			accessorKey: "quantity",
			header: t("ReturnsAndExchanges.ReturnsTable.quantity"),
		},
		{ accessorKey: "unit", header: t("ReturnsAndExchanges.ReturnsTable.unit") },
		{
			accessorKey: "total",
			header: t("ReturnsAndExchanges.ReturnsTable.total"),
		},
		{
			accessorKey: "discount",
			header: t("ReturnsAndExchanges.ReturnsTable.discount"),
		},
		{
			accessorKey: "tax",
			header: t("ReturnsAndExchanges.ReturnsTable.tax"),
			cell: ({ row }) =>
				row.original.tax === t("ReturnsAndExchanges.ReturnsTable.tax") ? (
					<CustomPopUp
						DialogTriggerComponent={() => (
							<span
								style={{
									color: "green",
									cursor: "pointer",
									textDecoration: "underline",
								}}
							>
								{t("ReturnsAndExchanges.ReturnsTable.tax")}
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
			header: t("ReturnsAndExchanges.ReturnsTable.totalSale"),
		},
	];

	const Exchangecolumns: ColumnDef<ExchangeType>[] = [
		{
			accessorKey: "code",
			header: t("ReturnsAndExchanges.ExchangeTable.code"),
		},
		{
			accessorKey: "itemName",
			header: t("ReturnsAndExchanges.ExchangeTable.itemName"),
		},
		{
			accessorKey: "quantity",
			header: t("ReturnsAndExchanges.ExchangeTable.quantity"),
		},
		{
			accessorKey: "unit",
			header: t("ReturnsAndExchanges.ExchangeTable.unit"),
		},
		{
			accessorKey: "total",
			header: t("ReturnsAndExchanges.ExchangeTable.total"),
		},
		{
			accessorKey: "discount",
			header: t("ReturnsAndExchanges.ExchangeTable.discount"),
		},
		{
			accessorKey: "tax",
			header: t("ReturnsAndExchanges.ExchangeTable.tax"),
			cell: ({ row }) =>
				row.original.tax === t("ReturnsAndExchanges.ExchangeTable.tax") ? (
					<CustomPopUp
						DialogTriggerComponent={() => (
							<span
								style={{
									color: "green",
									cursor: "pointer",
									textDecoration: "underline",
								}}
							>
								{t("ReturnsAndExchanges.ExchangeTable.tax")}
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
			header: t("ReturnsAndExchanges.ExchangeTable.totalSale"),
		},
	];
	return (
		<ReusableManyTable
			dataSets={[
				{
					data: (ReturnsData as any) || [],
					columns: Returnscolumns,
					loading: ReturnsLoading,
					label: t("ReturnsAndExchanges.ReturnTitle"),
					UserComponent: () => (
						<ReturnTopComponent
							selectedInvoice={selectedInvoice}
							setSelectedInvoice={setSelectedInvoice}
						/>
					),
					FooterComponent: () => <ReturnsTable />,
					containerClassName: "pb-4",
					withPagination: false,
					expandableRow: true,
					expandedContent: {
						content: [
							{ type: "null" },
							{
								type: "input",
								inputType: "text",
								wrapperClassName: "md:max-w-full",
							},
							{ type: "input", inputType: "text" },
							{ type: "input", inputType: "text" },
							{ type: "input", inputType: "text" },
							{ type: "input", inputType: "text" },
						],
						expandButton: (isExpanded, toggleExpand) => (
							<button onClick={toggleExpand}>
								<ReturnIcon />
							</button>
						),
					},
				},
				{
					data: (ExchangeData as any) || [],
					loading: ExchangeLoading,
					columns: Exchangecolumns,
					label: t("ReturnsAndExchanges.exchangeTitle"),
					UserComponent: () => (
						<ExchangeTopComponent
							selectedInvoice={selectedInvoice}
							setSelectedInvoice={setSelectedInvoice}
						/>
					),
					expandableRow: true,
					expandedContent: {
						content: [
							{ type: "null" },
							{
								type: "input",
								inputType: "text",
								wrapperClassName: "md:max-w-full",
							},
							{ type: "input", inputType: "text" },
							{ type: "input", inputType: "text" },
							{ type: "input", inputType: "text" },
							{ type: "input", inputType: "text" },
						],
						expandButton: (isExpanded, toggleExpand) => (
							<button onClick={toggleExpand}>
								<ExchangeIcon />
							</button>
						),
					},
					withFilter: false,
					FooterComponent: () => <ReturnsTable />,
					containerClassName: "pb-4",
					withPagination: false,
				},
			]}
		/>
	);
}
