"use client";

import ReusableManyTable from "@/components/ReusableTableWithManyData";
import { useAmountsDues, type AmountsDuesType } from "./hooks/useAmountsDues";
import type { ColumnDef } from "@tanstack/react-table";
import SearchBar from "@/components/searchBar";
import ActionButtons from "@/components/ActionButtons";
import { Button } from "@/components/ui/button";
import CustomPopUp from "@/components/popups";
import AddButton from "@/components/AddButton";
import { useDeleteQuotations, useInvoices, type InvoiceType } from "./hooks/useInvoices";
import { useState } from "react";
import CustomInput from "@/components/customInput";
import { useSuppliers, type SuppliersType } from "./hooks/useSuppliers";
import AddNewSupplier from "./components/AddNewSupplier";
import { useOffers, type QuotationType } from "./hooks/useQuotations";
import { useTypes } from "./hooks/useTypeSup";
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
import { AddSuppliersType } from "./hooks/useTypeSup";
import { useAddSupplierType, useUpdateSupplierType } from "./hooks/useAddSup";
import { Toaster, toast } from 'react-hot-toast';
import InvoiceDetails from "@/app/test/components/InvoiceDetails";
import { useDeleteSupplierType } from "./hooks/useAddSup"; // تأكد من استيراد الـ hook


export default function Page() {
	const { mutate: deleteSupplier } = useDeleteSupplierType(); // نحصل على mutate من الـ hook
	const { mutate: deleteQuototion } = useDeleteQuotations(); // نحصل على mutate من الـ hook

	const { t } = useTypedTranslation();
	const [ShowOrders, setShowOrders] = useState(false);
	const [newType, setNewType] = useState("");
	const [newEditType, setNewEditType] = useState("");
	const addType = useAddSupplierType();
	const { data: AmountDuesData, isLoading: AmountDuesLoading } =
		useAmountsDues();
	const { data: InvoicesData, isLoading: InvoicesLoading } = useInvoices();
	const { data: SuppliersData, isLoading: SuppliersLoading } = useSuppliers();
	const { data: offersData, isLoading: offersLoading } = useOffers();
	const { data: types, isLoading, error } = useTypes(); // جلب البيانات من useTypes
	const updateMutation = useUpdateSupplierType();


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
	const notifySuccess = () => {
		toast.success("تم إضافة النوع بنجاح!");
	};
	const AddSupplierCol: ColumnDef<AddSuppliersType>[] = [
		{
			header: "النوع",
			accessorKey: "type",
			cell: ({ row }) => {
				const type = row.original;
				if (type.deleted_at === null) {
					return (
						<div className="flex justify-center gap-2">
							<span className="px-2 py-1 border rounded">
								{type.type}
							</span>
						</div>
					);
				} else {
					return null; // أو ممكن تعرض علامة محذوف مثلاً
				}
			},
		},

		{
			header: t("suppliers.actions"),
			cell: ({ row }) => {
				const type = row.original;

				return (
					<div className="flex flex-row-reverse justify-center gap-1">

						<Button
							className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#C41619]"
							onClick={() => deleteSupplier({ id: type.id })} // تنفيذ الـ mutation عند الضغط
						>
							{t("suppliers.delete")}
							<DeleteIcon />
						</Button>
						<CustomPopUp
							DialogTriggerComponent={() => (
								<Button
									variant="outline"
									size="sm"
									className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-[#16C47F] hover:opacity-85 h-[38px] w-[160px] rounded-[8px] border border-[#16C47F] text-sm"
								>
									تعديل
								</Button>
							)}
							DialogContentComponent={() => (
								<div className="bg-white p-6 rounded-md w-full max-w-[400px] space-y-4">
									<input
										id="newEditType" 
										value={newEditType}
										onChange={(e) => setNewEditType(e.target.value)}
										type="text"
										className="border border-gray-300 rounded px-3 py-2 w-full"
									/>

									<Button
										variant="outline"
										size="sm"
										onClick={() => {
											if (!newEditType.trim()) {
												toast.error("يجب إدخال قيمة صالحة");
												return;
											}
											const formData = new FormData();
											formData.append("type", newEditType);
											updateMutation.mutate({ id: type.id, formData });
										}}
										className="w-full text-[#16C47F] border border-[#16C47F] hover:opacity-85 rounded-[8px] py-2"
									>
										تعديل الاسم
									</Button>
								</div>
							)}
						/>
					</div>
				);
			},
		}

	];
	const offersColumns: ColumnDef<QuotationType>[] = [
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
			cell: ({ row }) => {
				const quotation = row.original;

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
					<Button onClick={() => deleteQuototion({ id: quotation.id })} // تنفيذ الـ mutation عند الضغط
						className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#C41619]">
						<DeleteIcon />
						{t("suppliers.delete")}
					</Button>
				</div>
			},
		},
	];

	const InvoiceColumns: ColumnDef<InvoiceType>[] = [
		{
			header: t("suppliers.invoiceNumber"),
			accessorKey: "invoiceNumber",
			cell: ({ row }) => (
				<div className="text-right">
					{row.original.invoiceNumber || '---'}
				</div>
			),
		},
		{
			header: t("suppliers.date"),
			accessorKey: "date",
			cell: ({ row }) => (
				<div className="text-right">
					{row.original.date ? new Date(row.original.date).toLocaleDateString('ar-EG') : '---'}
				</div>
			),
		},
		{
			header: t("suppliers.totalAmount"),
			accessorKey: "totalAmount",
			cell: ({ row }) => (
				<div className="text-right">
					{row.original.totalAmount ?
						Number(row.original.totalAmount).toLocaleString('ar-EG') + ' ج.م' :
						'---'}
				</div>
			),
		},
		{
			header: t("suppliers.remainingAmount"),
			accessorKey: "remainingAmount",
			cell: ({ row }) => (
				<div className="text-right">
					{row.original.remainingAmount ?
						Number(row.original.remainingAmount).toLocaleString('ar-EG') + ' ج.م' :
						'---'}
				</div>
			),
		},
		{
			id: "actions",
			header: t("suppliers.actions"),
			cell: ({ row }) => (
				<div className="flex justify-center">
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
						DialogContentComponent={() => (
							<InvoiceDetails />
						)}
					/>
				</div>
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
					data: types || [], // تمرير البيانات المسترجعة هنا
					columns: AddSupplierCol, // الأعمدة التي تريد عرضها
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
											<CustomInput
												label={newType}
												onChange={(e) => setNewType(e.target.value)} // تحديث قيمة newType عند التغيير
												type="text"
												className="border border-gray-300 rounded px-3 py-2 w-full"
											/>
											<Button
												variant="outline"
												size="sm"
												onClick={() => {
													const formData = new FormData();
													formData.append("type", newType); // إضافة القيمة المدخلة
													addType.mutate(formData); // إرسال الفورم داتا

													notifySuccess(); // إظهار التوست عند التأكيد
												}}
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
					data: AmountDuesData || [],
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
