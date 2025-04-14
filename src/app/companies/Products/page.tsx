"use client";

import React from "react";
import { useProducts, type Product } from "./useProducts";
import ReusableTable from "@/components/ReusableTable";
import type { ColumnDef } from "@tanstack/react-table";
import CustomInput from "@/components/customInput";
import { Button } from "@/components/ui/button";
import CustomPopUp from "@/components/popups";
import OtherBranches from "./components/OtherBranches";

export default function ProductsPage() {
	const { data: productsData, isLoading: ProductDataLoading } = useProducts();

	const columns: ColumnDef<Product>[] = [
		{
			accessorKey: "productCode",
			header: "كود المنتج",
		},
		{
			accessorKey: "productName",
			header: "اسم المنتج",
		},
		{
			accessorKey: "productDescription",

			header: "وصف المنتج",
		},
		{
			accessorKey: "unit",
			header: "الوحدة",
		},
		{
			accessorKey: "price",

			header: "السعر",
		},
		{
			accessorKey: "quantity",
			header: "الكمية",
		},
		{
			accessorKey: "category",
			header: "الفئة",
		},
		{
			accessorKey: "inStock",
			header: "المتبقي",
		},
		{
			// accessorKey: "inStock",
			header: "فروع اخرى",
			cell: ({ row: { original } }) => {
				return (
					<CustomPopUp
						DialogTriggerComponent={() => (
							<Button
								variant={"outline"}
								className="p-1 border-[#16C47F] text-[#16C47F] w-[84px h-[32px] text-center hover:opacity-70 hover:text-[#16C47F]"
							>
								فروع اخرى
							</Button>
						)}
						DialogContentComponent={() => <OtherBranches />}
					/>
				);
			},
		},
	];

	return (
		<ReusableTable
			// title="المنتجات"
			containerClassName="mt-[57px]"
			withFilter={false}
			UserComponent={() => {
				return (
					<div className="p-6 border-1">
						<h1 className="text-[26px] font-bold">المنتجات</h1>
						<CustomInput
							wrapperClassName="md:w-[395px]"
							className="min-w-[395px] h-[40px]"
							placeholder="ابحث هنا.."
						/>
					</div>
				);
			}}
			loading={ProductDataLoading}
			data={productsData || []}
			columns={columns}
		/>
	);
}
