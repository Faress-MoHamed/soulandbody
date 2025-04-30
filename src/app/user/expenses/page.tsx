"use client";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import React from "react";
import { useExpenses } from "./hooks/useExpense";
import CustomPopUp from "@/components/popups";
import NewExpense from "./components/Newexpense";
import AddButton from "@/components/AddButton";
import { CardTitle } from "@/components/ui/card";
import SearchBar from "@/components/searchBar";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { Button } from "@/components/ui/button";
import { useTransactions } from "./hooks/useTransactions";
import CustomSelect from "@/components/customSelect";
import { MonthPicker } from "@/components/monthPicker";

export default function page() {
	const { t } = useTypedTranslation();
	const { data: expenseData, isLoading: expenseLoading } = useExpenses();
	const expenseColumns = [
		{
			header: t("expense.code"), // Expense Code
			accessorKey: "code",
		},
		{
			header: t("expense.name"), // Expense Name
			accessorKey: "name",
		},
		{
			header: t("expense.total"), // Total
			accessorKey: "total",
		},
	];
	const { data: transactionData, isLoading: transactionLoading } =
		useTransactions();
	const transactionColumns = [
		{
			header: t("expense.statement.columns.date"),
			accessorKey: "date",
		},
		{
			header: t("expense.statement.columns.transactionId"),
			accessorKey: "transactionId",
		},
		{
			header: t("expense.statement.columns.description"),
			accessorKey: "description",
		},
		{
			header: t("expense.statement.columns.debit"),
			accessorKey: "debit",
		},
		{
			header: t("expense.statement.columns.credit"),
			accessorKey: "credit",
		},
		{
			header: t("expense.statement.columns.balance"),
			accessorKey: "balance",
		},
	];

	return (
		<ReusableManyTable
			dataSets={[
				{
					data: expenseData || [],
					columns: expenseColumns,
					loading: expenseLoading,
					UserComponent: () => (
						<div className="flex flex-col gap-14 p-6">
							<div className="flex items-center justify-between">
								<CardTitle className="lg:text-[26px] text-[20px] font-bold w-full">
									{t("expense.title")}
								</CardTitle>
								<CustomPopUp
									DialogTriggerComponent={() => (
										<Button
											// onClick={onClickAdd}
											className="bg-emerald-500 hover:bg-emerald-600 lg:min-w-[148px] min-w-[140px] lg:h-[44px] h-[35px] text-[16px] flex items-center gap-[10px] cursor-pointer rounded-[8px]"
										>
											<svg
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M11 17H13V13H17V11H13V7H11V11H7V13H11V17ZM12 22C10.6167 22 9.31667 21.7417 8.1 21.225C6.88333 20.6917 5.825 19.975 4.925 19.075C4.025 18.175 3.30833 17.1167 2.775 15.9C2.25833 14.6833 2 13.3833 2 12C2 10.6167 2.25833 9.31667 2.775 8.1C3.30833 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.31667 8.1 2.8C9.31667 2.26667 10.6167 2 12 2C13.3833 2 14.6833 2.26667 15.9 2.8C17.1167 3.31667 18.175 4.025 19.075 4.925C19.975 5.825 20.6833 6.88333 21.2 8.1C21.7333 9.31667 22 10.6167 22 12C22 13.3833 21.7333 14.6833 21.2 15.9C20.6833 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6917 15.9 21.225C14.6833 21.7417 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
													fill="white"
												/>
											</svg>

											{t("expense.newExpense")}
										</Button>
									)}
									DialogContentComponent={() => <NewExpense />}
								/>
							</div>
							<SearchBar />
						</div>
					),
					// withPrinter: true,
					label: t("expense.title"),
				},
				{
					data: (transactionData as any) || [],
					columns: transactionColumns,
					loading: transactionLoading,
					UserComponent: () => (
						<div className="flex flex-col gap-4 p-6">
							<div className="flex items-center justify-between">
								<CardTitle className="lg:text-[26px] text-[20px] font-bold w-full">
									{t("expense.title")}
								</CardTitle>
							</div>
							<div className="flex md:flex-row flex-col items-end gap-5">
								<CustomSelect
									label={t("expense.statement.incomeList")}
									options={["vadavv", "vadvda", "vadadvvda"]}
								/>
								<div className="w-full">
									<MonthPicker
										label={t("expense.statement.dateFrom")}
										className="lg:w-[183px] w-full"
									/>
									<MonthPicker
										label={t("expense.statement.dateTo")}
										className="lg:w-[183px] w-full"
									/>
								</div>
								<Button
									// onClick={onClickAdd}
									className="bg-emerald-500 hover:bg-emerald-600 lg:min-w-[148px] min-w-[140px] lg:h-[44px] h-[35px] text-[16px] flex items-center gap-[10px] cursor-pointer rounded-[8px]"
								>
									{t("expense.statement.search")}
								</Button>
							</div>
							<SearchBar />
						</div>
					),
					// withPrinter: true,
					label: t("expense.statement.accountStatement"),
				},
			]}
			// withTopPrinter={false}
		/>
	);
}
