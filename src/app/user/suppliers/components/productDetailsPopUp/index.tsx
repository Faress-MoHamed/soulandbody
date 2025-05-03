import React from "react";
import {
	useProductDetails,
	type ProductDetailType,
} from "../../hooks/useProductDetails";
import type { ColumnDef } from "@tanstack/react-table";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
export default function ShowOffers() {
	const { data: ProductDetailsData, isLoading: ProductDetailsLoading } =
		useProductDetails();
	const productDetailsColumns: ColumnDef<ProductDetailType>[] = [
		{ header: "كود المنتج", accessorKey: "productCode" },
		{ header: "اسم المنتج", accessorKey: "productName" },
		{ header: "فئة المنتج", accessorKey: "category" },
		{ header: "الكمية", accessorKey: "quantity" },
		{ header: "وحده البيع", accessorKey: "unitPrice" },
		{ header: "ضريبة", accessorKey: "tax" },
		{ header: "خصم", accessorKey: "discount" },
		{ header: "الوصف", accessorKey: "description" },
		{ header: "الإجمالي", accessorKey: "total" },
	];
	return (
		<Card className="flex flex-col px-6 py-9 pt-0 gap-6  w-[100%] h-fit">
			<CardHeader className="flex flex-row items-center justify-between p-0">
				<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
				عرض الأسعار
				</CardTitle>
			</CardHeader>
			<CardContent className="w-full">
				<ReusableManyTable
					dataSets={[
						{
							columns: productDetailsColumns,
							data: ProductDetailsData || [],
              loading: ProductDetailsLoading,
              withFilter: false,
              
						},
          ]}
          withTopPrinter={false}
				/>
			</CardContent>
		</Card>
	);
}
