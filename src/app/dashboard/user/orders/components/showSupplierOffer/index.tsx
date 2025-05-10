import React from "react";
import {
  useProductDetails,
//   type ProductDetailType,
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
import LoadingIndicator from "@/components/loadingIndicator";

export default function ShowSupplierOffers({ id }: { id: string }) {
  const { data: ProductDetailsData, isLoading: ProductDetailsLoading } =
    useProductDetails(id);



  // Flatten the data so each item includes supplier info and quotation no
  const tableData = ProductDetailsData?.quotations?.flatMap((quotation: { items: any[]; supplier_name: any; quotation_no: any; }) =>
    quotation?.items?.map((item: { product_code: any; product_name: any; product_category: any; qty: any; unit_price: any; tax: any; discount: any; total_amount: any; }) => ({
      productCode: item.product_code,
      productName: item.product_name,
      category: item.product_category,
      quantity: item.qty,
      unitPrice: item.unit_price,
      tax: item.tax,
      discount: item.discount,
      description: "", // Assuming no description field, can be adjusted
      total: item.total_amount,
      supplier: quotation.supplier_name,
      quotationNo: quotation.quotation_no,
    }))
  );

  console.log(tableData,ProductDetailsData)

  const productDetailsColumns: ColumnDef<any>[] = [
    { header: "كود المنتج", accessorKey: "productCode" },
    { header: "اسم المنتج", accessorKey: "productName" },
    { header: "فئة المنتج", accessorKey: "category" },
    { header: "الكمية", accessorKey: "quantity" },
    { header: "سعر بيع الوحده", accessorKey: "unitPrice" },
    { header: "ضريبة", accessorKey: "tax" },
    { header: "خصم", accessorKey: "discount" },
    { header: "الوصف", accessorKey: "description" },
    { header: "الإجمالي", accessorKey: "total" },
    { header: "المورد", accessorKey: "supplier" },
  ];

  return (
    <Card className="flex flex-col px-6 py-9 pt-0 gap-6 ">
      <CardHeader className="flex flex-row items-center justify-between p-0">
        <CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
          عرض الأسعار
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full max-h-[450px] overflow-y-auto">
        
        {ProductDetailsLoading?<LoadingIndicator/>:<ReusableManyTable
          dataSets={[
            {
              columns: productDetailsColumns,
              data: tableData||[],
              loading: ProductDetailsLoading,
              withFilter: false,
              withPagination: false,
            },
          ]}
          withTopPrinter={false}
        />}
      </CardContent>
      <CardFooter className="flex justify-end">
        اجمالي الطلبية : {tableData?.reduce((acc: number, item: { total: string; }) => acc + parseFloat(item.total), 0).toFixed(2)}
      </CardFooter>
    </Card>
  );
}
