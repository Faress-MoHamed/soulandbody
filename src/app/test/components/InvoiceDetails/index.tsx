"use client";

import { useInvoices } from "@/app/dashboard/user/suppliers/hooks/useInvoices";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { ColumnDef } from "@tanstack/react-table";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import FinalInvoicesTable from "@/app/dashboard/companies/SalesInvoices/components/FinalInvoicesTable";
import CategoryTable from "@/app/dashboard/user/sales/components/CategoryTable";
import TaxOnProduct from "@/app/dashboard/companies/SalesInvoices/components/TaxOnProduct";
import CustomPopUp from "@/components/popups";

export default function InvoiceDetails(props: any) {
  const invoiceId = props?.invoiceId ?? null;
  const { data, isLoading, isError } = useInvoices();
  const { t } = useTypedTranslation();

  if (isLoading) {
    return <div>جاري التحميل...</div>;
  }

  if (isError || !data) {
    return <div>حدث خطأ أثناء جلب البيانات. يرجى المحاولة مرة أخرى.</div>;
  }

  // ✅ تعديل هنا لعرض المنتجات داخل الجدول
  const dataToDisplay = data ?? [];

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "product_code",
      header: "كود المنتج",
    },
    {
      accessorKey: "product_name",
      header: "اسم المنتج",
    },
    {
      accessorKey: "qty",
      header: "الكمية",
    },
    {
      accessorKey: "sale_price",
      header: "سعر البيع",
    },
    {
      accessorKey: "measure_unit",
      header: "الوحدة",
    },
    {
      accessorKey: "total_price",
      header: "الإجمالي",
    },
    {
      accessorKey: "tax",
      header: t("sales.salesInvoices.columns.tax"),
      cell: ({ row }) =>
        row.original.tax === t("sales.salesInvoices.columns.addTax") ? (
          <CustomPopUp
            DialogTriggerComponent={() => (
              <span
                style={{
                  color: "green",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                عرض الضريبه
              </span>
            )}
            DialogContentComponent={() => <TaxOnProduct />}
          />
        ) : (
          <span>{row.original.tax}</span>
        ),
    },
  ];

  return (
    <div className="p-4">
      <ReusableManyTable
        dataSets={[
          {
            data: dataToDisplay,
            columns,
            FooterComponent: () => <FinalInvoicesTable withActions={false} />,
            onCellClick: (cell) => {
              if (cell?.column?.id !== "category") return null;
              return <CategoryTable data={dataToDisplay}/>;
            },
            withFilter: false,
            containerClassName: "p-5",
          },
        ]}
        withTopPrinter={false}
      />

      {/* عرض الإجماليات تحت الجدول */}
      <div className="mt-6 p-4 border rounded bg-gray-50 shadow-sm">
        <p>إجمالي الفاتورة: <strong></strong> جنيه</p>
        <p>إجمالي الخصم: <strong></strong> جنيه</p>
      </div>
    </div>
  );
}
