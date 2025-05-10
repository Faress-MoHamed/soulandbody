import React from "react";
import CustomPopUp from "../popups";
import type { ColumnDef } from "@tanstack/react-table";
import type { EmployeesInvoicesType } from "@/app/dashboard/companies/Employees/hooks/useInvoicesEmployees";
import {
	useSalesInvoices,
	type SalesInvoice,
} from "@/app/dashboard/companies/SalesInvoices/hooks/useSalesInvoices";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import TaxOnProduct from "@/app/dashboard/companies/SalesInvoices/components/TaxOnProduct";
import ReusableManyTable from "../ReusableTableWithManyData";
import FinalInvoicesTable from "@/app/dashboard/companies/SalesInvoices/components/FinalInvoicesTable";
import CategoryTable from "@/app/dashboard/user/sales/components/CategoryTable";

export default function InvoicesTable(props: any) {
	const invoice = props?.invoice
	const { t } = useTypedTranslation();
	const { data: allData, isLoading: InvoiceBuyingLoading } = useSalesInvoices();
	const columns: ColumnDef<SalesInvoice>[] = [
		{
			accessorKey: "code",
			header: t("sales.salesInvoices.columns.code"),
		},
		{
			accessorKey: "itemName",
			header: t("sales.salesInvoices.columns.itemName"),
		},
		{
			accessorKey: "category",
			header: t("sales.salesInvoices.columns.category"),
		},
		{
			accessorKey: "quantity",
			header: t("sales.salesInvoices.columns.quantity"),
		},
		{
			accessorKey: "saleUnit",
			header: t("sales.salesInvoices.columns.saleUnit"),
			cell: (props) => {
				return <>كرتونه</>;
			},
		},
		{
			accessorKey: "total",
			header: t("sales.salesInvoices.columns.total"),
		},
		{
			accessorKey: "discount",
			header: t("sales.salesInvoices.columns.discount"),
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
		{
			accessorKey: "totalSale",
			header: t("sales.salesInvoices.columns.totalSale"),
		},
	];
	return (
		<div className="p-4">
			<ReusableManyTable
				dataSets={[
					{
						data: allData || [],
						columns,
						FooterComponent: () => <FinalInvoicesTable withActions={false} />,
						onCellClick: (cell) => {
							console.log(cell);
							if (cell?.column?.id !== "category") return null;
							return <CategoryTable />;
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
