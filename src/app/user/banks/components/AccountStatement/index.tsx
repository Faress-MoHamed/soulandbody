"use client";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import React from "react";
import CustomSelect from "@/components/customSelect";
import { MonthPicker } from "@/components/monthPicker";
import { Button } from "@/components/ui/button";
import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";
import { useAccountStatement } from "../../hooks/useAccountStatement";

export default function AccountStatementTable() {
	const { data: AccountStatementData, isLoading: AccountStatementLoading } = useAccountStatement();
	const { t } = useTypedTranslation();
const AccountStatementColumns = [
	{
		accessorKey: "date",
		header: t("AccountStatement.tableHeaders.date"),
	},
	{
		accessorKey: "transactionNumber",
		header: t("AccountStatement.tableHeaders.transactionNumber"),
	},
	{
		accessorKey: "bankName",
		header: t("AccountStatement.tableHeaders.bankName"),
	},
	{
		accessorKey: "description",
		header: t("AccountStatement.tableHeaders.description"),
	},
	{
		accessorKey: "debit",
		header: t("AccountStatement.tableHeaders.debit"),
	},
	{
		accessorKey: "credit",
		header: t("AccountStatement.tableHeaders.credit"),
	},
	{
		accessorKey: "balance",
		header: t("AccountStatement.tableHeaders.balance"),
	},
];

	return (
		<ReusableManyTable
			dataSets={[
				{
					columns: AccountStatementColumns,
					data: AccountStatementData || [],
					loading: AccountStatementLoading,
					withFilter: false,
					title: t("AccountStatement.labels.accountStatement"),
					UserComponent: () => (
						<div className="flex md:flex-col flex-col-reverse gap-4 mb-6">
							<div className="flex md:flex-row flex-col items-end gap-5">
								<CustomSelect
									label={t("AccountStatement.labels.accountStatement")}
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
					containerClassName: "p-4 border-none",
					withPrinter: false,
				},
			]}
			withTopPrinter={false}
		/>
	);
}
