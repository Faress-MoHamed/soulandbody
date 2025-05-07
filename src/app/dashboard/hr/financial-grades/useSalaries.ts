"use client";

import { AxiosInstance } from "@/lib/AxiosConfig";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface Salary {
	userId: number;
	date: string;
	employee: string;
	gross_salary: number;
	net_salary: number;
	bonuses: number;
	allowances: number;
}

export function useSalaries() {
	return useQuery({
		queryKey: ["salaries"],
		queryFn: async () => {
			const { data } = await AxiosInstance.get("employee-data");
			return data;
		},
	});
}

// Fetch a single salary record
export function useSalary(userId: string) {
	return useQuery({
		queryKey: ["salary", userId],
		queryFn: async () => {
			const { data } = await axios.get(`/api/salaries?userId=${userId}`);
			return data;
		},
		enabled: !!userId,
	});
}

export function useCreateSalary() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (salary: Omit<Salary, "id">) => {
			const { data } = await axios.post("/api/salaries", salary);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["salaries"] });
		},
	});
}

export function useUpdateSalary() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			id,
			salary,
		}: {
			id: number;
			salary: Partial<Salary>;
		}) => {
			const { data } = await axios.put(`/api/salaries`, { id, ...salary });
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["salaries"] });
		},
	});
}
