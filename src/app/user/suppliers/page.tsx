"use client";

import ReusableManyTable from "@/components/ReusableTableWithManyData";
import { useAmountsDues, type AmountsDuesType } from "./hooks/useAmountsDues";
import type { ColumnDef } from "@tanstack/react-table";
import SearchBar from "@/components/searchBar";
import ActionButtons from "@/components/ActionButtons";
import { Button } from "@/components/ui/button";
import CustomPopUp from "@/components/popups";
import AddButton from "@/components/AddButton";
import { useInvoices, type InvoiceType } from "./hooks/useInvoices";
import { useState } from "react";
import CustomInput from "@/components/customInput";
import { useSuppliers, type SuppliersType } from "./hooks/useSuppliers";
import AddNewSupplier from "./components/AddNewSupplier";
import { useOffers, type OfferType } from "./hooks/useOffers";
import { useTypes } from "./hooks/useAddSupp";
import {
	useProductDetails,
	type ProductDetailType,
} from "./hooks/useProductDetails";
import AddQuote from "./components/AddQuote";
import PriceOfferTable from "./components/AddQuote/table";
import ShowOffers from "./components/productDetailsPopUp";
import InvoicesTable from "@/components/InvoicesTable";
import ShowIcon from "@/iconsSvg/Show";
import DeleteIcon from "@/iconsSvg/DeleteIcon";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { AddSuppliersType } from "./hooks/useAddSupp";

