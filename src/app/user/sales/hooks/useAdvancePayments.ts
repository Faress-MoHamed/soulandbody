"use client";

import { useQuery } from "@tanstack/react-query";

export type AdvancePaymentType = {
	name: string;
	phone: string;
	address: string;
	receiptNumber: string;
	amount: number;
};

const advancePaymentData: AdvancePaymentType[] = Array.from(
	{ length: 100 },
	(_, i) => ({
		name: "أحمد ابراهيم",
		phone: "0101011515",
		address: "تيستتيستتيست",
		receiptNumber: `RCPT-${i + 1}` || "undefined",
		amount: 5000,
	})
);

export function useAdvancePayments() {
	return useQuery({
		queryKey: ["advancePayments"],
		queryFn: async () => {
			// Simulate delay
			await new Promise((res) => setTimeout(res, 300));
			return advancePaymentData;
		},
	});
}
