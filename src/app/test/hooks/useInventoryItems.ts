"use client";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

export type InventoryItemType = {
	id: number;
	fils1: number; // فلس (first column)
	dinar1: number; // دينار (second column)
	weight: number; // الوزن
	quantity: number; // العدد
	packageType: string; // العبوة
	classification: string; // الصنف
	dinar2: number; // دينار (second-to-last column)
	fils2: number; // فلس (last column)
};

// Function to generate inventory items data based on the table in the image
export function generateInventoryItemsData(
	count: number = 5
): InventoryItemType[] {
	const baseData = [
		{
			fils1: 15,
			dinar1: 452,
			weight: 456,
			quantity: 45,
			packageType: "كرتونة",
			classification: "باذنجان كلاسيك",
			dinar2: 12,
			fils2: 15,
		},
		{
			fils1: 15,
			dinar1: 452,
			weight: 254,
			quantity: 65,
			packageType: "كرتونة",
			classification: "باذنجان كلاسيك",
			dinar2: 12,
			fils2: 15,
		},
		{
			fils1: 15,
			dinar1: 452,
			weight: 456,
			quantity: 45,
			packageType: "كرتونة",
			classification: "باذنجان كلاسيك",
			dinar2: 12,
			fils2: 15,
		},
		{
			fils1: 15,
			dinar1: 452,
			weight: 350,
			quantity: 20,
			packageType: "كرتونة",
			classification: "باذنجان كلاسيك",
			dinar2: 35,
			fils2: 15,
		},
		{
			fils1: 15,
			dinar1: 452,
			weight: 254,
			quantity: 65,
			packageType: "كرتونة",
			classification: "باذنجان كلاسيك",
			dinar2: 12,
			fils2: 15,
		},
		{
			fils1: 15,
			dinar1: 452,
			weight: 456,
			quantity: 45,
			packageType: "كرتونة",
			classification: "باذنجان كلاسيك",
			dinar2: 12,
			fils2: 15,
		},
		{
			fils1: 15,
			dinar1: 452,
			weight: 254,
			quantity: 65,
			packageType: "كرتونة",
			classification: "باذنجان كلاسيك",
			dinar2: 12,
			fils2: 15,
		},
		{
			fils1: 15,
			dinar1: 452,
			weight: 456,
			quantity: 45,
			packageType: "كرتونة",
			classification: "باذنجان كلاسيك",
			dinar2: 12,
			fils2: 15,
		},
		{
			fils1: 15,
			dinar1: 452,
			weight: 350,
			quantity: 20,
			packageType: "كرتونة",
			classification: "باذنجان كلاسيك",
			dinar2: 35,
			fils2: 15,
		},
		{
			fils1: 15,
			dinar1: 452,
			weight: 254,
			quantity: 65,
			packageType: "كرتونة",
			classification: "باذنجان كلاسيك",
			dinar2: 12,
			fils2: 15,
		},
		{
			fils1: 15,
			dinar1: 452,
			weight: 456,
			quantity: 45,
			packageType: "كرتونة",
			classification: "باذنجان كلاسيك",
			dinar2: 12,
			fils2: 15,
		},
		{
			fils1: 15,
			dinar1: 452,
			weight: 254,
			quantity: 65,
			packageType: "كرتونة",
			classification: "باذنجان كلاسيك",
			dinar2: 12,
			fils2: 15,
		},
		{
			fils1: 15,
			dinar1: 452,
			weight: 456,
			quantity: 45,
			packageType: "كرتونة",
			classification: "باذنجان كلاسيك",
			dinar2: 12,
			fils2: 15,
		},
		{
			fils1: 15,
			dinar1: 452,
			weight: 350,
			quantity: 20,
			packageType: "كرتونة",
			classification: "باذنجان كلاسيك",
			dinar2: 35,
			fils2: 15,
		},
		{
			fils1: 15,
			dinar1: 452,
			weight: 254,
			quantity: 65,
			packageType: "كرتونة",
			classification: "باذنجان كلاسيك",
			dinar2: 12,
			fils2: 15,
		},
	];

	// Return the base data items with IDs
	return baseData.slice(0, count).map((item, index) => ({
		id: index + 1,
		...item,
	}));
}

const initialInventoryItemsData: InventoryItemType[] =
	generateInventoryItemsData(100);

export function useInventoryItemsData() {
	return useQuery({
		queryKey: ["inventoryItems"],
		queryFn: async () => {
			// Simulate network delay
			await new Promise((res) => setTimeout(res, 300));
			return initialInventoryItemsData;
		},
	});
}
