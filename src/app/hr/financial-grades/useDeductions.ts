"use client";

import { AxiosInstance } from "@/lib/AxiosConfig";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export interface Deduction {
	employee_id: number;
	transaction_date: string;
	transaction_type: string;
	amount: number;
	reason: string;
}

// Fetch all deductions with pagination
export function useDeductions() {
	return useQuery({
		queryKey: ["deductions"],
		queryFn: async () => {
			const { data } = await AxiosInstance.get("financial-transactions");
			return (data || [])?.filter(
				(el: any) => el?.transaction_type === "Deduction"
			);
		},
		refetchOnMount: true,
		refetchOnWindowFocus: true,
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
			const { data } = await AxiosInstance.post(
				"financial-transactions",
				deduction
			);
			return data;
		},
		onSuccess: async () => {
			try {
				await queryClient.invalidateQueries({
					queryKey: ["deductions"],
					exact: true,
				});
				toast.success("تم اضافة العملية بنجاح");
			} catch (error) {
				console.error("Failed to invalidate queries:", error);
				toast.success("تم اضافة العملية بنجاح ولكن حدث خطأ في تحديث البيانات");
			}
		},
		onMutate: async (newDeduction) => {
			// Cancel any outgoing refetches
			await queryClient.cancelQueries({ queryKey: ["deductions"] });

			// Snapshot the previous value
			const previousDeductions = queryClient.getQueryData(["deductions"]);

			// Optimistically update to the new value
			queryClient.setQueryData(["deductions"], (old: any) => [
				...(old || []),
				{ ...newDeduction, id: Date.now() },
			]);

			return { previousDeductions };
		},
		onError: (error: any, variables, context) => {
			// Check if the error response has a 'data' field with a 'message' or validation errors
			const errorMessages = error?.response?.data?.message;

			if (errorMessages && typeof errorMessages === "object") {
				// Loop through the error object and show individual toasts for each field
				Object.keys(errorMessages).forEach((field) => {
					const messages = errorMessages[field];
					messages.forEach((message: any) => {
						toast.error(`${message}`); // Show toast for each error message
					});
				});
			} else {
				// If there are no field errors, just show a generic error message
				toast.error("An error occurred. Please try again.");
			}
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
