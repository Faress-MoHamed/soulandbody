"use client";

import { AxiosInstance } from "@/lib/AxiosConfig";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export type ExecuseRecord = {
	date: string; // "12/10/2025"
	from: string; // "6:00م"
	to: string; // "7:00م"
	actualEnd: string; // "8:00" or "-"
	reason: string; // e.g. "مصاد طبي"
	deduction: string; // e.g. "120"
	status: "pending" | "accepted" | "done" | "denied"; // "مقبول", "تحت", "مرفوض", "في انتظار الرد"
};

export type Executions = {
	permission_date: any;
	permission_start: string;
	permission_end: string;
	reason: string;
};

export function useExecutions() {
	return useQuery({
		queryKey: ["Executions"],
		queryFn: async () => {
			const { data } = await AxiosInstance.get("permission-requests");
			return data;
		},
	});
}
// Create a new break time record
export function useCreateExecutions() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (Executions: Executions) => {
			const { data } = await AxiosInstance.post(
				"permission-requests",
				Executions
			);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["Executions"] });
			toast.success("تم طلب الاذن بنجاح");
		},
		onError(error: any, variables, context) {
			console.log(error?.response?.data?.message);
			toast.error(error?.response?.data?.message);
		},
	});
}

// Update a break time record
export function useUpdateExecutions() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			id,
			Executions,
		}: {
			id: number;
			Executions: Partial<Executions>;
		}) => {
			const { data } = await AxiosInstance.put(`/api/break-times`, {
				id,
				...Executions,
			});
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["breakTimes"] });
		},
	});
}
