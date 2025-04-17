"use client";
import React from "react";
import { useUserTransactions } from "./hooks/useUserTransactions";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import { CardTitle } from "@/components/ui/card";
import CustomSelect from "@/components/customSelect";
import { MonthPicker } from "@/components/monthPicker";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/searchBar";
import { useTypedTranslation } from "../hooks/useTypedTranslation";
import FlexibleArabicTable from "@/components/HorizontalTable";
import type { CellContext, ColumnDef } from "@tanstack/react-table";
import { useTrialBalance } from "./hooks/useTrialBalance";
import { useLedgers } from "./hooks/useLedger";

function App() {
	const { t } = useTypedTranslation();

	// Sample data
	const accountsData = [
		{ name: t("accounts.assets"), value: 800 },
		{ name: t("accounts.nonCurrentAssets"), value: 500 },
		{ name: t("accounts.fixedAssets"), value: 110 },
		{ name: t("accounts.projectsInProgress"), value: 90 },
		{ name: t("accounts.intangibleAssets"), value: 200 },
		{ name: t("accounts.realEstateInvestments"), value: 100 },
		{ name: t("accounts.currentAssets"), value: 300 },
		{ name: t("accounts.inventory"), value: 50 },
	];

	const customColumns: ColumnDef<any>[] = [
		{
			accessorKey: "name",
			header: t("accountsReport.name"),
			cell: (info) => <strong>{info.getValue<string>()}</strong>,
		},
		{
			accessorKey: "value",
			header: t("accountsReport.value"),
			cell: (info) => `$${info.getValue<number>().toLocaleString()}`,
		},
	];

	// Define your data type
	interface MyDataItem {
		id: number;
		name: string;
		value: number;
		date: Date;
	}

	// Define your action component
	const MyActionButtons = ({ row }: { row: MyDataItem }) => (
		<div>
			<button onClick={() => console.log(row)}>{t("actions.edit")}</button>
			<button onClick={() => console.log(row)}>{t("actions.delete")}</button>
		</div>
	);

	// Usage
	return (
		<FlexibleArabicTable
			data={accountsData}
			columns={customColumns}
			title={t("accountsReport.customStatement")}
		/>
	);
}

