"use client";

import { AxiosInstance } from "@/lib/AxiosConfig";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface Permission {
	id: number;
	date: string;
	employee: string;
	from: string;
	to: string;
	actual_end: string;
	reason: string;
	deduction: number;
}

export function usePermissions() {


	return useQuery({
		queryKey: ["permissions"],
		queryFn: async () => {
			const { data } = await AxiosInstance.get("user-permission-requests");
			return data;
		},
	});
}

// Fetch a single permission record
export function usePermission(id: number) {
	return useQuery({
		queryKey: ["permission", id],
		queryFn: async () => {
			const { data } = await axios.get(`/api/permissions?id=${id}`);
			return data;
		},
		enabled: !!id,
	});
}

// Create a new permission record
export function useCreatePermission() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (permission: Omit<Permission, "id">) => {
			const { data } = await axios.post("/api/permissions", permission);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["permissions"] });
		},
	});
}

// Update a permission record
export function useUpdatePermission() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			id,
			permission,
		}: {
			id: number;
			permission: Partial<Permission>;
		}) => {
			const { data } = await axios.put(`/api/permissions`, {
				id,
				...permission,
			});
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["permissions"] });
		},
	});
}
