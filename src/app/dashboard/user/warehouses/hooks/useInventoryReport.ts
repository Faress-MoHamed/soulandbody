"use client";

import { useQuery } from "@tanstack/react-query";

export type InventoryItemType = {
	itemCode: string; // كود الصنف
	itemName: string; // اسم الصنف
	actualQuantity: number; // الكمية الفعلية
	systemQuantity: number; // كمية السيستم
	difference: number; // الفرق
};

const InventoryData: InventoryItemType[] = Array.from({ length: 50 }, () => ({
	itemCode: "15",
	itemName: "لاب توب",
	actualQuantity: 1,
	systemQuantity: 425,
	difference: 25,
}));

export function useInventoryReports() {
	return useQuery({
		queryKey: ["InventoryData"],
		queryFn: async () => {
			// Simulate network delay
			// await new Promise((res) => setTimeout(res, 300));
			return InventoryData;
		},
	});
}
