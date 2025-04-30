"use client";

import { useQuery } from "@tanstack/react-query";

// Types for each table
export type ProductType = {
	code: string;
	name: string;
	date: string;
	operations?: {
		edit: boolean;
		delete: boolean;
	};
};

export type ProductDetailsType = {
	code: string;
	productName: string;
	category: string;
	unitPrice: number;
	quantity: number;
	operations?: {
		edit: boolean;
		delete: boolean;
	};
};

export type OrderType = {
	orderNumber: string;
	date: string;
	ordersCount: number;
	operations?: {
		edit: boolean;
		delete: boolean;
	};
};

// Consolidated type for all tables
export type ConsolidatedDataType = {
	products: ProductType[];
	productDetails: ProductDetailsType[];
	orders: OrderType[];
};

// Mock data based on the images
const generateMockProducts = (): ProductType[] => {
	return Array.from({ length: 100 }, (_, i) => ({
		code: "125",
		name: "أحمد إسماعيل",
		date: "24/12/2026",
		operations: {
			edit: true,
			delete: true,
		},
	}));
};

const generateMockProductDetails = (): ProductDetailsType[] => {
	return Array.from({ length: 100 }, (_, i) => ({
		code: "125",
		productName: "لاب توب",
		category: "432",
		unitPrice: 50,
		quantity: 451,
		operations: {
			edit: true,
			delete: true,
		},
	}));
};

const generateMockOrders = (): OrderType[] => {
	return Array.from({ length: 100 }, (_, i) => ({
		orderNumber: "125",
		date: "15/5/2014",
		ordersCount: 124,
		operations: {
			edit: true,
			delete: true,
		},
	}));
};

// Custom hook to retrieve all data from all tables
export function useInventoryData() {
	return useQuery({
		queryKey: ["inventory-consolidated-data"],
		queryFn: async () => {
			// Simulate API delay
			// await new Promise((resolve) => setTimeout(resolve, 500));

			const consolidatedData: ConsolidatedDataType = {
				products: generateMockProducts(),
				productDetails: generateMockProductDetails(),
				orders: generateMockOrders(),
			};

			return consolidatedData;
		},
	});
}

// Specialized hooks for each data type
export function useProducts() {
	const { data, isLoading, error } = useInventoryData();
	return {
		products: data?.products || [],
		isLoading,
		error,
	};
}

export function useProductDetails() {
	const { data, isLoading, error } = useInventoryData();
	return {
		productDetails: data?.productDetails || [],
		isLoading,
		error,
	};
}

export function useOrders() {
	const { data, isLoading, error } = useInventoryData();
	return {
		orders: data?.orders || [],
		isLoading,
		error,
	};
}
