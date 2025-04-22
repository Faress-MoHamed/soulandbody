"use client";

import { useQuery } from "@tanstack/react-query";

export type AmountDueType = {
	name: string; // اسم المورد
	phone: string; // الهاتف
	address: string; // العنوان
	invoiceNumber: string; // رقم الفاتورة
	amountDue: number; // المبلغ المستحق
};

const AmountDuesData: AmountDueType[] = Array.from({ length: 15 }, () => ({
	name: "أحمد ابراهيم",
	phone: "0101015115",
	address: "شارع الشارع",
	invoiceNumber: "undefined",
	amountDue: 5000,
}));

export function useAmountDuesData() {
	return useQuery({
		queryKey: ["AmountDues"],
		queryFn: async () => {
			// Simulate network delay
			// await new Promise((res) => setTimeout(res, 300));
			return AmountDuesData;
		},
	});
}
