"use client";
import React from "react";
import { useProductsTypes, ProductType } from "./hooks/ProductType";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DeleteIcon, EditIcon } from "@/svgIcons/deleteIcon";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import CustomPopUp from "@/components/popups";
import AddButton from "@/components/AddButton";
import AddNewCategory from "./components/AddNewCategory";
import SearchBar from "@/components/searchBar";
import AccountStatementTopComponent from "./components/AccountStatementTopComponent";
import {
	usePurchasesInvoices,
	type PurchasesInvoicesType,
} from "./hooks/usePurchasesInvoices";
// import { useSuppliers, type SupplierType } from "./hooks/useSupplier";
// import AddSupplier from "./components/AddSupplier";
import { useAmountDuesData, type AmountDueType } from "./hooks/useAmountDue";
import { useDownPayments, type DownPaymentType } from "./hooks/useDownPayment";
// import TaxOnProduct from "../companies/SalesInvoices/components/TaxOnProduct";
import {
	useExchange,
	type ExchangeType,
} from "@/app/dashboard/companies/ReturnsAndExchanges/hooks/useExchange";
import {
	useReturns,
	type ReturnsType,
} from "@/app/dashboard/companies/ReturnsAndExchanges/hooks/useReturns";
import ExchangeTopComponent from "@/app/dashboard/companies/ReturnsAndExchanges/component/ExchangeTopComponent";
import ReturnsTable from "@/app/dashboard/companies/ReturnsAndExchanges/component/ReturnsTable";
import ReturnTopComponent from "@/app/dashboard/companies/ReturnsAndExchanges/component/ReturnTopComponent";
import CategoryTable from "../sales/components/CategoryTable";
import TaxOnProduct from "@/app/dashboard/companies/SalesInvoices/components/TaxOnProduct";

