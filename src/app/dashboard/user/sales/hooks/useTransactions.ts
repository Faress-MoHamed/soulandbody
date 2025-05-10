"use client";
import { useQuery } from "@tanstack/react-query";

export type TransactionType = {
	invoiceNumber: string;
	clientCode: string;
	date: string;
	account: string;
	debtor: string;
	creditor: string;
	balance: string;
};

const formatDateToYMD = (date: Date) => {
	return date.toISOString().split("T")[0];
};

export function generateTransactions(count: number = 20): TransactionType[] {
	return Array.from({ length: count }, (_, i) => {
		const debtor = Math.floor(Math.random() * 5000 + 1000);
		const creditor = Math.floor(Math.random() * 2000);
		const balance = debtor - creditor;

		return {
			invoiceNumber: `INV-${1000 + i}`,
			clientCode: `CL-${2000 + i}`,
			date: formatDateToYMD(
				new Date(
					2025,
					Math.floor(Math.random() * 12),
					Math.floor(Math.random() * 28 + 1)
				)
			),
			account: ["الصندوق", "البنك", "العملاء", "الموردين", "المبيعات"][i % 5],
			debtor: debtor.toString(),
			creditor: creditor.toString(),
			balance: balance.toString(),
		};
	});
}

const transactionsData = generateTransactions(50);

export function useTransactions() {
	return useQuery({
		queryKey: ["transactions"],
		queryFn: async () => {
			// In a real application, you would fetch from an API:
			// const { data } = await axios.get("/api/transactions");
			return transactionsData;
		},
	});
}

// Column definitions for React Table
export const transactionColumns = [
	{
		accessorKey: "invoiceNumber",
		header: "رقم الفاتورة",
	},
	{
		accessorKey: "clientCode",
		header: "كود العميل",
	},
	{
		accessorKey: "date",
		header: "تاريخ",
	},
	{
		accessorKey: "account",
		header: "الحساب",
	},
	{
		accessorKey: "debtor",
		header: "مدين",
	},
	{
		accessorKey: "creditor",
		header: "دائن",
	},
	{
		accessorKey: "balance",
		header: "رصيد",
	},
];
