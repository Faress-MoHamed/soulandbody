"use client";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

export type DisbursementPermissionType = {
	id: number; // ID for React key purposes
	code: number; // الكود
	date: string; // التاريخ
	name: string; // اسم الصنف
	quantity: number; // الكمية
	reason: string; // السبب
};

// Function to generate inventory items data
export function generateDisbursementPermissionsData(
	count: number = 6
): DisbursementPermissionType[] {
	return Array.from({ length: count }, (_, index) => {
		return {
			id: index + 1,
			code: 15,
			date: "11/12/2025",
			name: "ليون ثوب",
			quantity: 34,
			reason: "إذا كان",
		};
	});
}

const initialDisbursementPermissionsData: DisbursementPermissionType[] =
	generateDisbursementPermissionsData();

export function useDisbursementPermissionsData() {
	return useQuery({
		queryKey: ["DisbursementPermissions"],
		queryFn: async () => {
			// Simulate network delay
			await new Promise((res) => setTimeout(res, 300));
			return initialDisbursementPermissionsData;
		},
	});
}


