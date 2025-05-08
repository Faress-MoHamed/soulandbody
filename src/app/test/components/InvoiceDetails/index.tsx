"use client";

import { useInvoiceDetails  } from "@/app/dashboard/user/suppliers/hooks/useInvoices";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { ColumnDef } from "@tanstack/react-table";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import FinalInvoicesTable from "@/app/dashboard/companies/SalesInvoices/components/FinalInvoicesTable";
import CategoryTable from "@/app/dashboard/user/sales/components/CategoryTable";

export default function InvoiceDetails(props: any) {
  const invoiceId = props?.invoiceId ?? null;
  const { data, isLoading, isError } = useInvoiceDetails(invoiceId);
  const { t } = useTypedTranslation();
  console.log("data", data);

  if (isLoading) {
    return <div>جاري التحميل...</div>;
  }

  if (isError || !data) {
    return <div>حدث خطأ أثناء جلب البيانات. يرجى المحاولة مرة أخرى.</div>;
  }

  const dataToDisplay = data?.items ?? [];

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "product_code",
      header: "الكود",
    },
    {
      accessorKey: "product_name",
      header: "اسم الصنف",
    },
    {
      accessorKey: "category_name",
      header: "فئة الصنف",
    },
    {
      accessorKey: "qty",
      header: "الكمية",
    },
    {
      accessorKey: "sale_price",
      header: "سعر الشراء",
    },
    {
      accessorKey: "total",
      header: "الإجمالي",
    },
    {
      accessorKey: "discount",
      header: "الخصم",
    },
    {
      accessorKey: "tax",
      header: t("sales.salesInvoices.columns.tax"),
    },
    {
      accessorKey: "total_price",
      header: "إجمالي الشراء",
    },
  ];

  return (
    <div className="p-4">
      <ReusableManyTable
        dataSets={[
          {
            data: dataToDisplay,
            columns,
            FooterComponent: () => (
              <FinalInvoicesTable
                withActions={false}
                data={[
                  {
                    totalInvoice: data.total_amount ?? "0",
                    totalDiscount: data.total_discount ?? "0",
                    totalVAT: data.income_tax ?? "0",
                    totalTableTax: data.sales_tax ?? "0",
                    totalDiscountAndAdditionTax: "0", // لو مش موجود في الداتا، خليه صفر أو احذفه
                    netInvoice: data.net_invoice?.toString() ?? "0",
                    paymentMethod: "نقدي",
                  },
                ]}
              />
            ),
            onCellClick: (cell) => {
              if (cell?.column?.id !== "category") return null;
              return <CategoryTable data={dataToDisplay} />;
            },
            withFilter: false,
            containerClassName: "p-5",
          },
        ]}
        withTopPrinter={false}
      />
    </div>
  );
}


