"use client";

import { AxiosInstance } from "@/lib/AxiosConfig";
import { useQuery } from "@tanstack/react-query";

export type InventoryRecordType = {
	inventoryCode: string; // كود الجرد
	date: string; // التاريخ
	storeName: string; // اسم المخزن
};

const InventoryRecordsData: InventoryRecordType[] = Array.from(
	{ length: 60 },
	(_, i) => ({
		inventoryCode: i === 0 ? "451" : "1",
		date: "14/10/2024",
		storeName: "طيبة",
	})
);

export function useInventoryRecords() {
	return useQuery({
		queryKey: ["InventoryRecords"],
		queryFn: async () => {
			// Simulate network delay
			const { data } = await AxiosInstance.get("inventory-reports/inventory_records");
			// await new Promise((res) => setTimeout(res, 300));
			return data;
		},
	});
}
