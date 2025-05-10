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

export default function ShowSupplierOffers({ id }: { id: string }) {
  const { data: ProductDetailsData, isLoading: ProductDetailsLoading } =
    useProductDetails(id);

  // Here we map the quotations data to the required format for the table
  const quotationsData = [
    {
      supplier_name: "supplier1qq",
      quotation_no: "Qn89416",
      items: [
        {
          product_code: "P002",
          product_name: "Product B",
          product_category: "كرتونة",
          qty: "12.00",
          unit_price: "100.00",
          tax: "1.00",
          discount: "5.00",
          total_amount: "1151.40",
        },
        {
          product_code: "P0011",
          product_name: "Product Cc",
          product_category: "صندوق",
          qty: "13.00",
          unit_price: "200.00",
          tax: "2.00",
          discount: "7.00",
          total_amount: "2466.36",
        },
        {
          product_code: "P005",
          product_name: "Product D",
          product_category: "قطعة",
          qty: "15.00",
          unit_price: "300.00",
          tax: "3.00",
          discount: "9.00",
          total_amount: "4217.85",
        },
      ],
    },
    {
      supplier_name: "jlk",
      quotation_no: "Qn36685",
      items: [
        {
          product_code: "P002",
          product_name: "Product B",
          product_category: "كرتونة",
          qty: "12.00",
          unit_price: "100.00",
          tax: "1.00",
          discount: "5.00",
          total_amount: "1151.40",
        },
        {
          product_code: "P0011",
          product_name: "Product Cc",
          product_category: "صندوق",
          qty: "13.00",
          unit_price: "200.00",
          tax: "2.00",
          discount: "7.00",
          total_amount: "2466.36",
        },
      ],
    },
  ];

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
        <ReusableManyTable
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
        />
      </CardContent>
      <CardFooter className="flex justify-end">
        اجمالي الطلبية : {tableData?.reduce((acc: number, item: { total: string; }) => acc + parseFloat(item.total), 0).toFixed(2)}
      </CardFooter>
    </Card>
  );
}
