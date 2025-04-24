"use client";

import { useQuery } from "@tanstack/react-query";

export type Ledger = {
	date: string;
	accountName: string;
	debit1: number;
	credit1: number;
	debit2: number;
	credit2: number;
};

const generateLedgers = (count: number): Ledger[] => {
	return Array.from({ length: count }, () => ({
		date: "17/10/2025",
		accountName: "اصول",
		debit1: 2000,
		credit1: 2000,
		debit2: 4000,
		credit2: 6000,
	}));
};

const allLedgers = generateLedgers(100);

export function useLedgers() {
	return useQuery({
		queryKey: ["Ledgers"],
		queryFn: async () => {
			// In a real application, you would fetch from an API:
			// const { data } = await axios.get("/api/user-transactions");
			return allLedgers;
		},
	});
}

