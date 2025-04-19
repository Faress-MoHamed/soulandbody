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
import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";

const ReturnIcon = () => (
	<svg
		width="25"
		height="24"
		viewBox="0 0 25 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M8.5 12H16.5M22.5 12C22.5 17.5228 18.0228 22 12.5 22C6.97715 22 2.5 17.5228 2.5 12C2.5 6.47715 6.97715 2 12.5 2C18.0228 2 22.5 6.47715 22.5 12Z"
			stroke="#16C47F"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
const ExchangeIcon = () => (
	<svg
		width="25"
		height="24"
		viewBox="0 0 25 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M12.499 3.75C12.499 3.55109 12.5781 3.36032 12.7187 3.21967C12.8594 3.07902 13.0501 3 13.249 3H16.249C17.2436 3 18.1974 3.39509 18.9007 4.09835C19.6039 4.80161 19.999 5.75544 19.999 6.75V9.435L21.724 7.71C21.8655 7.57338 22.0549 7.49779 22.2516 7.49949C22.4482 7.5012 22.6363 7.58008 22.7754 7.71914C22.9145 7.85819 22.9933 8.0463 22.995 8.24295C22.9967 8.4396 22.9212 8.62905 22.7845 8.7705L19.7845 11.7705C19.6439 11.9111 19.4532 11.9901 19.2543 11.9901C19.0554 11.9901 18.8647 11.9111 18.724 11.7705L15.724 8.7705C15.5874 8.62905 15.5118 8.4396 15.5135 8.24295C15.5152 8.0463 15.5941 7.85819 15.7332 7.71914C15.8722 7.58008 16.0603 7.5012 16.257 7.49949C16.4536 7.49779 16.6431 7.57338 16.7845 7.71L18.5095 9.435V6.75C18.5095 6.15326 18.2725 5.58097 17.8505 5.15901C17.4286 4.73705 16.8563 4.5 16.2595 4.5H13.2595C13.0606 4.5 12.8699 4.42098 12.7292 4.28033C12.5886 4.13968 12.5095 3.94891 12.5095 3.75H12.499ZM5.46403 12.06C5.55347 12.023 5.64924 12.0036 5.74603 12.003H5.75503C5.95252 12.0038 6.14171 12.0825 6.28153 12.222L9.28153 15.222C9.41815 15.3635 9.49375 15.5529 9.49204 15.7496C9.49033 15.9462 9.41145 16.1343 9.2724 16.2734C9.13334 16.4124 8.94523 16.4913 8.74858 16.493C8.55194 16.4947 8.36248 16.4191 8.22103 16.2825L6.49603 14.5575V17.2425C6.49603 17.8392 6.73309 18.4115 7.15504 18.8335C7.577 19.2554 8.1493 19.4925 8.74603 19.4925H11.746C11.9449 19.4925 12.1357 19.5715 12.2764 19.7122C12.417 19.8528 12.496 20.0436 12.496 20.2425C12.496 20.4414 12.417 20.6322 12.2764 20.7728C12.1357 20.9135 11.9449 20.9925 11.746 20.9925H8.74603C7.75147 20.9925 6.79765 20.5974 6.09438 19.8941C5.39112 19.1909 4.99603 18.2371 4.99603 17.2425V14.5575L3.27103 16.2825C3.12958 16.4191 2.94013 16.4947 2.74348 16.493C2.54684 16.4913 2.35873 16.4124 2.21967 16.2734C2.08061 16.1343 2.00174 15.9462 2.00003 15.7496C1.99832 15.5529 2.07392 15.3635 2.21053 15.222L5.21053 12.222C5.28 12.1521 5.36258 12.0965 5.45353 12.0585L5.46403 12.06Z"
			fill="#16C47F"
		/>
	</svg>
);

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
