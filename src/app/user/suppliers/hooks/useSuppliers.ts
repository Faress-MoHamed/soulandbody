"use client";

import { useQuery } from "@tanstack/react-query";

export type SuppliersType = {
	id: number;
	supplierName: string;
	phone: string;
	address: string;
	supplierType: string;
};

type ApiSupplierType = {
	id: number; // ضفنا الـ id هنا
	supplier_name: string;
	phone: string;
	address: string;
	supplier_type: string;
};

export function useSuppliers() {
	return useQuery<SuppliersType[]>({
		queryKey: ["suppliers"],
		queryFn: async () => {
			const response = await fetch("http://192.168.1.15:8008/api/suppliers", {
				headers: {
					Authorization: "Bearer <your_token_here>",
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error("فشل في جلب الموردين");
			}

			const data: ApiSupplierType[] = await response.json();

			// تحويل بيانات الـ API لتناسب النوع اللي محتاجه الجدول
			return data.map((item) => ({
				id: item.id,
				supplierName: item.supplier_name,
				phone: item.phone,
				address: item.address,
				supplierType: item.supplier_type,
			}));
		},
	});
}
