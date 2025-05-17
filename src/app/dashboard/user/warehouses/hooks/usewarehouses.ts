"use client";
import { AxiosInstance } from "@/lib/AxiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type WarehouseType = {
	code: number; // كود المخزن
	name: string; // اسم المخزن
	type: string; // نوع المخزن
	location: string; // الموقع
	department: string; // الإدارة المسؤولة
	capacity: string | number; // السعة القصوى
};


export function useWarehousesData() {
	return useQuery({
		queryKey: ["warehouses"],
		queryFn: async () => {
			// Simulate network delay
			const {data} = await AxiosInstance.get("stores");
			return data;
		},
	});
}
export function useOneWarehouse(id?:any) {
	return useQuery({
		queryKey: ["warehouses"],
		queryFn: async () => {
			// Simulate network delay
			const {data} = await AxiosInstance.get(`stores/${id}`);
			return data;
		},
		enabled: !!id, // Only fetch data when id is provided
	});
}
export function useAddNewWareHouse() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (newWarehouse: any) => {
			const { data } = await AxiosInstance.post("stores", newWarehouse);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["warehouses"] });
		},
	});
}
export function useUpddateWareHouse(id?:string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (newWarehouse: any) => {
			const { data } = await AxiosInstance.post(`stores/${id}`, newWarehouse);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["warehouses"] });
		},
	});
}

export function useDeleteWareHouse() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["warehouses"],
		mutationFn: async (id: number) => {
			const { data } = await AxiosInstance.delete(`stores/${id}`);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["warehouses"] });
		},
	});
}
