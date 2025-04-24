"use client";

import { useQuery } from "@tanstack/react-query";

export type BankTransaction = {
	date: string;
	transactionNumber: string;
	bankName: string;
	description: string;
	debit: number;
	credit: number;
	balance: number;
};

const generateAccountStatement = (count: number): BankTransaction[] => {
	return Array.from({ length: count }, () => ({
		date: "17/02/2025",
		transactionNumber: "1452",
		bankName: "الأهلي",
		description: "شيكات واردة(ذى جاري)",
		debit: 45874,
		credit: 56878,
		balance: 400.25,
	}));
};

const allBank = generateAccountStatement(100);

export function useAccountStatement() {
	return useQuery({
		queryKey: ["bank"],
		queryFn: async () => {
			// In a real application, you would fetch from an API:
			// const { data } = await axios.get("/api/bank-");
			return allBank;
		},
	});
}

// Column definitions for React Table
export const bankTransactionColumns = [
	{
		accessorKey: "date",
		header: "تاريخ",
	},
	{
		accessorKey: "transactionNumber",
		header: "رقم العملية",
	},
	{
		accessorKey: "bankName",
		header: "اسم البنك",
	},
	{
		accessorKey: "description",
		header: "بيان",
	},
	{
		accessorKey: "debit",
		header: "مدين",
	},
	{
		accessorKey: "credit",
		header: "دائن",
	},
	{
		accessorKey: "balance",
		header: "رصيد",
	},
];
