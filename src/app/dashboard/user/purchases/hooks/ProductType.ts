"use client";

import { useQuery } from "@tanstack/react-query";

export type ProductType = {
	code: string;
	name: string;
	description: string;
	purchasePrice: number;
	salePrice: number;
};

const productsData: ProductType[] = Array.from({ length: 100 }, () => ({
	code: "125",
	name: "لاب توب",
	description: "لاب توب كور 7",
	purchasePrice: 124548,
	salePrice: 124548,
}));

export function useProductsTypes() {
	return useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			// Simulate network delay
			// await new Promise((res) => setTimeout(res, 300));
			return productsData;
		},
	});
}
