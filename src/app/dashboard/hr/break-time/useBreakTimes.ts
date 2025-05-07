"use client";

import { AxiosInstance } from "@/lib/AxiosConfig";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface BreakTime {
	id: number;
	date: string;
	employee: string;
	from: string;
	to: string;
	actual_end: string;
	deduction: number;
}

export function useBreakTimes() {
	return useQuery({
		queryKey: ["breakTimes"],
		queryFn: async () => {
			const { data } = await AxiosInstance.get("user-break-requests");
			return data;
		},
	});
}

// Fetch a single break record
export function useBreakTime(id: number) {
	return useQuery({
		queryKey: ["breakTime", id],
		queryFn: async () => {
			const { data } = await axios.get(`/api/break-times?id=${id}`);
			return data;
		},
		enabled: !!id,
	});
}

// Create a new break time record
export function useCreateBreakTime() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (breakTime: Omit<BreakTime, "id">) => {
			const { data } = await axios.post("/api/break-times", breakTime);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["breakTimes"] });
		},
	});
}

// Update a break time record
export function useUpdateBreakTime() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			id,
			breakTime,
		}: {
			id: number;
			breakTime: Partial<BreakTime>;
		}) => {
			const { data } = await axios.put(`/api/break-times`, {
				id,
				...breakTime,
			});
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["breakTimes"] });
		},
	});
}
