"use client";

import { AxiosInstance } from "@/lib/AxiosConfig";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export interface WorkHour {
	id: number;
	day: string;
	start_time: string;
	end_time: string;
	is_active: number;
	break_hours: number;
}

// Fetch all work hours
export function useWorkHours() {
	return useQuery({
		queryKey: ["workHours"],
		queryFn: async () => {
			const { data } = await AxiosInstance.get("company-work-hours");
			return data;
		},
		// onSuccess: () => {
		// 	toast.success("saved successfully");
		
		// 	queryClient.invalidateQueries({ queryKey: ["workHours"] });
		// },
	});
}

// Toggle work day active status
export function useToggleWorkDay() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (day: string) => {
			const { data } = await axios.put("/api/workhours", { day });
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["workHours"] });
		},
	});
}

// Update work hours (start and end time)
export function useUpdateWorkHours() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			id,
			break_end_time,
			break_start_time,
			day,
			break_time,
			work_end_time,
			work_start_time,
			work_status
		}: {
			"id": string,
			"day": string,
			"work_status": string,
			"work_start_time": string,
			"work_end_time": string,
			"break_time": number,
			"break_start_time": string,
			"break_end_time": string
		  }
		  ) => {
			const { data } = await AxiosInstance.post(`company-work-hours`, {
				id:parseInt(id),
				break_end_time,
				break_start_time,
				day,
				break_time,
				work_end_time,
				work_start_time,
				work_status
			});
			return data;
		},
		onSuccess: () => {
			toast.success("saved successfully");

			queryClient.invalidateQueries({ queryKey: ["workHours"] });
		},
	});
}

// Update break hours
export function useUpdateBreakHours() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			day,
			breakHours,
		}: {
			day: string;
			breakHours: number;
		}) => {
			const { data } = await axios.patch("/api/workhours", { day, breakHours });
			return data;
		},
		onSuccess: () => {
			toast.success("saved successfully");

			queryClient.invalidateQueries({ queryKey: ["workHours"] });
		},
	});
}
