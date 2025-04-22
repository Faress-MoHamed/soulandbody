"use client";
import { useQuery } from "@tanstack/react-query";

export type InvoiceType = {
	invoiceNumber: string;
	date: string;
	statement: string;
	amount: number;
	vatAmount: number;
	profit: string;
	total: string;
	status: string;
};

// Sample data based on the image
export function generateElectronicInvoices(count: number = 10): InvoiceType[] {
	return Array.from({ length: count }, () => {
		return {
			invoiceNumber: "1",
			date: "12/12/2025",
			statement: "142568588",
			amount: 4524,
			vatAmount: 20,
			profit: "15%",
			total: "142568588",
			status: "تم الرد",
		};
	});
}

const ElectronicinvoicesData = generateElectronicInvoices();

export function useElectronicInvoices() {
	return useQuery({
		queryKey: ["Electronicinvoices"],
		queryFn: async () => {
			// In a real application, you would fetch from an API:
			// const { data } = await axios.get("/api/Electronicinvoices");
			return ElectronicinvoicesData;
		},
	});
}

// Column definitions for React Table - matching the Arabic headers from the image
export const invoiceColumns = [
	{
		accessorKey: "invoiceNumber",
		header: "رقم الفاتورة",
	},
	{
		accessorKey: "date",
		header: "تاريخ",
	},
	{
		accessorKey: "statement",
		header: "بيان",
	},
	{
		accessorKey: "amount",
		header: "المبلغ",
	},
	{
		accessorKey: "vatAmount",
		header: "ضريبة القيمة المضافة",
	},
	{
		accessorKey: "profit",
		header: "أرباح سنوية",
	},
	{
		accessorKey: "total",
		header: "المجموع",
	},
	{
		accessorKey: "status",
		header: "حالةالرد",
	},
];
