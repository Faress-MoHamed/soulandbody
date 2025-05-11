"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type {
	VacationBalance,
	VacationType,
	WorkRecord,
} from "../vacations.type";
import toast from "react-hot-toast";
import { AxiosInstance } from "@/lib/AxiosConfig";
import { useRouter } from "next/navigation";


export function useUserVacations() {
	return useQuery({
		queryKey: ["Vacations"],
		queryFn: async () => {
			const { data } = await AxiosInstance.get("employee_vacation_details");
			return data?.data;
		},
	});
}

export function useReqUserVacations() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (vacationReq: any) => {
			// Send the request with proper headers
			const { data } = await AxiosInstance.post(
				"vacation-requests/request_vacation",
				vacationReq
			);

			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["Vacations"] });
			toast.success("vacationReq succesfully successfully");
		},
		onError: (error: any, variables, context) => {
			// Check if the error response has a 'data' field with a 'message' or validation errors
			const errorMessages = error?.response?.data?.error;
console.log(errorMessages||error?.response)
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
				toast.error(errorMessages||"An error occurred. Please try again.");
			}
		},
	});
}