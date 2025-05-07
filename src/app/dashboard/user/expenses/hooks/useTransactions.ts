"use client";

import { useQuery } from "@tanstack/react-query";

export type Transaction = {
	date: string;
	transactionId: string;
	description: string;
	debit: string;
	credit: string;
	balance: string;
};

const generateTransactions = (count: number): Transaction[] => {
	return Array.from({ length: count }, () => ({
		date: "17/10/2025",
		transactionId: "45",
		description: "الأهلي",
		debit: "1254",
		credit: "125487",
		balance: "14541",
	}));
};

const allTransactions = generateTransactions(30);

export function useTransactions() {
	return useQuery({
		queryKey: ["Transactions"],
		queryFn: async () => {
			// const { data } = await axios.get("/api/transactions");
			return allTransactions;
		},
	});
}
