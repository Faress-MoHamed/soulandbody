"use client";

import { useQuery } from "@tanstack/react-query";

export type ProductDetailType = {
	productCode: string;
	productName: string;
	category: string;
	quantity: number;
	unitPrice: number;
	tax: string;
	discount: string;
	description: string;
	total: number;
};

const productData: ProductDetailType[] = Array.from({ length: 12 }, () => ({
	productCode: "125",
	productName: "لاب توب",
	category: "كرتونة",
	quantity: 12,
	unitPrice: 100,
	tax: "10%",
	discount: "10%",
	description: "4+1",
	total: 1200,
}));

export function useProductDetails() {
	return useQuery({
		queryKey: ["productDetails"],
		queryFn: async () => {
			return productData;
		},
	});
}
