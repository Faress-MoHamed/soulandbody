"use client";

import { useQuery } from "@tanstack/react-query";

export type ReturnsType = {
	code: string;
	itemName: string;
	quantity: string;
	unit: string;
	saleUnit: string;
	total: string;
	discount: string;
	tax: string;
	totalSale: string;
};

// Function to generate random data
const generateRandomData = (count: number) => {
	const items = [];
	const itemNames = ["لاب توب", "هاتف", "شاشة", "لوحة مفاتيح", "ماوس"];
	const taxOptions = ["إضافة ضريبة", "بدون ضريبة"];

	for (let i = 0; i < count; i++) {
		items.push({
			code: Math.floor(Math.random() * 100).toString(),
			itemName: itemNames[Math.floor(Math.random() * itemNames.length)],
			quantity: (Math.floor(Math.random() * 10) + 1).toString(),
			unit: (Math.floor(Math.random() * 5) + 1).toString(),
			saleUnit: (Math.floor(Math.random() * 1000) + 100).toString(),
			total: (Math.floor(Math.random() * 5000) + 500).toString(),
			discount: Math.floor(Math.random() * 30).toString(),
			tax: "إضافة ضريبة",
			totalSale: (Math.floor(Math.random() * 4000) + 400).toString(),
		});
	}
	return items;
};
const data = generateRandomData(100);

export function useReturns() {
	return useQuery({
		queryKey: ["Returns"],
		queryFn: async () => {
			// In a real application, you would fetch from an API:
			// const { data } = await axios.get("/api/bank-accounts");
			return data;
		},
	});
}
