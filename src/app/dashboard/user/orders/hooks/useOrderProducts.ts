"use client";

import { AxiosInstance } from "@/lib/AxiosConfig";
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



export function useProductsWithCategory(cat?:string) {
	console.log(cat)
	return useQuery({
		queryKey: ["ProductsWithCategory",cat],
		queryFn:  async() => {
			const {data}=await AxiosInstance.get(`category/${cat}/products`);
			return data
		},
		enabled:!!cat
	});
}
export function useCategory() {
	return useQuery({
		queryKey: ["categoris"],
		queryFn:  async() => {
			const {data}=await AxiosInstance.get(`categories`);
			return data
		},
	});
}
export function useMeasureUnits() {
	return useQuery({
		queryKey: ["units"],
		queryFn:  async() => {
			const {data}=await AxiosInstance.get(`measure-units`);
			return data
		},
	});
}
