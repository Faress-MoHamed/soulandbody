"use client";

import { AxiosInstance } from "@/lib/AxiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type InventoryProductsType = {
	productCode: string; // كود المنتج
	productName: string; // اسم المنتج
	category: string; // فئة المنتج
	unit: string; // الوحدة
	date: string; // التاريخ
	purchasePrice: number; // سعر الشراء
	sellingPrice: number; // سعر البيع
	mainSupplier: string; // المورد الرئيسي
	minLimit: number; // الحد الأدنى
	maxLimit: number; // الحد الأقصى
};


export function useInventoryProductsData() {
	return useQuery({
		queryKey: ["InventoryProductsData"],
		queryFn: async () => {
			// Simulate delay
			const {data} = await AxiosInstance.get("product-stores");
			return data;
		},
	});
}
export function useDeleteInventoryProductsData() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["InventoryProductsData"],
		mutationFn: async (id: number) => {
			const { data } = await AxiosInstance.delete(`product-stores/${id}`);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["InventoryProductsData"] });
		},
	});
}
