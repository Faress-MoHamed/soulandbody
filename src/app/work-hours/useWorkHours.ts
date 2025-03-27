"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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
			const { data } = await axios.get("/api/workhours");
			return data;
		},
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
			day,
			startTime,
			endTime,
		}: {
			day: string;
			startTime: string;
			endTime: string;
		}) => {
			const { data } = await axios.post("/api/workhours", {
				day,
				startTime,
				endTime,
			});
			return data;
		},
		onSuccess: () => {
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
			queryClient.invalidateQueries({ queryKey: ["workHours"] });
		},
	});
}