export default function Page() {
	const { t } = useTypedTranslation();
	const [ShowOrders, setShowOrders] = useState(false);

	const { data: AmountDuesData, isLoading: AmountDuesLoading } =
		useAmountsDues();
	const { data: InvoicesData, isLoading: InvoicesLoading } = useInvoices();
	const { data: SuppliersData, isLoading: SuppliersLoading } = useSuppliers();
	const { data: offersData, isLoading: offersLoading } = useOffers();
	const { data: types, isLoading: typesloading } = useTypes();

	const AmountDuesColumns: ColumnDef<SuppliersType>[] = [
		{
			header: t("suppliers.supplierName"),
			accessorKey: "supplierName",
		},
		{
			header: t("suppliers.remainingAmount"),
			accessorKey: "RemainingAmount",
		},
	];

	const AddSupplierCol: ColumnDef<AddSuppliersType>[] = [
		{
			header: "النوع",
			cell: () => (
				<div className="flex flex-row-reverse justify-center gap-1">
					{types?.map((type: AddSuppliersType) => (
						<span key={type.id}>{type.type}</span>
					))}
				</div>
			)
		}
		
	,
		{
			header: t("suppliers.actions"),
			cell: () => (
				<div className="flex flex-row-reverse justify-center gap-1">
					<Button className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#C41619]">
						{t("suppliers.delete")}
						<DeleteIcon />
					</Button>
					<Button
						className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#16C47F]"
						onClick={() => setShowOrders(true)}
					>
						تعديل


					</Button>
				</div>
			),
		},
	];

	const offersColumns: ColumnDef<OfferType>[] = [
		{
			header: t("suppliers.offerDescription"),
			accessorKey: "description",
		},
		{
			header: t("suppliers.date"),
			accessorKey: "date",
		},
		{
			header: t("suppliers.actions"),
			cell: () => (
				<div className="flex justify-center gap-2">
					<CustomPopUp
						DialogTriggerComponent={() => (
							<Button
								variant="outline"
								size="sm"
								className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#16C47F]"
							>
								<ShowIcon />
								{t("suppliers.show")}
							</Button>
						)}
						DialogContentComponent={() => <ShowOffers />}
					/>
					<Button className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#C41619]">
						<DeleteIcon />
						{t("suppliers.delete")}
					</Button>
				</div>
			),
		},
	];

	const InvoiceColumns: ColumnDef<InvoiceType>[] = [
		{
			header: t("suppliers.invoiceNumber"),
			accessorKey: "invoiceNumber",
		},
		{
			header: t("suppliers.date"),
			accessorKey: "date",
		},
		{
			header: t("suppliers.totalAmount"),
			accessorKey: "totalAmount",
		},
		{
			header: t("suppliers.remainingAmount"),
			accessorKey: "remainingAmount",
		},
		{
			id: "actions",
			header: t("suppliers.actions"),
			cell: () => (
				<CustomPopUp
					DialogTriggerComponent={() => (
						<Button
							variant="outline"
							size="sm"
							className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#16C47F]"
						>
							<ShowIcon />
							{t("suppliers.show")}
						</Button>
					)}
					DialogContentComponent={() => <InvoicesTable />}
				/>
			),
		},
	];
	const supplierColumns: ColumnDef<SuppliersType>[] = [
		{
			header: t("suppliers.supplierName"),
			accessorKey: "supplierName",
		},
		{
			header: t("suppliers.phone"),
			accessorKey: "phone",
		},
		{
			header: t("suppliers.address"),
			accessorKey: "address",
		},
		{
			header: t("suppliers.supplierType"),
			accessorKey: "supplierType",
		},
		{
			header: t("suppliers.actions"),
			cell: () => (
				<div className="flex flex-row-reverse justify-center gap-1">
					<Button className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#C41619]">
						{t("suppliers.delete")}
						<DeleteIcon />
					</Button>
					<Button
						className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#16C47F]"
						onClick={() => setShowOrders(true)}
					>
						<ShowIcon />

						{t("suppliers.show")}
					</Button>
				</div>
			),
		},
	];

	return (
		<ReusableManyTable
			dataSets={[
				{
					data: AmountDuesData || [],
					columns: AddSupplierCol,
					withFilter: false,
					label: t("suppliers.addTypeSupplier"),
					UserComponent: () => (
						<div className="flex flex-col gap-5 p-6">
							<h2 className="text-[26px] font-bold">
								{t("suppliers.addTypeSupplier")}
							</h2>
							<div className="flex justify-between">
								<SearchBar />
								<CustomPopUp
									DialogTriggerComponent={() => (
										<Button
											variant="outline"
											size="sm"
											className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-[#16C47F] hover:opacity-85 h-[38px] w-[160px] rounded-[8px] border border-[#16C47F] text-sm"
										>
											اضافة نوع مورد جديد
										</Button>
									)}
									DialogContentComponent={() => (
										<div className="bg-white p-6 rounded-md w-full max-w-[400px] space-y-4">
											<div className="flex flex-col gap-2">
												<label className="text-sm font-medium text-gray-700">النوع</label>
												<CustomInput />
											</div>
											<Button
												variant="outline"
												size="sm"
												className="w-full text-[#16C47F] border border-[#16C47F] hover:opacity-85 rounded-[8px] py-2"
											>
												تأكيد الإضافة
											</Button>
										</div>
									)}
								/>

							</div>
						</div>
					),
				},
				{
					data: ShowOrders ? offersData || [] : SuppliersData || [],
					loading: ShowOrders ? offersLoading : SuppliersLoading,
					columns: ShowOrders ? offersColumns : supplierColumns,
					withFilter: false,
					title: ShowOrders ? t("suppliers.addOffer") : t("suppliers.title"),
					label: t("suppliers.title"),
					UserComponent: ShowOrders
						? () => (
							<div>
								<div className="flex gap-5 items-end md:flex-row flex-col p-6">
									<CustomInput label={t("suppliers.supplierName")} />
									<CustomInput label={t("suppliers.phone")} />
									<CustomInput label={t("suppliers.address")} />
									<Button className="text-[16px] font-[500] text-[#FFFFFF] bg-[#16C47F] p-0 py-[10px] px-3 w-[148px] h-[48px] hover:bg-[#16C47F]/70 shadow-none cursor-pointer rounded-lg">
										{t("suppliers.save")}
									</Button>
								</div>
								<div className="border border-t border-[#D9d9d9]" />
								<div className="p-6 w-full flex md:flex-row md:gap-0 gap-5 flex-col justify-between md:items-end">
									<SearchBar />
									<CustomPopUp
										DialogTriggerComponent={() => (
											<AddButton
												AddTitle={t("suppliers.addOffer")}
												onClickAdd={() => { }}
											/>
										)}
										DialogContentComponent={() => <AddQuote />}
									/>
								</div>
							</div>
						)
						: () => (
							<div className="flex flex-col gap-5 p-6">
								<SearchBar />
							</div>
						),
					ButtonTrigger: ShowOrders
						? () => <></>
						: () => (
							<CustomPopUp
								DialogTriggerComponent={() => (
									<AddButton
										AddTitle={t("suppliers.addSupplier")}
										onClickAdd={() => { }}
									/>
								)}
								DialogContentComponent={() => <AddNewSupplier />}
							/>
						),
					onClick: () => setShowOrders(false),
					nestedTable: ShowOrders
						? [
							{
								title: t("suppliers.invoices"),
								data: InvoicesData || [],
								columns: InvoiceColumns,
							},
						]
						: undefined,
				},
				{
					data: AddSupplierCol || [],
					loading: AmountDuesLoading,
					columns: AmountDuesColumns,
					withFilter: false,
					label: t("suppliers.amountDue"),
					UserComponent: () => (
						<div className="flex flex-col gap-5 p-6">
							<h2 className="text-[26px] font-bold">
								{t("suppliers.amountDue")}
							</h2>
							<SearchBar />
						</div>
					),
				},

			]}
		/>
	);
}
