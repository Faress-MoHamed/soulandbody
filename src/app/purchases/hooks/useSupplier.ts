"use client";

import { useQuery } from "@tanstack/react-query";

export type SupplierType = {
	name: string;
	phone: string;
	address: string;
};

const suppliersData: SupplierType[] = Array.from({ length: 100 }, () => ({
	name: "أحمد ابراهيم",
	phone: "0101011515",
	address: "تيستتيستتيست",
}));

export function useSuppliers() {
	return useQuery({
		queryKey: ["suppliers"],
		queryFn: async () => {
			// await new Promise((res) => setTimeout(res, 300));
			return suppliersData;
		},
	});
}
