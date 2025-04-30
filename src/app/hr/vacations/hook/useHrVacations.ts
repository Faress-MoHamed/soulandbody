"use client";

import { AxiosInstance } from "@/lib/AxiosConfig";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
export type VacationRecord = {
	id: number;
	date: string; // Format: DD/MM/YYYY
	employee: string;
	leaveStart: string; // Format: DD/MM/YYYY
	leaveEnd: string; // Format: DD/MM/YYYY
	leaveDays: number;
	leaveType: string;
	deduction: number;
	attachmentLink: string | null; // ملحقات: optional link
};

export function useHrVacations() {
	return useQuery({
		queryKey: ["HrVacations"],
		queryFn: async () => {
			const { data } = await AxiosInstance.get("user-vacation-requests");
			// console.log(
			// 	data
			// );
			return data;
		},
	});
}

// Create an employee
export function useUpdateVacations(id: string) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({ status }: { status: string }) => {
			const { data } = await AxiosInstance.post(
				`user-vacation-requests/${id}`,
				{
					status,
				}
			);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["HrVacations"] });
			toast.success("vacations status changed successfully");
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
