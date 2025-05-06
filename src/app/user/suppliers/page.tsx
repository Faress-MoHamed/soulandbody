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
import { invoicesTypee, QuotationTypee, SupplierDetailsType, useDeleteSupplier, useSuppliers, type SuppliersType } from "./hooks/useSuppliers";
import AddNewSupplier from "./components/AddNewSupplier";
import { useTypes } from "./hooks/useAddSup";
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
import { AddSuppliersType } from "./hooks/useAddSup";
import { useAddSupplierType, useUpdateSupplierType } from "./hooks/useAddSup";
import { Toaster, toast } from 'react-hot-toast';
import InvoiceDetails from "@/app/test/components/InvoiceDetails";
import { useDeleteSupplierType } from "./hooks/useAddSup"; // تأكد من استيراد الـ hook
import { useSupplierById } from "./hooks/useSuppliers";


export default function Page() {
	const { mutate: deleteSupplierType } = useDeleteSupplierType(); // نحصل على mutate من الـ hook
	const { mutate: deleteSupplier } = useDeleteSupplier(); // نحصل على mutate من الـ hook
	const { mutate: deleteQuototion } = useDeleteQuotations(); // نحصل على mutate من الـ hook

	const { t } = useTypedTranslation();
	const [ShowOrders, setShowOrders] = useState(false);
	const { data: AmountDuesData, isLoading: AmountDuesLoading } =
		useAmountsDues();
	const { data: InvoicesData, isLoading: InvoicesLoading } = useInvoices();
	const { data: SuppliersData, isLoading: SuppliersLoading } = useSuppliers();
	const { data: types, isLoading, error } = useTypes(); // جلب البيانات من useTypes
	const { fetchSupplier } = useSupplierById();
	const [supplierData, setSupplierData] = useState({
		id: null,
		name: "",
		phone: "",
		address: "",
		invoices: [],
		quotations: [],
	});

	function aaaa() {
		<div className="grid grid-cols-2 gap-5 p-6">
			<div className="col-span-1">
				<CustomInput
					label={t("suppliers.supplierName")}
					value={supplierData.name}
					onChange={(e) =>
						setSupplierData((prev) => ({ ...prev, name: e.target.value }))
					}
				/>
			</div>
			<div className="col-span-1">
				<CustomInput
					label={t("suppliers.phone")}
					value={supplierData.phone}
					onChange={(e) =>
						setSupplierData((prev) => ({ ...prev, phone: e.target.value }))
					}
				/>
			</div>
			<div className="col-span-1">
				<CustomInput
					label={t("suppliers.address")}
					value={supplierData.address}
					onChange={(e) =>
						setSupplierData((prev) => ({ ...prev, address: e.target.value }))
					}
				/>
			</div>
			<div className="col-span-1 flex items-end">
				<Button className="text-[16px] font-[500] text-[#FFFFFF] bg-[#16C47F] py-[10px] px-3 w-[148px] h-[48px] hover:bg-[#16C47F]/70 rounded-lg">
					{t("suppliers.save")}
				</Button>
			</div>
		</div>
	}

	const AmountDuesColumns: ColumnDef<AmountsDuesType>[] = [
		{
			header: t("suppliers.supplierName"),
			accessorKey: "name",
		},
		{
			header: t("suppliers.remainingAmount"),
			accessorKey: "total_outstanding",
		},
	];

	const AddSupplierCol: ColumnDef<AddSuppliersType>[] = [
		{
			header: "النوع",
			accessorKey: "type",
			cell: ({ row }) => {
				const type = row.original;
				return <div className="flex justify-center gap-2">
					<span className="px-2 py-1 rounded">
						{type.type}
					</span>
				</div>
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
							onClick={() => {
								const confirmDelete = window.confirm("هل أنت متأكد أنك تريد الحذف؟");
								if (confirmDelete) {
									deleteSupplierType({ id: type.id });
								}
							}}
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
							DialogContentComponent={({ closePopup }) => (
								<div className="bg-white p-6 rounded-md w-full max-w-[400px] space-y-4">
									<InterStateCompUpdate
										type={type}
										closePopup={closePopup}
										currentName={type.type} />
								</div>
							)}
						/>
					</div>
				);
			},
		}

	];
	const offersColumns: ColumnDef<QuotationTypee>[] = [
		{
			header: t("suppliers.offerDescription"),
			cell: ({ row }) => {
				const offer = row.original;
				return (
					<div className="flex justify-center gap-2">
						<span className="px-2 py-1 rounded">
							{offer.description}
						</span>
					</div>
				);
			},
		},
		{
			header: t("suppliers.date"),
			cell: ({ row }) => {
				const offer = row.original;
				return (
					<div className="flex justify-center gap-2">
						<span className="px-2 py-1 rounded">
							{offer.date}
						</span>
					</div>
				);
			},
		},
		{
			header: t("suppliers.actions"),
			cell: ({ row }) => {
				const quotation = row.original;

				return (
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
							DialogContentComponent={() => <ShowOffers quotation={supplierData.quotations} />}
						/>
						<Button
							onClick={() => {
								const confirmDelete = window.confirm("هل أنت متأكد أنك تريد الحذف؟");
								if (confirmDelete) { deleteQuototion({ id: quotation.id }) }
							}}
							className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#C41619]"
						>
							<DeleteIcon />
							{t("suppliers.delete")}
						</Button>
					</div>
				);
			},
		},
	]

	const InvoiceColumns: ColumnDef<invoicesTypee>[] = [
		{
			header: t("suppliers.invoiceNumber"),
			accessorKey: "invoice_no",
			cell: ({ row }) => (
				<div className="text-right">
					{row.original.invoice_no || '---'}
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
			accessorKey: "total_amount",
			cell: ({ row }) => (
				<div className="text-right">
					{row.original.total_amount ?
						Number(row.original.total_amount).toLocaleString('ar-EG') + ' ج.م' :
						'---'}
				</div>
			),
		},
		{
			header: t("suppliers.remainingAmount"),
			accessorKey: "outstanding",
			cell: ({ row }) => (
				<div className="text-right">
					{row.original.outstanding ?
						Number(row.original.outstanding).toLocaleString('ar-EG') + ' ج.م' :
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
			accessorKey: "name",
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
			cell: ({ row }) => {
				const supplier = row.original;

				return (
					<div className="flex flex-row-reverse justify-center gap-1">
						<Button
							className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#C41619]"
							onClick={() => {
								const confirmDelete = window.confirm("هل أنت متأكد أنك تريد الحذف؟");
								if (confirmDelete) { deleteSupplier({ id: supplier.id }) }
							}}
						>
							{t("suppliers.delete")}
							<DeleteIcon />
						</Button>
						<Button
							className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#16C47F]"
							onClick={async () => {
								const data = await fetchSupplier(supplier.id);
								console.log("✅ fetched supplier data:", data); // لازم تظهر quotations جوا
								setSupplierData(data);

								setShowOrders(true); // مجرد فلاغ بدل ما تبعت ID تاني
							}}
						>
							<ShowIcon />
							{t("suppliers.show")}
						</Button>


					</div>
				);
			},

		},
	];

	return (
		<ReusableManyTable
			dataSets={[
				{
					data: types?.filter(el => !el?.deleted_at) || [], // تمرير البيانات المسترجعة هنا
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
									DialogContentComponent={({ closePopup }) => (
										<div className="bg-white p-6 rounded-md w-full max-w-[400px] space-y-4">
											<InterStateCompAdd
												closePopup={closePopup} />
										</div>
									)}
								/>


							</div>
						</div>
					),
				},

				{

					data: ShowOrders ? supplierData.quotations || [] : SuppliersData || [],
					loading: ShowOrders ? SuppliersLoading : SuppliersLoading, // هنا تم تصحيح الـ loading
					columns: ShowOrders ? offersColumns : supplierColumns,
					withFilter: false,
					title: ShowOrders ? t("suppliers.addOffer") : t("suppliers.title"),
					label: t("suppliers.title"),

					UserComponent: ShowOrders
						? () => (

							<div>
								<div className="grid grid-cols-2 gap-5 p-6">
									<div className="col-span-1">
										<CustomInput
											label={t("suppliers.supplierName")}
											value={supplierData.name}
											onChange={(e) =>
												setSupplierData((prev) => ({ ...prev, name: e.target.value }))
											}
										/>
									</div>
									<div className="col-span-1">
										<CustomInput
											label={t("suppliers.phone")}
											value={supplierData.phone}
											onChange={(e) =>
												setSupplierData((prev) => ({ ...prev, phone: e.target.value }))
											}
										/>
									</div>
									<div className="col-span-1">
										<CustomInput
											label={t("suppliers.address")}
											value={supplierData.address}
											onChange={(e) =>
												setSupplierData((prev) => ({ ...prev, address: e.target.value }))
											}
										/>
									</div>
									<div className="col-span-1 flex items-end">
										<Button className="text-[16px] font-[500] text-[#FFFFFF] bg-[#16C47F] py-[10px] px-3 w-[148px] h-[48px] hover:bg-[#16C47F]/70 rounded-lg">
											{t("suppliers.save")}
										</Button>
									</div>
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
								data: supplierData.invoices || [],
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
function InterStateCompUpdate(props: any) {
	const [newEditType, setNewEditType] = useState('')
	const updateMutation = useUpdateSupplierType()
	const notifySuccess = () => {
		toast.success("تم تعديل النوع بنجاح!");
	};
	return (
		<div className="bg-white p-6 rounded-md w-full max-w-[400px] space-y-4">
			<CustomInput
				name="newEditType"
				value={newEditType}
				label={props.CurrentName}
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
					updateMutation.mutate({ id: props.type.id, formData });
					notifySuccess(); // إظهار التوست عند التأكيد
					props.closePopup()
				}}
				className="w-full text-[#16C47F] border border-[#16C47F] hover:opacity-85 rounded-[8px] py-2"
			>
				تعديل الاسم
			</Button>
		</div>
	)
}
function InterStateCompAdd(props: any) {
	const [newType, setNewType] = useState("");
	const addType = useAddSupplierType();
	const notifySuccess = () => {
		toast.success("تم إضافة النوع بنجاح!");
	};
	return (
		<div className="p-6">
			<CustomInput
				value={newType}
				onChange={(e) => setNewType(e.target.value)} // تحديث قيمة newType عند التغيير
				type="text"
				className="border border-gray-300 rounded px-13 py-6 w-full"
			/>
			<Button
				variant="outline"
				size="sm"
				onClick={() => {
					const formData = new FormData();
					formData.append("type", newType); // إضافة القيمة المدخلة
					addType.mutate(formData); // إرسال الفورم داتا

					notifySuccess(); // إظهار التوست عند التأكيد
					props.closePopup()
				}}
				className="w-full text-[#16C47F] border border-[#16C47F] hover:opacity-85 rounded-[8px] py-2"
			>
				تأكيد الإضافة
			</Button>
		</div>
	)
}