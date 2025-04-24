"use client";

import { useQuery } from "@tanstack/react-query";

export type PurchasesInvoicesType = {
	invoiceNumber: number;
	date: string;
	account: string;
	debtor: string;
	creditor: string;
	balance: number;
};

const invoiceData: PurchasesInvoicesType[] = Array.from(
	{ length: 100 },
	() => ({
		invoiceNumber: 1,
		date: "12/12/2025",
		account: "142568588",
		debtor: "أحمد ابراهيم",
		creditor: "محمد ابراهيم",
		balance: 1525245,
	})
);

export function usePurchasesInvoices() {
	return useQuery({
		queryKey: ["PurchasesInvoices"],
		queryFn: async () => {
			// await new Promise((res) => setTimeout(res, 300));
			return invoiceData;
		},
	});
}
