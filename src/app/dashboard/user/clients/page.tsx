"use client";

import ReusableManyTable from "@/components/ReusableTableWithManyData";
import type { ColumnDef } from "@tanstack/react-table";
import SearchBar from "@/components/searchBar";
import { useAddCustomer, fetchCustomerById, useCustomers, type CustomerType, Customer, Invoice, deleteCustomerById } from "./hooks/useCustomers";
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
import toast from "react-hot-toast";

export default function Page() {
	const { t } = useTypedTranslation();

	const { data: CustomersData, isLoading: CustomersLoading } = useCustomers();
	const [ShowInvoices, setShowInvoices] = useState(false);
	const [customer, setCustomer] = useState<Customer | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<any>(null);
	const AmountDuesColumns: ColumnDef<CustomerType>[] = [
		{
			header: t("clients.supplierName"),
			accessorKey: "name",
		},
		{
			header: t("clients.remainingAmount"),
			accessorKey: "outstanding_amount",
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
				const customer = row.original;

				return (
					<div className="flex justify-center gap-1">
						<Button
							onClick={async () => {
								try {
									await deleteCustomerById(customer.id);
									toast.success("تم الحذف بنجاح");
								} catch (error) {
									toast.error("فشل الحذف");
								}
							}}
							className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#C41619]"
						>
							<DeleteIcon />
							{t("clients.delete")}
						</Button>

						<Button
							onClick={async () => {
								setIsLoading(true);
								try {
									const data = await fetchCustomerById(customer.id);  // استخدم الـ id من العميل بدلاً من 1
									setCustomer(data);  // تعيين بيانات العميل
									setShowInvoices(true);  // تفعيل عرض الفواتير
								} catch (err) {
									setError(err);
								} finally {
									setIsLoading(false);
								}
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

	const InvoiceColumns: ColumnDef<Invoice>[] = [
		{
			header: t("clients.invoiceNumber"),
			accessorKey: "invoice_no",
		},
		{
			header: t("clients.date"),
			accessorKey: "date",
		},
		{
			header: t("clients.invoiceAmount"),
			accessorKey: "total_amount",
		},
		{
			header: t("clients.remainingAmount"),
			accessorKey: "outstanding_amount",
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
							return <InvoicesTable invoice={invoice} />;  // تمرير الفاتورة كـ prop
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
					data: CustomersData || [],
					loading: CustomersLoading,
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
					data: ShowInvoices ? customer?.sell_invoices || [] : CustomersData || [],
					columns: ShowInvoices ? InvoiceColumns : CustomerColumns,
					loading: ShowInvoices ? isLoading : CustomersLoading,
					withFilter: false,
					label: t("clients.title"),
					UserComponent: ShowInvoices
						? () => {
							return (
								<div className="flex gap-5 items-end md:flex-row flex-col p-6">
									<CustomInput label={t("clients.customerName")} value={customer?.name || ""} />
									<CustomInput label={t("clients.phone")} value={customer?.phone || ""} />
									<CustomInput label={t("clients.address")} value={customer?.address || ""} />
									<Button className="text-[16px] font-[500] text-[#FFFFFF] bg-[#16C47F] p-0 py-[10px] px-3 w-[148px] h-[48px]  hover:bg-[#16C47F]/70 shadow-none cursor-pointer rounded-lg">
										{t("clients.save")}
									</Button>
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
												onClickAdd={() => { }}
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
