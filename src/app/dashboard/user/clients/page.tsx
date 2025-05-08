"use client";

import ReusableManyTable from "@/components/ReusableTableWithManyData";
import { useAmountsDues, type AmountsDuesType } from "./hooks/useAmountsDues";
import type { ColumnDef } from "@tanstack/react-table";
import SearchBar from "@/components/searchBar";
import { useCustomers, type CustomerType } from "./hooks/useCustomers";
import ActionButtons from "@/components/ActionButtons";
import { Button } from "@/components/ui/button";
import CustomPopUp from "@/components/popups";
import AddButton from "@/components/AddButton";
import AddNewClient from "./components/AddNewClient";
// import { useInvoices, type InvoiceType } from "./hooks/useInvoices";
import { useState } from "react";
import CustomInput from "@/components/customInput";
import InvoicesTable from "@/components/InvoicesTable";
import DeleteIcon from "@/iconsSvg/DeleteIcon";
import ShowIcon from "@/iconsSvg/Show";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";

export default function page() {
	const { t } = useTypedTranslation();
	const { data: AmountDuesData, isLoading: AmountDuesLoading } =
		useAmountsDues();
	const { data: CustomersData, isLoading: CustomersLoading } = useCustomers();
	const [ShowInvoices, setShowInvoices] = useState(false);
	const AmountDuesColumns: ColumnDef<AmountsDuesType>[] = [
		{
			header: t("clients.supplierName"),
			accessorKey: "supplierName",
		},
		{
			header: t("clients.remainingAmount"),
			accessorKey: "RemainingAmount",
		},
	];

	const CustomerColumns: ColumnDef<CustomerType>[] = [
		{
			header: t("clients.customerName"),
			accessorKey: "name",
		},
		{
			header: t("clients.phone"),
			accessorKey: "phone",
		},
		{
			header: t("clients.address"),
			accessorKey: "address",
		},
		{
			id: "actions",
			header: t("clients.options"),
			cell: ({ row }) => {
				return (
					<div className="flex justify-center gap-1">
						<Button className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#C41619]">
							<DeleteIcon />
							{t("clients.delete")}
						</Button>
						<Button
							onClick={() => {
								setShowInvoices(true);
							}}
							className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#16C47F]"
						>
							<ShowIcon />
							{t("clients.show")}
						</Button>
					</div>
				);
			},
		},
	];
	const InvoiceColumns: ColumnDef<any>[] = [
		{
			header: t("clients.invoiceNumber"),
			accessorKey: "invoiceNumber",
		},
		{
			header: t("clients.date"),
			accessorKey: "date",
		},
		{
			header: t("clients.invoiceAmount"),
			accessorKey: "totalAmount",
		},
		{
			header: t("clients.remainingAmount"),
			accessorKey: "remainingAmount",
		},
		{
			id: "actions",
			header: t("clients.options"),
			cell: ({ row }) => {
				const invoice = row.original;

				return (
					<CustomPopUp
						DialogTriggerComponent={() => {
							return (
								<Button
									variant="outline"
									size="sm"
									className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#16C47F]"
								>
									<ShowIcon />
									{t("clients.show")}
								</Button>
							);
						}}
						DialogContentComponent={() => {
							return <InvoicesTable />;
						}}
					/>
				);
			},
		},
	];
	return (
		<ReusableManyTable
			dataSets={[
				{
					data: AmountDuesData || [],
					loading: AmountDuesLoading,
					columns: AmountDuesColumns,
					withFilter: false,
					UserComponent: () => {
						return (
							<div className="flex flex-col gap-5 p-6">
								<h2 className="text-[26px] font-bold">
									{t("clients.amountsDue")}
								</h2>
								<SearchBar />
							</div>
						);
					},
					label: t("clients.amountsDue"),
				},
				{
					data: ShowInvoices ? [] : (CustomersData as any) || [],
					loading: ShowInvoices ? false : CustomersLoading,
					title: ShowInvoices ? "" : t("clients.title"),
					columns: ShowInvoices ? InvoiceColumns : CustomerColumns,
					withFilter: false,
					label: t("clients.title"),
					UserComponent: ShowInvoices
						? () => {
								return (
									<div>
										<div className="flex gap-5 items-end md:flex-row flex-col p-6">
											<CustomInput label={t("clients.customerName")} />
											<CustomInput label={t("clients.phone")} />
											<CustomInput label={t("clients.address")} />
											<Button className="text-[16px] font-[500] text-[#FFFFFF] bg-[#16C47F] p-0 py-[10px] px-3 w-[148px] h-[48px]  hover:bg-[#16C47F]/70 shadow-none cursor-pointer rounded-lg">
												{t("clients.save")}
											</Button>
										</div>
										<div className="border border-t border-[#D9d9d9]" />
										<div className="p-6">
											<SearchBar />
										</div>
									</div>
								);
						  }
						: () => {
								return (
									<div className="flex flex-col gap-5 p-6">
										<SearchBar />
									</div>
								);
						  },
					ButtonTrigger: ShowInvoices
						? () => {
								return <></>;
						  }
						: () => {
								return (
									<CustomPopUp
										DialogTriggerComponent={() => {
											return (
												<AddButton
													AddTitle={t("clients.addNewClient")}
													onClickAdd={() => {}}
												/>
											);
										}}
										DialogContentComponent={() => {
											return <AddNewClient />;
										}}
									/>
								);
						  },
					onClick: () => {
						setShowInvoices(false);
					},
				},
			]}
		/>
	);
}
