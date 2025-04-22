"use client";

import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

export type DownPaymentType = {
	name: string; // اسم المورد
	phone: string; // الهاتف
	address: string; // العنوان
	paymentDocument: string; // سند القبض
	advanceAmount: number; // المبلغ (تحت الحساب)
};

const DownPaymentsData: DownPaymentType[] = Array.from({ length: 15 }, () => ({
	name: "أحمد ابراهيم",
	phone: "0101015115",
	address: "شارع الشارع",
	paymentDocument: "undefined",
	advanceAmount: 5000,
}));

export function useDownPayments() {
	return useQuery({
		queryKey: ["DownPayments"],
		queryFn: async () => {
			// Simulate network delay
			// await new Promise((res) => setTimeout(res, 300));
			return DownPaymentsData;
		},
	});
}


