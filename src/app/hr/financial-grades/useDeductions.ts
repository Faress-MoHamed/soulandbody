"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface Deduction {
	id: number;
	date: string;
	employee: string;
	type: string;
	amount: number;
	reason: string;
}

// Fetch all deductions with pagination
export function useDeductions() {
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
  const deductionReasons = ["تأخير", "غياب", "مخالفة", "سلفة", "جزاء"];
  const deductionAmounts = [100, 200, 300, 400, 500];

  const deductionData = Array.from({ length: 150 }, () => {
    return {
      date: getRandomDate(new Date(2025, 8, 1), new Date(2025, 11, 1)),
      employee: employees[Math.floor(Math.random() * employees.length)],
      type: "خصم",
      amount:
        deductionAmounts[
          Math.floor(Math.random() * deductionAmounts.length)
        ],
      reason:
        deductionReasons[
          Math.floor(Math.random() * deductionReasons.length)
        ],
    };
  });
	return useQuery({
		queryKey: ["deductions"],
		queryFn: async () => {
			// const { data } = await axios.get("/api/deductions");
			return deductionData;
		},
	});
}

// Fetch a single deduction record
export function useDeduction(userId: string) {
	return useQuery({
		queryKey: ["deduction", userId],
		queryFn: async () => {
			const { data } = await axios.get(`/api/deductions?userId=${userId}`);
			return data;
		},
		enabled: !!userId,
	});
}

// Create a deduction record
export function useCreateDeduction() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (deduction: Omit<Deduction, "id">) => {
			const { data } = await axios.post("/api/deductions", deduction);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["deductions"] });
		},
	});
}

// Update a deduction record
export function useUpdateDeduction() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			id,
			deduction,
		}: {
			id: number;
			deduction: Partial<Deduction>;
		}) => {
			const { data } = await axios.put(`/api/deductions`, { id, ...deduction });
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["deductions"] });
		},
	});
}

// Delete a deduction record
export function useDeleteDeduction() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			await axios.delete(`/api/deductions`, { params: { id } });
			return id;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["deductions"] });
		},
	});
}
