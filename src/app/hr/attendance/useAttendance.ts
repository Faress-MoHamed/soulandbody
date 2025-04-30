"use client";

import { AxiosInstance } from "@/lib/AxiosConfig";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface Attendance {
	id: number;
	date: string;
	employee: string;
	check_in: string;
	check_out: string;
	notes: string;
	deduction: string;
}
export function useAttendance() {
	return useQuery({
		queryKey: ["attendance"],
		queryFn: async () => {
			const { data } = await AxiosInstance.get(`attendance`);
			return data;
		},
	});
}

export function useSingleAttendance(id: string) {
	return useQuery({
		queryKey: ["attendance", id],
		queryFn: async () => {
			const { data } = await axios.get(`/api/attendance?id=${id}`);
			return data;
		},
		enabled: !!id,
	});
}

export function useCreateAttendance() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (attendance: Omit<Attendance, "id">) => {
			const { data } = await axios.post("/api/attendance", attendance);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["attendance"] });
		},
	});
}

export function useUpdateAttendance() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			id,
			attendance,
		}: {
			id: number;
			attendance: Partial<Attendance>;
		}) => {
			const { data } = await axios.put(`/api/attendance`, {
				id,
				...attendance,
			});
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["attendance"] });
		},
	});
}

export function useDeleteAttendance() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			await axios.delete(`/api/attendance`, { params: { id } });
			return id;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["attendance"] });
		},
	});
}
