"use client";
import React, { useState } from "react";
import { useClients } from "./hooks/useClients";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import { Button } from "@/components/ui/button";
import { DeleteIcon, EditIcon } from "@/svgIcons/deleteIcon";
import CustomPopUp from "@/components/popups";
import AddButton from "@/components/AddButton";
import SearchBar from "@/components/searchBar";
import { useInvoiceClients } from "./hooks/useInvoiceClients";
import type { ColumnDef } from "@tanstack/react-table";
import { useAdvancePayments } from "./hooks/useAdvancePayments";
import AddNewClient from "./components/AddNewClient";
import { useTransactions } from "./hooks/useTransactions";
import TransactionsTopComponent from "./components/TransactionsTopComponent";
import {
	useSalesInvoices,
	type SalesInvoice,
} from "@/app/dashboard/companies/SalesInvoices/hooks/useSalesInvoices";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import TaxOnProduct from "@/app/dashboard/companies/SalesInvoices/components/TaxOnProduct";
import TopComponent from "@/app/dashboard/companies/SalesInvoices/components/TopComponent";
import FinalInvoicesTable from "@/app/dashboard/companies/SalesInvoices/components/FinalInvoicesTable";
import CategoryTable from "./components/CategoryTable";
import { useElectronicInvoices } from "./hooks/useElectronicInvoices";
import ElectronicInvoicesTopComponent from "./components/ElectronicInvoices";
import DisplayInovices from "./components/DisplayInvoice";
import ExchangeTopComponent from "@/app/dashboard/companies/ReturnsAndExchanges/component/ExchangeTopComponent";
import ReturnTopComponent from "@/app/dashboard/companies/ReturnsAndExchanges/component/ReturnTopComponent";

