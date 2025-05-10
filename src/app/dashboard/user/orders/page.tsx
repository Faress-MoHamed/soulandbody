"use client";

import ReusableManyTable from "@/components/ReusableTableWithManyData";
import type { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";

// import { Button } from "@/components/ui/button";
import {
	useInventoryProducts,
	type InventoryProductType,
} from "./hooks/useInventoryProducts";
import TopComponentsinventoryProduct from "./components/topComponentsinventoryProduct";
// import type { SupplierType } from "../user/purchases/hooks/useSupplier";
import {
	useDeleteMyOrders,
	useMyOrders,
	// type ProductType,
} from "./hooks/useMyOrders";
import { useQuotationFromEachSupplier, type SupplierType } from "./hooks/useQuotationFromEachSupplier";
import { useOrderProductFromSupplier, useProductsFromThisSupplier,  } from "./hooks/useProductsFromThisSupplier";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import ShowIcon from "@/iconsSvg/Show";
import DeleteIcon from "@/iconsSvg/DeleteIcon";
import CustomPopUp from "@/components/popups";
import ShowSupplierOffers from "./components/showSupplierOffer";
import { Button } from "@heroui/react";
import { usependingOrders } from "./hooks/usePendingOrders";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { removeProduct } from "./components/topComponentsinventoryProduct/inventorySlice";
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
	// const { data: inventoryProductsData, isLoading: inventoryProductLoading } =
	// 	useInventoryProducts();
	const {products}=useTypedSelector(s=>s.inventory)
	// like the order id and show me the order with the suppliers
	const [showOrderDetails, setShowOrderDetails] = useState<string|undefined>();
	const [showSupplierAndOrderDetails, setShowSupplierAndOrderDetails] =
		useState<string|undefined>();



	const { data: QuotationFromEachSupplier, isLoading: QuotationFromEachSupplierLoading } = useQuotationFromEachSupplier(showOrderDetails);
			// const { orders, error, isLoading } = useOrders();
			const {data:pendingOrders,isLoading:pendingOrdersLoading}=usependingOrders()
			// Orders Table Columns
			// const { orders: MyOrders } = useOrders();
			const {data:MyOrders,isLoading:myOrdersLoading}=useMyOrders();
			const {mutate:deleteMyOrder,isPending:deleteMyOrderLoading}=useDeleteMyOrders()
			// Orders Table Columns
			const { data: ProductsFromThisSupplier, isLoading: ProductsFromThisSupplierLoading } =
			useProductsFromThisSupplier(showSupplierAndOrderDetails);
	// Suppliers Table Columns
			const QuotationFromEachSupplierColumns: ColumnDef<any>[] = [
				{
					header: t("ordersInUser.supplierName"),
					accessorKey: "supplier_name",
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
							original: { quotation_id },
						},
					}) => (
						<div className="flex space-x-2 justify-center">
							<button
								onClick={() => setShowSupplierAndOrderDetails(quotation_id)}
								className="flex items-center gap-2 px-4 py-2 bg-white text-green-500 hover:bg-white hover:opacity-85 h-[32px] rounded-[8px] border border-green-500 ml-2"
							>
								<ShowIcon />
								{t("ordersInUser.show")}
							</button>
							<button className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] rounded-[8px] border border-[#C41619]">
								<DeleteIcon />
								{t("ordersInUser.delete")}
							</button>
						</div>
					),
				},
			];

			const dispatch = useDispatch()

			const inventoryProductColumns: ColumnDef<any>[] = [
				{
					header: t("ordersInUser.productName"),
					accessorKey: "productNameLabel",
				},
				{
					header: t("ordersInUser.quantity"),
					accessorKey: "quantity",
				},
				{
					header: "",
					id: "actions",
					cell: ({row:{original:{index}}}) => (
						<div className="flex justify-center">
							<Button onPress={()=>dispatch(removeProduct(index))} className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#C41619]">
								<DeleteIcon />
								{t("ordersInUser.delete")}
							</Button>
						</div>
					),
				},
			];
			const PendingorderColumns: ColumnDef<any>[] = [
				{
					header: t("ordersInUser.orderNumber"),
					accessorKey: "id",
				},
				{
					header: t("ordersInUser.date"),
					accessorKey: "date",
				},
				{
					header: t("ordersInUser.amount"),
					accessorKey: "total_amount",
				},
				{
					header: t("ordersInUser.options"),
					id: "actions",
					cell: ({
						row: {
							original: { id },
						},
					}) => (
						<div className="flex space-x-2 justify-center">
							<button
								onClick={() => setShowOrderDetails(id)}
								className="flex items-center gap-2 px-4 py-2 bg-white text-green-500 hover:bg-white hover:opacity-85 h-[32px] rounded-[8px] border border-green-500 ml-2"
							>
								<ShowIcon />
								{t("ordersInUser.show")}
							</button>
							<button className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] rounded-[8px] border border-[#C41619]">
								<DeleteIcon />
								{t("ordersInUser.delete")}
							</button>
						</div>
					),
				},
			];

			const MyOrdersColumns: ColumnDef<any>[] = [
				{
					header: t("ordersInUser.orderNumber"),
					accessorKey: "purchase_request_id",
				},
				{
					header: t("ordersInUser.date"),
					accessorKey: "created_at",
				},
				{
					header: t("ordersInUser.amount"),
					accessorKey: "total_price",
				},
				{
					header: t("ordersInUser.options"),
					id: "actions",
					cell: ({
						row: {
							original: { purchase_request_id },
						},
					}) => (
						<div className="flex space-x-2 justify-center">
							<CustomPopUp
								DialogTriggerComponent={() => {
									return (
										<button className="flex items-center gap-2 px-4 py-2 bg-white text-green-500 hover:bg-white hover:opacity-85 h-[32px] rounded-[8px] border border-green-500 ml-2">
											<ShowIcon />
											{t("ordersInUser.show")}
										</button>
									);
								}}
								DialogContentComponent={() => {
									return <ShowSupplierOffers id={purchase_request_id}/>;
								}}
							/>

							<Button isLoading={deleteMyOrderLoading} onPress={()=>{
								deleteMyOrder(purchase_request_id)
							}} className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] rounded-[8px] border border-[#C41619]">
								<DeleteIcon />
								{t("ordersInUser.delete")}
							</Button>
						</div>
					),
				},
			];

			const {mutate,isPending}=useOrderProductFromSupplier()
	const ProductsFromThisSupplierColumns: ColumnDef<any>[] = [
		{
			header: t("ordersInUser.productTable.code"),
			accessorKey: "id",
			// cell({ row }) {
			// 	return <div className="bg-[#E8F9F2]">{row.original.code}</div>;
			// },
		},
		{
			header: t("ordersInUser.productTable.name"),
			accessorKey: "product_name",
			// cell({ row }) {
			// 	return <div className="bg-[#E8F9F2]">{row.original.name}</div>;
			// },
		},
		{
			header: t("ordersInUser.productTable.quantity"),
			accessorKey: "available_qty",
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
			accessorKey: "unit_price",
		},
		{
			header: t("ordersInUser.productTable.action"),
			id: "actions",
			cell: ({
				row: {
					original: { id, status },
				},
			}) => (
				<div className="flex justify-center">
					<button
						// variant={"outline"}
						onClick={() => {
							console.log(showSupplierAndOrderDetails)
							// if (status==="pending") {
								console.log(`طلب المنتج: ${id}`);
								mutate(showSupplierAndOrderDetails,id)
							// }
						}}
						className={`flex items-center gap-2 px-4 py-2 w-[128px] h-[32px] rounded-[8px] ${
							status==="pending"
								? "border-[#16C47F] text-emerald-600 bg-white border"
								: "bg-gray-200 text-gray-500 cursor-not-allowed opacity-50"
						}`}
						// disabled={status==="pending"}
					>
						{t("ordersInUser.productTable.order")}
					</button>
				</div>
			),
		},
	];
	return (
		<div>
			<ReusableManyTable
				dataSets={[
					{
						columns: MyOrdersColumns,
						data: MyOrders || [],
						loading: myOrdersLoading,
						// FooterComponent: () => {
						// 	return (
						// 		<div className="w-full flex justify-end p-5">
						// 			<div className="flex justify-start items-center gap-2">
						// 				<Button className="bg-[#16C47F] text-white rounded-[8px] w-[148px] h-[44px]">
						// 					{t("ordersInUser.sendOrders")}
						// 				</Button>
						// 				<Button
						// 					variant={"outline"}
						// 					className="border-[#16C47F] text-[#16C47F] w-[148px] h-[44px] rounded-[8px]"
						// 				>
						// 					{t("ordersInUser.cancel")}
						// 				</Button>
						// 			</div>
						// 		</div>
						// 	);
						// },
						label: t("ordersInUser.ordersList"),
					},
					{
						data: (products as any) || [],
						columns: inventoryProductColumns,
						// loading: inventoryProductLoading,
						label: t("ordersInUser.addOrder"),
						UserComponent: () => {
							return <TopComponentsinventoryProduct />;
						},
					},
					{
						label: t("ordersInUser.myOrders"),
						data: showSupplierAndOrderDetails
							? ProductsFromThisSupplier?.items||[]
							: showOrderDetails
							? QuotationFromEachSupplier || []
							: (pendingOrders as any) || [],
						columns: showSupplierAndOrderDetails
							? ProductsFromThisSupplierColumns
							: showOrderDetails
							?QuotationFromEachSupplierColumns
							: PendingorderColumns,
						loading: pendingOrdersLoading ||ProductsFromThisSupplierLoading || QuotationFromEachSupplierLoading,
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
