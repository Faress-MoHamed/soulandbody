"use client";

import { AxiosInstance } from "@/lib/AxiosConfig";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
export type OvertimeRecord = {
	date: string; // e.g. "12/10/2025"
	from: string; // e.g. "6:00م"
	to: string; // e.g. "7:00م"
	actualEnd: string; // e.g. "8:00" or "-"
	reason: string;
	deduction: string;
	status: "pending" | "accepted" | "done" | "denied";
};

export type Overtime = {
	date: any;
	hours: number;
	minutes: number;
	reason?: string;
};

// Fetch all overtime requests
export function useOvertime() {
	return useQuery({
		queryKey: ["Overtime"],
		queryFn: async () => {
			const { data } = await AxiosInstance.get("overtime-requests");
			return data;
		},
	});
}

// Create a new overtime request
export function useCreateOvertime() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (overtime: Overtime) => {
			const { data } = await AxiosInstance.post("overtime-requests", overtime);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["Overtime"] });
			toast.success("تم تقديم طلب العمل الإضافي بنجاح");
		},
		onError(error: any) {
			console.error(error?.response?.data?.message);
			toast.error(error?.response?.data?.message || "حدث خطأ ما");
		},
	});
}

// Update an overtime request
export function useUpdateOvertime() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			id,
			overtime,
		}: {
			id: number;
			overtime: Partial<Overtime>;
		}) => {
			const { data } = await AxiosInstance.put(`/overtime-requests`, {
				id,
				...overtime,
			});
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["Overtime"] });
		},
	});
}
