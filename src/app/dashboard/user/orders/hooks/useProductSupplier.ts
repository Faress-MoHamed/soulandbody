import { useQuery } from "@tanstack/react-query";

export type ProductType = {
	code: string;
	name: string;
	quantity: string;
	unit: string;
	price: string;
	available: boolean;
};

const generateProducts = () => {
	// Base product from the image
	const baseProduct = {
		name: "لاب توب",
		quantity: "452",
		unit: "50",
		price: "451",
	};

	return Array.from({ length: 100 }, (_, i) => ({
		code: `PRD-${String(i + 1).padStart(3, "0")}`,
		name: baseProduct.name,
		quantity: baseProduct.quantity,
		unit: baseProduct.unit,
		price: baseProduct.price,
		// 70% chance of being available
		available: Math.random() < 0.7,
	}));
};

const data = generateProducts();

export function useProducts() {
	return useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			// Simulate network delay (optional)
			await new Promise((res) => setTimeout(res, 300));
			return data;
		},
	});
}
