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
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import ShowIcon from "@/iconsSvg/Show";
import DeleteIcon from "@/iconsSvg/DeleteIcon";
function EyeIcon() {
	return (
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
	);
}

export default function page() {
	const { t } = useTypedTranslation();
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
			header: t("ordersInUser.productName"),
			accessorKey: "name",
		},
		{
			header: t("ordersInUser.quantity"),
			accessorKey: "quantity",
		},
		{
			header: t("ordersInUser.unitPrice"),
			accessorKey: "unitPrice",
			cell: ({ getValue }) => `${getValue()} ج`,
		},
		{
			header: t("ordersInUser.total"),
			accessorKey: "total",
			cell: ({ getValue }) => `${getValue()} ج`,
		},
		{
			header: t("ordersInUser.supplierName"),
			accessorKey: "supplier",
		},
		{
			header: "",
			id: "actions",
			cell: () => (
				<div className="flex justify-center">
					<Button className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#C41619]">
						<DeleteIcon />
						{t("ordersInUser.delete")}
					</Button>
				</div>
			),
		},
	];

	const inventoryProductColumns: ColumnDef<InventoryProductType>[] = [
		{
			header: t("ordersInUser.productName"),
			accessorKey: "name",
		},
		{
			header: t("ordersInUser.quantity"),
			accessorKey: "quantity",
		},
		{
			header: "",
			id: "actions",
			cell: () => (
				<div className="flex justify-center">
					<Button className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#C41619]">
						<DeleteIcon />
						{t("ordersInUser.delete")}
					</Button>
				</div>
			),
		},
	];

	// Suppliers Table Columns
	const supplierColumns: ColumnDef<SupplierType>[] = [
		{
			header: t("ordersInUser.supplierName"),
			accessorKey: "name",
		},
		{
			header: t("ordersInUser.date"),
			accessorKey: "date",
		},
		{
			header: t("ordersInUser.options"),
			id: "actions",
			cell: ({
				row: {
					original: { code },
				},
			}) => (
				<div className="flex space-x-2 justify-center">
					<Button
						onClick={() => setShowSupplierAndOrderDetails(code)}
						className="flex items-center gap-2 px-4 py-2 bg-white text-green-500 hover:bg-white hover:opacity-85 h-[32px] rounded-[8px] border border-green-500 ml-2"
					>
						<ShowIcon />
						{t("ordersInUser.show")}
					</Button>
					<Button className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] rounded-[8px] border border-[#C41619]">
						<DeleteIcon />
						{t("ordersInUser.delete")}
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
			header: t("ordersInUser.orderNumber"),
			accessorKey: "orderNumber",
		},
		{
			header: t("ordersInUser.date"),
			accessorKey: "date",
		},
		{
			header: t("ordersInUser.amount"),
			accessorKey: "ordersCount",
		},
		{
			header: t("ordersInUser.options"),
			id: "actions",
			cell: ({
				row: {
					original: { orderNumber },
				},
			}) => (
				<div className="flex space-x-2 justify-center">
					<Button
						onClick={() => setShowOrderDetails(orderNumber)}
						className="flex items-center gap-2 px-4 py-2 bg-white text-green-500 hover:bg-white hover:opacity-85 h-[32px] rounded-[8px] border border-green-500 ml-2"
					>
						<ShowIcon />
						{t("ordersInUser.show")}
					</Button>
					<Button className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] rounded-[8px] border border-[#C41619]">
						<DeleteIcon />
						{t("ordersInUser.delete")}
					</Button>
				</div>
			),
		},
	];

	const { data: productsSupplier, isLoading: productsSupplierLoading } =
		useProducts();

	const Productcolumns: ColumnDef<ProductType>[] = [
		{
			header: t("ordersInUser.productTable.code"),
			accessorKey: "code",
			// cell({ row }) {
			// 	return <div className="bg-[#E8F9F2]">{row.original.code}</div>;
			// },
		},
		{
			header: t("ordersInUser.productTable.name"),
			accessorKey: "name",
			// cell({ row }) {
			// 	return <div className="bg-[#E8F9F2]">{row.original.name}</div>;
			// },
		},
		{
			header: t("ordersInUser.productTable.quantity"),
			accessorKey: "quantity",
			// cell({ row }) {
			// 	return <div className="bg-[#E8F9F2]">{row.original.quantity}</div>;
			// },
		},
		{
			header: t("ordersInUser.productTable.unit"),
			accessorKey: "unit",
		},
		{
			header: t("ordersInUser.productTable.price"),
			accessorKey: "price",
		},
		{
			header: t("ordersInUser.productTable.action"),
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
						{t("ordersInUser.productTable.order")}
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
											{t("ordersInUser.sendOrders")}
										</Button>
										<Button
											variant={"outline"}
											className="border-[#16C47F] text-[#16C47F] w-[148px] h-[44px] rounded-[8px]"
										>
											{t("ordersInUser.cancel")}
										</Button>
									</div>
								</div>
							);
						},
						label: t("ordersInUser.ordersList"),
					},
					{
						data: (inventoryProductsData as any) || [],
						columns: inventoryProductColumns,
						loading: inventoryProductLoading,
						label: t("ordersInUser.addOrder"),
						UserComponent: () => {
							return <TopComponentsinventoryProduct />;
						},
					},
					{
						label: t("ordersInUser.myOrders"),
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
											<p>{showSupplierAndOrderDetails}</p>
											<p>{showOrderDetails}</p>
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
