import React from "react";
import { QuotationTypee } from "../../hooks/useSuppliers";
import type { ColumnDef } from "@tanstack/react-table";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuotationDetails } from "../../hooks/useQuotations";

export default function ShowOffers(props: any) {
  const QuotaionId = props?.QuotaionId;
  console.log("sss", QuotaionId);
  const { data, isLoading, isError } = useQuotationDetails(QuotaionId);

  // التأكد من وجود البيانات قبل استخدامه
  const total = data?.total_amount_sum || 0; // إجمالي الطلبية

  const transformedData = data?.items.map((item: any) => ({
    productCode: item.product_code,
    productName: item.product_name,
    category: item.product_category || "غير محدد", // تعديل الفئة حسب الحاجة
    quantity: item.available_qty || 0, // التأكد من الكمية المتاحة
    unitPrice: parseFloat(item.unit_price),
    tax: `${item.tax}%`,
    discount: `${item.discount}%`,
    description: item.description || "لا يوجد وصف", // إضافة القيمة الافتراضية
    total: parseFloat(item.total_amount),
  })) || [];

  const productDetailsColumns: ColumnDef<QuotationTypee>[] = [
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
    <Card className="flex flex-col px-6 py-9 pt-0 gap-6 w-[100%] h-fit">
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
        اجمالي الطلبية : {total}
      </CardFooter>
    </Card>
  );
}
