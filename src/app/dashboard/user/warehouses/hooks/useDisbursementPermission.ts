"use client";
import { AxiosInstance } from "@/lib/AxiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
			const {data}= await AxiosInstance.get("issue-vouchers");	
			return data;
		},
	});
}
export function useDeleteDisbursementPermissionsData() {
	const queryclicnt = useQueryClient()
	return useMutation({
		// queryKey: ["DisbursementPermissions"],
		mutationFn: async (id:any) => {
			// Simulate network delay
			const {data}= await AxiosInstance.delete(`issue-vouchers/${id}`);	
			return data;
		},
		onSuccess: () => {
			queryclicnt.invalidateQueries({queryKey: ["DisbursementPermissions"]})
		},
	});
}


