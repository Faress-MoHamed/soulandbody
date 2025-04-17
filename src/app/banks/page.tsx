"use client";
import React from "react";
import SelectableWithDropDown from "@/components/selectableWithDropDown";
import AccountStatementTable from "./components/AccountStatement";
import IncomingChecks from "./components/Checks/IncomingChecks";
import OutgoingChecks from "./components/Checks/OutgoingChecks";
import IncomingTransfers from "./components/Transfers/IncomingTransfers";
import OutgoingTransfers from "./components/Transfers/OutgoingTransfers";
import Withdrawal from "./components/processes/Withdrawal";
import Deposit from "./components/processes/Deposit";
import BankAccountsTable from "./components/banks";
import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";

export default function Page() {
	const { t } = useTypedTranslation();

	return (
		<SelectableWithDropDown
			items={[
				{
					label: t("bankAccounts.tabs.accountStatement"),
					component: <AccountStatementTable />,
				},
				{
					label: t("bankAccounts.tabs.checks"),
					options: [
						{
							label: t("bankAccounts.tabs.incoming"),
							component: <IncomingChecks />,
						},
						{
							label: t("bankAccounts.tabs.outgoing"),
							component: <OutgoingChecks />,
						},
					],
				},
				{
					label: t("bankAccounts.tabs.transfers"),
					options: [
						{
							label: t("bankAccounts.tabs.incoming"),
							component: <IncomingTransfers />,
						},
						{
							label: t("bankAccounts.tabs.outgoing"),
							component: <OutgoingTransfers />,
						},
					],
				},
				{
					label: t("bankAccounts.tabs.operations"),
					options: [
						{
							label: t("bankAccounts.tabs.withdraw"),
							component: <Withdrawal />,
						},
						{
							label: t("bankAccounts.tabs.deposit"),
							component: <Deposit />,
						},
					],
				},
				{
					label: t("bankAccounts.tabs.banks"),
					component: <BankAccountsTable />,
				},
			]}
		/>
	);
}
