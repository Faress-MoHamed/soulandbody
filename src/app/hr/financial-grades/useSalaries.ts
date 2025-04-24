"use client";

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
	const getRandomDate = (start: Date, end: Date) => {
		const date = new Date(
			start.getTime() + Math.random() * (end.getTime() - start.getTime())
		);
		return date.toISOString().split("T")[0];
	};

	const employees = [
		"أحمد محمود",
		"محمد علي",
		"خالد حسن",
		"ياسر عبد الله",
		"سعيد عمر",
	];
	const salaries = [7000, 7200, 7500, 8000, 8500];
	const extras = [100, 200, 300, 400, 500];

	const salaryData = Array.from({ length: 150 }, () => {
		const grossSalary = salaries[Math.floor(Math.random() * salaries.length)];
		const bonus = extras[Math.floor(Math.random() * extras.length)];
		const allowances = extras[Math.floor(Math.random() * extras.length)];
		const netSalary = grossSalary - (bonus + allowances);

		return {
			date: getRandomDate(new Date(2025, 8, 1), new Date(2025, 11, 1)),
			employee: employees[Math.floor(Math.random() * employees.length)],
			salary: grossSalary,
			net_salary: netSalary,
			extras: bonus,
			allowances: allowances,
		};
	});
	return useQuery({
		queryKey: ["salaries"],
		queryFn: async () => {
			// const { data } = await axios.get("/api/salaries");
			return salaryData;
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
