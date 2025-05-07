"use client";

import { useQuery } from "@tanstack/react-query";

export type InventoryProductType = {
	code: string;
	name: string;
	category: string;
	quantity: number;
};

const categories = ["كرونة", "صندوق", "حزمة"];

const generateRandomProduct = (index: number): InventoryProductType => ({
	code: `125-${index}`,
	name: "لاب توب",
	category: categories[index % categories.length], // rotate categories
	quantity: 50 + (index % 5) * 5, // vary quantity slightly
});

const inventoryProducts: InventoryProductType[] = Array.from(
	{ length: 10 },
	(_, i) => generateRandomProduct(i + 1)
);

export function useInventoryProducts() {
	return useQuery({
		queryKey: ["inventory-products"],
		queryFn: async () => {
			// Simulate delay if needed
			// await new Promise((res) => setTimeout(res, 300));
			return inventoryProducts;
		},
	});
}