export default function page() {
	const { t } = useTypedTranslation();

	const { data: clientsData, isLoading: clientsLoading } = useClients();
	const clientColumns = [
		{
			accessorKey: "name",
			header: t("sales.clients.columns.name"),
		},
		{
			accessorKey: "phone",
			header: t("sales.clients.columns.phone"),
		},
		{
			accessorKey: "address",
			header: t("sales.clients.columns.address"),
		},
		{
			accessorKey: "action",
			header: t("sales.clients.columns.action"),
			cell: ({ row }: any) => (
				<div className="flex justify-center gap-1">
					<Button className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] min-w-[83px] rounded-[8px] border border-[#C41619]">
						{
							<>
								<DeleteIcon />
								{t("sales.common.delete")}
							</>
						}
					</Button>
					<Button className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F] hover:bg-white hover:opacity-85 h-[32px] rounded-[8px] border border-[#16C47F]">
						<EditIcon />
						{t("sales.common.edit")}
					</Button>
				</div>
			),
		},
	];

	const { data: invoiceClientsData, isLoading: invoiceClientsLoading } =
		useInvoiceClients();
	const invoiceClientColumns: ColumnDef<any>[] = [
		{
			accessorKey: "name",
			header: t("sales.invoiceClients.columns.name"),
		},
		{
			accessorKey: "phone",
			header: t("sales.invoiceClients.columns.phone"),
		},
		{
			accessorKey: "address",
			header: t("sales.invoiceClients.columns.address"),
		},
		{
			accessorKey: "invoiceNumber",
			header: t("sales.invoiceClients.columns.invoiceNumber"),
		},
		{
			accessorKey: "amountDue",
			header: t("sales.invoiceClients.columns.amountDue"),
			cell: ({ getValue }) => `${getValue()} ج.م`, // Optional: display with currency
		},
	];

	const { data: advancePaymentsData, isLoading: advancePaymentsLoading } =
		useAdvancePayments();
	const advancePaymentColumns: ColumnDef<any>[] = [
		{
			accessorKey: "name",
			header: t("sales.advancePayments.columns.name"),
		},
		{
			accessorKey: "phone",
			header: t("sales.advancePayments.columns.phone"),
		},
		{
			accessorKey: "address",
			header: t("sales.advancePayments.columns.address"),
		},
		{
			accessorKey: "receiptNumber",
			header: t("sales.advancePayments.columns.receiptNumber"),
		},
		{
			accessorKey: "amount",
			header: t("sales.advancePayments.columns.amount"),
			cell: ({ getValue }) => `${getValue()} ج.م`,
		},
	];

	const { data: TransactionsData, isLoading: TransactionsLoading } =
		useTransactions();
	const transactionColumns = [
		{
			accessorKey: "invoiceNumber",
			header: t("sales.transactions.columns.invoiceNumber"),
		},
		{
			accessorKey: "clientCode",
			header: t("sales.transactions.columns.clientCode"),
		},
		{
			accessorKey: "date",
			header: t("sales.transactions.columns.date"),
		},
		{
			accessorKey: "account",
			header: t("sales.transactions.columns.account"),
		},
		{
			accessorKey: "debtor",
			header: t("sales.transactions.columns.debtor"),
		},
		{
			accessorKey: "creditor",
			header: t("sales.transactions.columns.creditor"),
		},
		{
			accessorKey: "balance",
			header: t("sales.transactions.columns.balance"),
		},
	];
	const { data: InvoiceBuying, isLoading: InvoiceBuyingLoading } =
		useSalesInvoices();

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

	const { data: ElectronicInvoicesData, isLoading: ElectronicInvoicesLoading } =
		useElectronicInvoices();
	const ElectronicInvoicesColumns = [
		{
			accessorKey: "invoiceNumber",
			header: t("sales.electronicInvoices.columns.invoiceNumber"),
		},
		{
			accessorKey: "date",
			header: t("sales.electronicInvoices.columns.date"),
		},
		{
			accessorKey: "statement",
			header: t("sales.electronicInvoices.columns.statement"),
		},
		{
			accessorKey: "amount",
			header: t("sales.electronicInvoices.columns.amount"),
		},
		{
			accessorKey: "vatAmount",
			header: t("sales.electronicInvoices.columns.vatAmount"),
		},
		{
			accessorKey: "profit",
			header: t("sales.electronicInvoices.columns.profit"),
		},
		{
			accessorKey: "total",
			header: t("sales.electronicInvoices.columns.total"),
		},
		{
			accessorKey: "status",
			header: t("sales.electronicInvoices.columns.status"),
		},
	];
	return (
		<ReusableManyTable
			dataSets={[
				{
					columns: clientColumns,
					title: t("sales.clients.title"),
					ButtonTrigger: () => (
						<CustomPopUp
							DialogTriggerComponent={() => {
								return (
									<AddButton
										onClickAdd={() => {}}
										AddTitle={t("sales.clients.addNew")}
									/>
								);
							}}
							DialogContentComponent={() => {
								return <AddNewClient />;
							}}
						/>
					),
					withFilter: false,
					UserComponent: () => (
						<div className="px-6">
							<SearchBar />
						</div>
					),
					data: clientsData || [],
					loading:
						clientsLoading || invoiceClientsLoading || advancePaymentsLoading,
					nestedTable: [
						{
							columns: invoiceClientColumns,
							data: invoiceClientsData || [],
							title: t("sales.invoiceClients.title"),
						},
						{
							columns: advancePaymentColumns,
							data: advancePaymentsData || [],
							title: t("sales.advancePayments.title"),
						},
					],
					onCellClick: (cell) => {
						console.log(cell, cell.column.id !== "phone");
						if (cell.column.id !== "phone") return null; // Only respond to "الهاتف"
						return (
							<div className="bg-white border rounded shadow p-2">
								<p>{t("sales.clients.columns.phone")}:</p>
								<input
									defaultValue={cell.getValue() as string}
									className="border p-1 w-full"
								/>
							</div>
						);
					},
				},
				{
					data: (TransactionsData as any) || [],
					columns: transactionColumns,
					label: t("sales.transactions.title"),
					mainTableLabel: t("sales.transactions.mainTitle"),
					UserComponent: () => <TransactionsTopComponent />,
					nestedTable: [
						{
							data: (TransactionsData as any) || [],
							columns: transactionColumns,
							title: t("sales.transactions.sales.title"),
						},
					],
				},
				{
					UserComponent: () => <ExchangeTopComponent />,
					data: InvoiceBuying || [],
					columns,
					onCellClick: (cell) => {
						console.log(cell);
						if (cell?.column?.id !== "category") return null;
						return <CategoryTable />;
					},
					FooterComponent: () => <FinalInvoicesTable />,
					label: t("sales.salesInvoices.title"),
				},
				{
					UserComponent: () => <ReturnTopComponent />,
					data: InvoiceBuying || [],
					columns,
					onCellClick: (cell) => {
						console.log(cell);
						if (cell?.column?.id !== "category") return null;
						return <CategoryTable />;
					},
					FooterComponent: () => <FinalInvoicesTable />,
					label: t("sales.returnInvoices.title"),
				},
				{
					data: (ElectronicInvoicesData as any) || [],
					loading: ElectronicInvoicesLoading,
					columns: ElectronicInvoicesColumns,
					ButtonTrigger: () => {
						return (
							<CustomPopUp
								DialogTriggerComponent={() => (
									<Button className="rounded-[8px] h-[44px] w-[120px] bg-[#16C47F] hover:bg-[#16C47F] text-white">
										{t("sales.electronicInvoices.taxTransfer")}
									</Button>
								)}
								DialogContentComponent={() => {
									return <DisplayInovices />;
								}}
							/>
						);
					},
					withFilter: false,
					UserComponent: () => {
						return <ElectronicInvoicesTopComponent />;
					},
					title: t("sales.electronicInvoices.title"),
					mainTableLabel: t("sales.electronicInvoices.mainTitle"),
					nestedTable: [
						{
							columns: ElectronicInvoicesColumns,
							data: (ElectronicInvoicesData as any) || [],
							title: t("sales.electronicInvoices.returns"),
						},
						{
							columns: ElectronicInvoicesColumns,
							data: (ElectronicInvoicesData as any) || [],
							title: t("sales.electronicInvoices.replacements"),
						},
					],
				},
			]}
		/>
	);
}
