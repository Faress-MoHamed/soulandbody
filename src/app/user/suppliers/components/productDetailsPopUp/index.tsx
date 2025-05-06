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
export default function ShowOffers(props : any) {
	const rawData = props.quotations || [];
	const transformedData = rawData.map((item: any) => ({
		productCode: item.product_code,
		productName: item.product_name,
		category: `الفئة ${item.product_cat} (${item.measure_unit_name})`,
		quantity: item.qty,
		unitPrice: parseFloat(item.unit_price),
		tax: `${item.tax}%`,
		discount: `${item.discount}%`,
		description: item.description,
		total: parseFloat(item.total_amount),
	  }));
	  
	const productDetailsColumns: ColumnDef<ProductDetailType>[] = [
		{ header: "كود المنتج", accessorKey: "productCode" },
		{ header: "اسم المنتج", accessorKey: "productName" },
		{ header: "فئة المنتج", accessorKey: "category" },
		{ header: "الكمية", accessorKey: "quantity" },
		{ header: "سعر بيع الوحده", accessorKey: "unitPrice" },
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
			<CardContent className="w-full max-h-[450px] overflow-y-auto">
				<ReusableManyTable
					dataSets={[
						{
							columns: productDetailsColumns,
							data: transformedData || [],
							withFilter: false,
							withPagination: false,
						},
					]}
					withTopPrinter={false}
				/>
			</CardContent>
			<CardFooter className="flex justify-end">
				اجمالي الطلبية : 40000
			</CardFooter>
		</Card>
	);
}
