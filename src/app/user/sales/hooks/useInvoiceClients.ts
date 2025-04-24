"use client";

import { useQuery } from "@tanstack/react-query";

export type InvoiceClientType = {
	name: string;
	phone: string;
	address: string;
	invoiceNumber: string;
	amountDue: number;
};

const invoiceClientsData: InvoiceClientType[] = Array.from(
	{ length: 100 },
	(_, i) => ({
		name: "أحمد ابراهيم",
		phone: "0101011515",
		address: "تيستتيستتيست",
		invoiceNumber: `INV-${i + 1}` || "undefined",
		amountDue: 5000,
	})
);

export function useInvoiceClients() {
	return useQuery({
		queryKey: ["invoiceClients"],
		queryFn: async () => {
			// Simulate API delay
			// await new Promise((res) => setTimeout(res, 300));
			return invoiceClientsData;
		},
	});
}
