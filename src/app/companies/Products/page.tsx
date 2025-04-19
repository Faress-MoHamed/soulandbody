"use client";
import React from "react";
import { useProducts, type Product } from "./hooks/useProducts";
import ReusableTable from "@/components/ReusableTable";
import type { ColumnDef } from "@tanstack/react-table";
import CustomInput from "@/components/customInput";
import { Button } from "@/components/ui/button";
import CustomPopUp from "@/components/popups";
import OtherBranches from "./components/OtherBranches";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import { useTranslations } from "next-intl";

export default function ProductsPage() {
	const t = useTranslations("products");
	const { data: productsData, isLoading: ProductDataLoading } = useProducts();

	const columns: ColumnDef<Product>[] = [
		{
			accessorKey: "productCode",
			header: t("columns.productCode"),
		},
		{
			accessorKey: "productName",
			header: t("columns.productName"),
		},
		{
			accessorKey: "productDescription",
			header: t("columns.productDescription"),
		},
		{
			accessorKey: "unit",
			header: t("columns.unit"),
		},
		{
			accessorKey: "price",
			header: t("columns.price"),
		},
		{
			accessorKey: "quantity",
			header: t("columns.quantity"),
		},
		{
			accessorKey: "category",
			header: t("columns.category"),
		},
		{
			accessorKey: "inStock",
			header: t("columns.inStock"),
		},
		{
			header: t("columns.otherBranches"),
			cell: ({ row: { original } }) => {
				return (
					<CustomPopUp
						DialogTriggerComponent={() => (
							<Button
								variant={"outline"}
								className="p-1 border-[#16C47F] text-[#16C47F] w-[84px h-[32px] text-center hover:opacity-70 hover:text-[#16C47F]"
							>
								{t("buttons.otherBranches")}
							</Button>
						)}
						DialogContentComponent={() => <OtherBranches />}
					/>
				);
			},
		},
	];

	return (
		<ReusableManyTable
			dataSets={[
				{
					columns,
					data: productsData || [],
					withFilter: false,
					UserComponent: () => {
						return (
							<div className="p-6 flex flex-col gap-6">
								<h1 className="text-[26px] font-bold">{t("title")}</h1>
								<CustomInput
									wrapperClassName="md:w-[395px]"
									className="md:min-w-[395px] h-[40px]"
									placeholder={t("search")}
								/>
							</div>
						);
					},
					loading: ProductDataLoading,
				},
			]}
		/>
	);
}
