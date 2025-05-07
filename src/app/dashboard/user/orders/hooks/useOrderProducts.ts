"use client";

import { useQuery } from "@tanstack/react-query";

export type OrderProductType = {
	code: string;
	name: string;
	quantity: number;
	unitPrice: number;
	total: number;
	supplier: string;
};

const generateRandomProduct = (index: number): OrderProductType => {
	const quantity = 30 + Math.floor(Math.random() * 5); // vary quantity
	const unitPrice = 1400 + Math.floor(Math.random() * 200); // vary price
	return {
		code: `4512-${index}`,
		name: "لاب توب",
		quantity,
		unitPrice,
		total: quantity * unitPrice,
		supplier: "أحمد سعيد",
	};
};

const orderProductsData: OrderProductType[] = Array.from(
	{ length: 100 },
	(_, i) => generateRandomProduct(i + 1)
);

export function useOrderProducts() {
	return useQuery({
		queryKey: ["order-products"],
		queryFn: async () => {
			// Simulate network delay
			// await new Promise((res) => setTimeout(res, 300));
			return orderProductsData;
		},
	});
}