export default function page() {
	const { data: UserTransactionsData, isLoading: UserTransactionsLoading } =
		useUserTransactions();
	const { t } = useTypedTranslation();
	const { data: TrialBalanceData, isLoading: TrialBalanceLoading } =
		useTrialBalance();
	const { data: LedgersData, isLoading: LedgersLoading } = useLedgers();

	const TrialBalancecolumns = [
		{
			accessorKey: "date",
			header: t("columns.date"),
		},
		{
			accessorKey: "accountName",
			header: t("columns.accountName"),
		},
		{
			accessorKey: "debit1",
			header: t("columns.debit"),
		},
		{
			accessorKey: "credit1",
			header: t("columns.credit"),
		},
		{
			accessorKey: "debit2",
			header: t("columns.debit"),
		},
		{
			accessorKey: "credit2",
			header: t("columns.credit"),
		},
		{
			accessorKey: "debit3",
			header: t("columns.debit"),
		},
		{
			accessorKey: "credit3",
			header: t("columns.credit"),
		},
	];

	const userTransactionColumns = [
		{
			header: t("columns.date"),
			accessorKey: "date",
		},
		{
			header: t("columns.transactionId"),
			accessorKey: "transactionId",
		},
		{
			header: t("columns.description"),
			accessorKey: "description",
		},
		{
			header: t("columns.debit"),
			accessorKey: "debit",
		},
		{
			header: t("columns.credit"),
			accessorKey: "credit",
		},
		{
			header: t("columns.balance"),
			accessorKey: "balance",
		},
		{
			header: t("columns.username"),
			accessorKey: "username",
		},
		{
			header: t("columns.notes"),
			accessorKey: "notes",
		},
	];

	const data = [
		{ name: t("services.internet"), value: 300 },
		{ name: t("services.internetPlan"), value: 250 },
		{ name: t("services.internetCardRefill"), value: 350 },
		{ name: t("services.accountRecharge"), value: 100 },
		{ name: t("services.billPayment"), value: 200 },
		{ name: t("services.phoneBill"), value: 150 },
		{ name: t("services.electricity"), value: 400 },
		{ name: t("services.waterBill"), value: 350 },
		{ name: t("services.homeGas"), value: 80 },
		{ name: t("services.rent"), value: 900 },
		{ name: t("services.walletRecharge"), value: 50 },
		{ name: t("services.moneyTransfer"), value: 150 },
		{ name: t("services.creditCard"), value: 450 },
		{ name: t("services.healthInsurance"), value: 300 },
		{ name: t("services.taxesAndFees"), value: 250 },
		{ name: t("services.miscellaneousPayments"), value: 180 },
		{ name: t("services.groceries"), value: 350 },
		{ name: t("services.clothing"), value: 200 },
		{ name: t("services.restaurants"), value: 150 },
		{ name: t("services.homeServices"), value: 280 },
		{ name: t("services.carMaintenance"), value: 350 },
		{ name: t("services.fuel"), value: 200 },
	];

	const LedgerColumns = [
		{
			accessorKey: "date",
			header: t("columns.date"),
		},
		{
			accessorKey: "accountName",
			header: t("columns.accountName"),
		},
		{
			accessorKey: "debit1",
			header: t("columns.debit"),
		},
		{
			accessorKey: "credit1",
			header: t("columns.credit"),
		},
		{
			accessorKey: "debit2",
			header: t("columns.debit"),
		},
		{
			accessorKey: "credit2",
			header: t("columns.credit"),
		},
	];

	const customColumns: ColumnDef<any>[] = [
		{
			accessorKey: "name",
			header: t("accountsReport.name"),
			cell: (info) => <strong>{info.getValue<string>()}</strong>,
		},
		{
			accessorKey: "value",
			header: t("accountsReport.value"),
			cell: (info) => `$${info.getValue<number>().toLocaleString()}`,
		},
	];

	const incomeStatementColumns: ColumnDef<any>[] = [
		{
			accessorKey: "name",
			header: t("incomeStatement.title"),
			cell: (info) => <strong>{info.getValue<string>()}</strong>,
		},
		{
			accessorKey: "value",
			header: t("incomeStatement.year"),
			cell: (info) => `$${info.getValue<number>().toLocaleString()}`,
		},
	];

	const incomeStatement = [
		{ name: t("incomeStatement.revenue"), value: "2025" },
		{ name: t("incomeStatement.costOfRevenue"), value: "2024" },
		{ name: t("incomeStatement.grossProfit"), value: "800" },
		{ name: t("incomeStatement.otherRevenue"), value: "800" },
		{ name: t("incomeStatement.expenses"), value: "800" },
		{ name: t("incomeStatement.netProfit"), value: "800" },
	];

	const columnGroups = [
		{
			title: "", // Empty for the date and account name columns
			columns: 2,
			className: "bg-transparent border-0",
		},
		{
			title: t("balance.openingBalance"),
			columns: 2,
			className: "bg-[#0F271E] text-white",
		},
		{
			title: t("balance.yearMovements"),
			columns: 2,
			className: "bg-[#374843] text-white",
		},
		{
			title: t("balance.closingBalance"),
			columns: 2,
			className: "bg-[#667773] text-white",
		},
	];

	const LedgercolumnGroups = [
		{
			title: "", // Empty for the date and account name columns
			columns: 2,
			className: "bg-transparent border-0",
		},
		{
			title: t("balance.movements"),
			columns: 2,
			className: "bg-[#0F271E] text-white",
		},
		{
			title: t("columns.balance"),
			columns: 2,
			className: "bg-[#374843] text-white",
		},
	];

	return (
		<>
			<h2 className="text-[26px] font-bold pb-6">{t("reports")}</h2>
			<ReusableManyTable
				dataSets={[
					{
						data: (UserTransactionsData as any) || [],
						columns: userTransactionColumns,
						loading: UserTransactionsLoading,
						title: t("accountsReport.generalStatement"),
						withFilter: false,
						UserComponent: () => (
							<div className="flex md:flex-col flex-col-reverse gap-4 mb-2">
								<div className="flex md:flex-row flex-col items-end gap-5">
									<CustomSelect
										label={t("filters.incomeList")}
										options={["vadavv", "vadvda", "vadadvvda"]}
									/>
									<div className="md:w-auto w-full flex md:flex-row flex-col items-center gap-5">
										<MonthPicker
											label={t("filters.dateFrom")}
											className="lg:w-[183px] w-full"
										/>
										<MonthPicker
											label={t("filters.dateTo")}
											className="lg:w-[183px] w-full"
										/>
									</div>
									<Button className="bg-emerald-500 hover:bg-emerald-600 lg:min-w-[148px] min-w-[140px] lg:h-[44px] h-[35px] text-[16px] flex items-center gap-[10px] cursor-pointer rounded-[8px]">
										{t("actions.search")}
									</Button>
								</div>
								<div className="w-full">
									<SearchBar />
								</div>
							</div>
						),
						containerClassName: "p-4",
					},

					{
						horizontal: true,
						data: data,
						columns: customColumns,
						UserComponent: () => {
							return (
								<div className="flex md:flex-row flex-col items-end gap-5">
									<div className="flex md:flex-row flex-col gap-5 md:w-auto w-full">
										<MonthPicker
											label={t("filters.dateFrom")}
											className="lg:w-[183px] w-full"
										/>
										<MonthPicker
											label={t("filters.dateTo")}
											className="lg:w-[183px] w-full"
										/>
									</div>
									<Button className="bg-emerald-500 hover:bg-emerald-600 lg:min-w-[148px] min-w-[140px] lg:h-[44px] h-[35px] text-[16px] flex items-center gap-[10px] cursor-pointer rounded-[8px]">
										{t("actions.search")}
									</Button>
								</div>
							);
						},
						title: t("financialReport.balanceSheet"),
						label: t("financialReport.balanceSheet"),
					},

					{
						horizontal: true,
						data: incomeStatement,
						columns: incomeStatementColumns,
						UserComponent: () => {
							return (
								<div className="flex md:flex-row flex-col items-end gap-5">
									<div className="flex md:flex-row flex-col gap-5 md:w-auto w-full">
										<MonthPicker
											label={t("filters.dateFrom")}
											className="lg:w-[183px] w-full"
										/>
										<MonthPicker
											label={t("filters.dateTo")}
											className="lg:w-[183px] w-full"
										/>
									</div>
									<Button className="bg-emerald-500 hover:bg-emerald-600 lg:min-w-[148px] min-w-[140px] lg:h-[44px] h-[35px] text-[16px] flex items-center gap-[10px] cursor-pointer rounded-[8px]">
										{t("actions.search")}
									</Button>
								</div>
							);
						},
						title: t("financialReport.incomeStatement"),
						label: t("financialReport.incomeStatement"),
					},

					{
						data: (TrialBalanceData as any) || [],
						columns: TrialBalancecolumns,
						loading: TrialBalanceLoading,
						title: t("financialReport.trialBalance"),
						columnGroups,
						withFilter: false,
						UserComponent: () => (
							<div className="flex md:flex-col flex-col-reverse gap-4 mb-2">
								<div className="flex md:flex-row flex-col items-end gap-5">
									<CustomSelect
										label={t("filters.incomeList")}
										options={["vadavv", "vadvda", "vadadvvda"]}
									/>
									<div className="md:w-auto w-full flex md:flex-row flex-col items-center gap-5">
										<MonthPicker
											label={t("filters.dateFrom")}
											className="lg:w-[183px] w-full"
										/>
										<MonthPicker
											label={t("filters.dateTo")}
											className="lg:w-[183px] w-full"
										/>
									</div>
									<Button className="bg-emerald-500 hover:bg-emerald-600 lg:min-w-[148px] min-w-[140px] lg:h-[44px] h-[35px] text-[16px] flex items-center gap-[10px] cursor-pointer rounded-[8px]">
										{t("actions.search")}
									</Button>
								</div>
								<div className="w-full">
									<SearchBar />
								</div>
							</div>
						),
						containerClassName: "p-4",
					},

					{
						data: (LedgersData as any) || [],
						columns: LedgerColumns,
						loading: LedgersLoading,
						title: t("financialReport.ledger"),
						columnGroups: LedgercolumnGroups,
						withFilter: false,
						UserComponent: () => (
							<div className="flex md:flex-col flex-col-reverse gap-4 mb-9">
								<div className="flex md:flex-row flex-col items-end gap-5">
									<CustomSelect
										label={t("accountsReport.name")}
										options={["vadavv", "vadvda", "vadadvvda"]}
									/>
									<div className="md:w-auto w-full flex md:flex-row flex-col items-center gap-5">
										<MonthPicker
											label={t("filters.dateFrom")}
											className="lg:w-[183px] w-full"
										/>
										<MonthPicker
											label={t("filters.dateTo")}
											className="lg:w-[183px] w-full"
										/>
									</div>
									<Button className="bg-emerald-500 hover:bg-emerald-600 lg:min-w-[148px] min-w-[140px] lg:h-[44px] h-[35px] text-[16px] flex items-center gap-[10px] cursor-pointer rounded-[8px]">
										{t("actions.search")}
									</Button>
								</div>
							</div>
						),
						containerClassName: "p-4",
					},
				]}
			/>
		</>
	);
}
