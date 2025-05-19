"use client";

import { AxiosInstance } from "@/lib/AxiosConfig";
import { useQuery } from "@tanstack/react-query";

export type InventoryItemType = {
	itemCode: string;         // from product_code
	itemName: string;         // from product_name
	actualQuantity: number;   // from actual_quantity
	systemQuantity: number;   // from store_quantity
	difference: number;       // from difference
  }
  ;

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
			const {data} = await AxiosInstance.get("inventory-reports")
			// await new Promise((res) => setTimeout(res, 300));
			return data;
		},
	});
}
