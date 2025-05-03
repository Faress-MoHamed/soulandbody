"use client";

import { useQuery } from "@tanstack/react-query";

export type SuppliersType = {
	supplierName: string;
	phone: string;
	address: string;
	supplierType: string;
};

const generateFakeSupplier = (index: number): SuppliersType => ({
	supplierName: `أحمد حسين`,
	phone: `0105585212`,
	address: `جذورفيصل`,
	supplierType: `طب`,
});

const supplierData: SuppliersType[] = Array.from({ length: 100 }, (_, i) =>
	generateFakeSupplier(i + 1)
);

export function useSuppliers() {
	return useQuery({
		queryKey: ["suppliers"],
		queryFn: async () => supplierData,
	});
}