export default function page() {
	const { t } = useTypedTranslation();

	const { data: productsTypeData, isLoading: productsTypeLoading } =
		useProductsTypes();

	const productTypesColumns: ColumnDef<ProductType>[] = [
		{
			header: t("purchases.productTypes.code"),
			accessorKey: "code",
		},
		{
			header: t("purchases.productTypes.name"),
			accessorKey: "name",
		},
		{
			header: t("purchases.productTypes.description"),
			accessorKey: "description",
		},
		{
			header: t("purchases.productTypes.purchasePrice"),
			accessorKey: "purchasePrice",
			cell: ({ getValue }) => Number(getValue()).toLocaleString(),
		},
		{
			header: t("purchases.productTypes.salePrice"),
			accessorKey: "salePrice",
			cell: ({ getValue }) => Number(getValue()).toLocaleString(),
		},
		{
			header: t("purchases.productTypes.actions"),
			id: "actions",
			cell: ({ row }: any) => (
				<div className="flex justify-center gap-1">
					<Button className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] min-w-[83px] rounded-[8px] border border-[#C41619]">
						<>
							<DeleteIcon />
							{t("sales.common.delete")}
						</>
					</Button>
					<Button className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F] hover:bg-white hover:opacity-85 h-[32px] rounded-[8px] border border-[#16C47F]">
						<EditIcon />
						{t("sales.common.edit")}
					</Button>
				</div>
			),
		},
	];

	const { data: PurchasesInvoicesData, isLoading: PurchasesInvoicesLoading } =
		usePurchasesInvoices();

	const PurchasesInvoicesColumns: ColumnDef<PurchasesInvoicesType>[] = [
		{
			header: t("purchases.invoices.invoiceNumber"),
			accessorKey: "invoiceNumber",
		},
		{
			header: t("purchases.invoices.date"),
			accessorKey: "date",
		},
		{
			header: t("purchases.invoices.account"),
			accessorKey: "account",
		},
		{
			header: t("purchases.invoices.debtor"),
			accessorKey: "debtor",
		},
		{
			header: t("purchases.invoices.creditor"),
			accessorKey: "creditor",
		},
		{
			header: t("purchases.invoices.balance"),
			accessorKey: "balance",
			cell: ({ getValue }) => Number(getValue()).toLocaleString(),
		},
	];

	// const { data: SuppliersData, isLoading: SuppliersLoading } = useSuppliers();
	// const supplierColumns: ColumnDef<SupplierType>[] = [
	// 	{
	// 		header: t("purchases.suppliers.name"),
	// 		accessorKey: "name",
	// 	},
	// 	{
	// 		header: t("purchases.suppliers.phone"),
	// 		accessorKey: "phone",
	// 	},
	// 	{
	// 		header: t("purchases.suppliers.address"),
	// 		accessorKey: "address",
	// 	},
	// 	{
	// 		header: t("purchases.productTypes.actions"),
	// 		id: "actions",
	// 		cell: ({ row }) => (
	// 			<div className="flex justify-center gap-1">
	// 				<Button className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] min-w-[83px] rounded-[8px] border border-[#C41619]">
	// 					<>
	// 						<DeleteIcon />
	// 						{t("sales.common.delete")}
	// 					</>
	// 				</Button>
	// 				<Button className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F] hover:bg-white hover:opacity-85 h-[32px] rounded-[8px] border border-[#16C47F]">
	// 					<EditIcon />
	// 					{t("sales.common.edit")}
	// 				</Button>
	// 			</div>
	// 		),
	// 	},
	// ];

	const { data: AmountDuesData, isLoading: AmountDuesLoading } =
		useAmountDuesData();
	const AmountDuesColumns: ColumnDef<AmountDueType>[] = [
		{
			header: t("purchases.suppliers.name"),
			accessorKey: "name",
		},
		{
			header: t("purchases.suppliers.phone"),
			accessorKey: "phone",
		},
		{
			header: t("purchases.suppliers.address"),
			accessorKey: "address",
		},
		{
			header: t("purchases.invoices.invoiceNumber"),
			accessorKey: "invoiceNumber",
		},
		{
			header: t("purchases.amountDues.amountDue"),
			accessorKey: "amountDue",
			cell: ({ getValue }) => Number(getValue()).toLocaleString(),
		},
	];

	const { data: DownPaymentData, isLoading: DownPaymentLoading } =
		useDownPayments();

	const DownPaymentsColumns: ColumnDef<DownPaymentType>[] = [
		{
			header: t("purchases.suppliers.name"),
			accessorKey: "name",
		},
		{
			header: t("purchases.suppliers.phone"),
			accessorKey: "phone",
		},
		{
			header: t("purchases.suppliers.address"),
			accessorKey: "address",
		},
		{
			header: t("purchases.downPayments.paymentDocument"),
			accessorKey: "paymentDocument",
		},
		{
			header: t("purchases.downPayments.advanceAmount"),
			accessorKey: "advanceAmount",
			cell: ({ getValue }) => Number(getValue()).toLocaleString(),
		},
	];

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
			header: t("ReturnsAndExchanges.ExchangeTable.tax"),
			cell: ({ row }) => (
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
			cell: ({ row }) => (
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
					data: productsTypeData || [],
					columns: productTypesColumns,
					loading: productsTypeLoading,
					title: t("purchases.productTypes.title"),
					ButtonTrigger: () => (
						<CustomPopUp
							DialogTriggerComponent={() => {
								return (
									<AddButton
										onClickAdd={() => {}}
										AddTitle={t("purchases.productTypes.addItem")}
									/>
								);
							}}
							DialogContentComponent={() => {
								return <AddNewCategory />;
							}}
						/>
					),
					withFilter: false,
					UserComponent: () => (
						<div className="p-6">
							<SearchBar />
						</div>
					),
				},
				{
					data: (PurchasesInvoicesData as any) || [],
					columns: PurchasesInvoicesColumns as any,
					loading: PurchasesInvoicesLoading,
					UserComponent: () => <AccountStatementTopComponent />,
					label: t("purchases.invoices.accountStatement"),
					mainTableLabel: t("purchases.invoices.mainTable"),
					nestedTable: [
						{
							data: (PurchasesInvoicesData as any) || [],
							columns: PurchasesInvoicesColumns as any,
							title: t("purchases.suppliers.title"),
						},
					],
				},
				// {
				// 	data: (SuppliersData as any) || [],
				// 	columns: supplierColumns as any,
				// 	loading: SuppliersLoading,
				// 	title: t("purchases.suppliers.title"),
				// 	ButtonTrigger: () => (
				// 		<CustomPopUp
				// 			DialogTriggerComponent={() => {
				// 				return (
				// 					<AddButton
				// 						onClickAdd={() => {}}
				// 						AddTitle={t("purchases.suppliers.newSupplier")}
				// 					/>
				// 				);
				// 			}}
				// 			DialogContentComponent={() => {
				// 				return <AddSupplier />;
				// 			}}
				// 		/>
				// 	),
				// 	withFilter: false,
				// 	UserComponent: () => (
				// 		<div className="p-6">
				// 			<SearchBar />
				// 		</div>
				// 	),
				// 	nestedTable: [
				// 		{
				// 			data: (AmountDuesData as any) || [],
				// 			columns: AmountDuesColumns as any,
				// 			title: t("purchases.amountDues.title"),
				// 		},
				// 		{
				// 			data: (DownPaymentData as any) || [],
				// 			columns: DownPaymentsColumns as any,
				// 			title: t("purchases.downPayments.title"),
				// 		},
				// 	],
				// },
				{
					data: (ReturnsData as any) || [],
					columns: Returnscolumns as any,
					loading: ReturnsLoading,
					label: t("ReturnsAndExchanges.ReturnTitle"),
					UserComponent: () => <ReturnTopComponent />,
					FooterComponent: () => <ReturnsTable />,
					containerClassName: "pb-4",
					withPagination: false,
					onCellClick: (cell) => {
						// if (cell?.column?.id !== "itemName") return null;
						// return <CategoryTable />;

						if (cell.column.id === "فئه") return <p>fares</p>;
						if (cell.column.id === "كمية") return <p>كمية</p>;
						return null;
					},
				},
				{
					data: (ExchangeData as any) || [],
					loading: ExchangeLoading,
					columns: Exchangecolumns as any,
					label: t("ReturnsAndExchanges.exchangeTitle"),
					UserComponent: () => <ExchangeTopComponent />,
					onCellClick: (cell) => {
						if (cell?.column?.id !== "itemName") return null;
						return <CategoryTable />;
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
