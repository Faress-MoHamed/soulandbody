"use client";

import { useQuery } from "@tanstack/react-query";

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

const ProductData: InventoryProductsType[] = Array.from({ length: 10 }, () => ({
	productCode: "1",
	productName: "لاب توب",
	category: "الكترونيات",
	unit: "كرتونة",
	date: "12/10/2024",
	purchasePrice: 3000,
	sellingPrice: 4000,
	mainSupplier: "أحمد سعد",
	minLimit: 12,
	maxLimit: 20,
}));

export function useInventoryProductsData() {
	return useQuery({
		queryKey: ["InventoryProductsData"],
		queryFn: async () => {
			// Simulate delay
			// await new Promise((res) => setTimeout(res, 300));
			return ProductData;
		},
	});
}
