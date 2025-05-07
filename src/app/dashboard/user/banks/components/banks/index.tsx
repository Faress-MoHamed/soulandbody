"use client";
import React from "react";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import CustomPopUp from "@/components/popups";
import AddButton from "@/components/AddButton";
import AddBank from "../AddBank";
import { useBankAccounts } from "../../hooks/useBanks";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";

export default function BankAccountsTable() {
	const { data: BanksData, isLoading: BanksLoading } = useBankAccounts();
	const { t } = useTypedTranslation();

	const BanksColumns = [
		{
			accessorKey: "bankName",
			header: t("bank.name"),
		},
		{
			accessorKey: "branch",
			header: t("bank.branch"),
		},
		{
			accessorKey: "accountNumber",
			header: t("bank.accountNumber"),
		},
		{
			accessorKey: "balance",
			header: t("bank.balance"),
		},
	];

	return (
		<ReusableManyTable
			dataSets={[
				{
					columns: BanksColumns,
					data: BanksData || [],
					loading: BanksLoading,
					withFilter: false,
					UserComponent: () => (
						<div className="flex md:flex-col flex-col-reverse gap-4 mb-6">
							<div className="flex flex-row justify-between items-center gap-5">
								<h2 className="text-[26px] font-bold">
									{t("bankAccounts.tabs.banks")}
								</h2>
								<CustomPopUp
									DialogTriggerComponent={() => (
										<AddButton AddTitle={t("bank.add")} onClickAdd={() => {}} />
									)}
									DialogContentComponent={() => <AddBank />}
								/>
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
