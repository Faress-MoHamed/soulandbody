"use client";

import ReusableManyTable from "@/components/ReusableTableWithManyData";
import type { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import {
	useOrderProducts,
	type OrderProductType,
} from "./hooks/useOrderProducts";
import { Button } from "@/components/ui/button";
import QuantitySelector from "@/components/QuantitySelector";
import {
	useInventoryProducts,
	type InventoryProductType,
} from "./hooks/useInventoryProducts";
import TopComponentsinventoryProduct from "./components/topComponentsinventoryProduct";
// import type { SupplierType } from "../user/purchases/hooks/useSupplier";
import {
	useOrders,
	type OrderType,
	// type ProductType,
} from "./hooks/useMyOrders";
import { useSuppliers, type SupplierType } from "./hooks/useSuppliers";
import { useProducts, type ProductType } from "./hooks/useProductSupplier";
export default function page() {
	const { data: orderProductsData, isLoading: orderProductsLoading } =
		useOrderProducts();
	const { data: inventoryProductsData, isLoading: inventoryProductLoading } =
		useInventoryProducts();
	// like the order id and show me the order with the suppliers
	const [showOrderDetails, setShowOrderDetails] = useState("");
	const [showSupplierAndOrderDetails, setShowSupplierAndOrderDetails] =
		useState("");

	const orderProductColumns: ColumnDef<OrderProductType>[] = [
		{
			header: "كود المنتج",
			accessorKey: "code",
		},
		{
			header: "اسم المنتج",
			accessorKey: "name",
		},
		{
			header: "الكمية",
			accessorKey: "quantity",
		},
		{
			header: "وحدة البيع",
			accessorKey: "unitPrice",
			cell: ({ getValue }) => `${getValue()} ج`,
		},
		{
			header: "الإجمالي",
			accessorKey: "total",
			cell: ({ getValue }) => `${getValue()} ج`,
		},
		{
			header: "المورد",
			accessorKey: "supplier",
		},
		{
			header: "",
			id: "actions",
			cell: () => (
				<div className="flex justify-center">
					<Button className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#C41619]">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-trash-2"
						>
							<path d="M3 6h18" />
							<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
							<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
							<line x1="10" x2="10" y1="11" y2="17" />
							<line x1="14" x2="14" y1="11" y2="17" />
						</svg>
						حذف
					</Button>
				</div>
			),
		},
	];
	const inventoryProductColumns: ColumnDef<InventoryProductType>[] = [
		{
			header: "كود المنتج",
			accessorKey: "code",
		},
		{
			header: "فئة المنتج",
			accessorKey: "category",
		},
		{
			header: "اسم المنتج",
			accessorKey: "name",
		},
		{
			header: "الكمية",
			accessorKey: "quantity",
		},
		{
			header: "",
			id: "actions",
			cell: () => (
				<div className="flex justify-center">
					<Button className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#C41619]">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-trash-2"
						>
							<path d="M3 6h18" />
							<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
							<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
							<line x1="10" x2="10" y1="11" y2="17" />
							<line x1="14" x2="14" y1="11" y2="17" />
						</svg>
						حذف
					</Button>
				</div>
			),
		},
	];

	// Suppliers Table Columns
	const supplierColumns: ColumnDef<SupplierType>[] = [
		{
			header: "التسلسل",
			accessorKey: "code",
		},
		{
			header: "اسم المورد",
			accessorKey: "name",
		},
		{
			header: "التاريخ",
			accessorKey: "date",
		},
		{
			header: "خيارات",
			id: "actions",
			cell: ({
				row: {
					original: { code },
				},
			}) => (
				<div className="flex space-x-2 justify-center">
					<Button
						onClick={() => {
							setShowSupplierAndOrderDetails(code);
						}}
						className="flex items-center gap-2 px-4 py-2 bg-white text-green-500 hover:bg-white hover:opacity-85 h-[32px] rounded-[8px] border border-green-500 ml-2"
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M8.00521 10.3334C9.29387 10.3334 10.3385 9.28875 10.3385 8.00008C10.3385 6.71142 9.29387 5.66675 8.00521 5.66675C6.71654 5.66675 5.67188 6.71142 5.67188 8.00008C5.67188 9.28875 6.71654 10.3334 8.00521 10.3334Z"
								stroke="#16C47F"
							/>
							<path
								d="M13.4616 7.28933C13.7202 7.604 13.8496 7.76067 13.8496 8C13.8496 8.23933 13.7202 8.396 13.4616 8.71067C12.5149 9.86 10.4269 12 8.00292 12C5.57892 12 3.49092 9.86 2.54425 8.71067C2.28558 8.396 2.15625 8.23933 2.15625 8C2.15625 7.76067 2.28558 7.604 2.54425 7.28933C3.49092 6.14 5.57892 4 8.00292 4C10.4269 4 12.5149 6.14 13.4616 7.28933Z"
								stroke="#16C47F"
							/>
						</svg>
						عرض
					</Button>
					<Button className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] rounded-[8px] border border-[#C41619]">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-trash-2"
						>
							<path d="M3 6h18" />
							<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
							<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
							<line x1="10" x2="10" y1="11" y2="17" />
							<line x1="14" x2="14" y1="11" y2="17" />
						</svg>
						حذف
					</Button>
				</div>
			),
		},
	];
	const { data: suppliers, isLoading: suppliersLoading } = useSuppliers();
	const { orders, error, isLoading } = useOrders();
	// Orders Table Columns
	const orderColumns: ColumnDef<OrderType>[] = [
		{
			header: "رقم الطلب",
			accessorKey: "orderNumber",
		},
		{
			header: "التاريخ",
			accessorKey: "date",
		},
		{
			header: "عدد المنتجات",
			accessorKey: "ordersCount",
		},
		{
			header: "خيارات",
			id: "actions",
			cell: ({
				row: {
					original: { orderNumber },
				},
			}) => (
				<div className="flex space-x-2 justify-center">
					<Button
						onClick={() => {
							setShowOrderDetails(orderNumber);
						}}
						className="flex items-center gap-2 px-4 py-2 bg-white text-green-500 hover:bg-white hover:opacity-85 h-[32px] rounded-[8px] border border-green-500 ml-2"
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M8.00521 10.3334C9.29387 10.3334 10.3385 9.28875 10.3385 8.00008C10.3385 6.71142 9.29387 5.66675 8.00521 5.66675C6.71654 5.66675 5.67188 6.71142 5.67188 8.00008C5.67188 9.28875 6.71654 10.3334 8.00521 10.3334Z"
								stroke="#16C47F"
							/>
							<path
								d="M13.4616 7.28933C13.7202 7.604 13.8496 7.76067 13.8496 8C13.8496 8.23933 13.7202 8.396 13.4616 8.71067C12.5149 9.86 10.4269 12 8.00292 12C5.57892 12 3.49092 9.86 2.54425 8.71067C2.28558 8.396 2.15625 8.23933 2.15625 8C2.15625 7.76067 2.28558 7.604 2.54425 7.28933C3.49092 6.14 5.57892 4 8.00292 4C10.4269 4 12.5149 6.14 13.4616 7.28933Z"
								stroke="#16C47F"
							/>
						</svg>
						عرض
					</Button>
					<Button className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] rounded-[8px] border border-[#C41619]">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-trash-2"
						>
							<path d="M3 6h18" />
							<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
							<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
							<line x1="10" x2="10" y1="11" y2="17" />
							<line x1="14" x2="14" y1="11" y2="17" />
						</svg>
						حذف
					</Button>
				</div>
			),
		},
	];
	const { data: productsSupplier, isLoading: productsSupplierLoading } =
		useProducts();

	const Productcolumns: ColumnDef<ProductType>[] = [
		{
			header: "كود المنتج",
			accessorKey: "code",
			// cell({ row }) {
			// 	return <div className="bg-[#E8F9F2]">{row.original.code}</div>;
			// },
		},
		{
			header: "اسم المنتج",
			accessorKey: "name",
			// cell({ row }) {
			// 	return <div className="bg-[#E8F9F2]">{row.original.name}</div>;
			// },
		},
		{
			header: "الكمية",
			accessorKey: "quantity",
			// cell({ row }) {
			// 	return <div className="bg-[#E8F9F2]">{row.original.quantity}</div>;
			// },
		},
		{
			header: "وحدة البيع",
			accessorKey: "unit",
		},
		{
			header: "الاجمالي",
			accessorKey: "price",
		},
		{
			header: "الاجراء",
			id: "actions",
			cell: ({
				row: {
					original: { code, available },
				},
			}) => (
				<div className="flex justify-center">
					<Button
						variant={"outline"}
						onClick={() => {
							if (available) {
								console.log(`طلب المنتج: ${code}`);
							}
						}}
						className={`flex items-center gap-2 px-4 py-2 w-[128px] h-[32px] rounded-[8px] ${
							available
								? "border-[#16C47F] text-emerald-600 bg-white border"
								: "bg-gray-200 text-gray-500 cursor-not-allowed opacity-50"
						}`}
						disabled={!available}
					>
						طلب
					</Button>
				</div>
			),
		},
	];
	return (
		<div>
			<ReusableManyTable
				dataSets={[
					{
						columns: orderProductColumns,
						data: orderProductsData || [],
						loading: orderProductsLoading,
						FooterComponent: () => {
							return (
								<div className="w-full flex justify-end p-5">
									<div className="flex justify-start items-center gap-2">
										<Button className="bg-[#16C47F] text-white rounded-[8px] w-[148px] h-[44px]">
											ارسال الطلبات
										</Button>
										<Button
											variant={"outline"}
											className="border-[#16C47F] text-[#16C47F] w-[148px] h-[44px] rounded-[8px]"
										>
											الغاء
										</Button>
									</div>
								</div>
							);
						},
						label: "قائمة الطلبات",
					},
					{
						data: (inventoryProductsData as any) || [],
						columns: inventoryProductColumns,
						loading: inventoryProductLoading,
						label: "اضافة طلب",
						UserComponent: () => {
							return <TopComponentsinventoryProduct />;
						},
					},
					{
						label: "طلباتي",
						data: showSupplierAndOrderDetails
							? productsSupplier
							: showOrderDetails
							? suppliers || []
							: (orders as any) || [],
						columns: showSupplierAndOrderDetails
							? Productcolumns
							: showOrderDetails
							? supplierColumns
							: orderColumns,
						loading: isLoading || suppliersLoading,
						UserComponent: showSupplierAndOrderDetails
							? () => {
									return (
										<div className="p-6 flex justify-between text-[36px] font-bold">
											<p>{showOrderDetails}</p>
											<p>{showSupplierAndOrderDetails}</p>
										</div>
									);
							  }
							: showOrderDetails
							? () => {
									return (
										<div className="p-6 flex justify-end text-[36px] font-bold">
											{showOrderDetails}
										</div>
									);
							  }
							: () => null,

						onClick: () => {
							if (showSupplierAndOrderDetails) {
								setShowSupplierAndOrderDetails("");
							} else if (showOrderDetails) {
								setShowOrderDetails("");
							} else {
							}
						},
					},
				]}
			/>
		</div>
	);
}
