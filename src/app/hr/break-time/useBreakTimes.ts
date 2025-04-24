"use client";

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
	const getRandomDate = (start: Date, end: Date) => {
		const date = new Date(
			start.getTime() + Math.random() * (end.getTime() - start.getTime())
		);
		return date.toISOString().split("T")[0];
	};

	const getRandomTime = () => {
		const hours = Math.floor(Math.random() * 10) + 9; // Random hour between 9 AM - 7 PM
		const minutes = Math.floor(Math.random() * 60);
		return `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}`;
	};

	const employees = [
		"أحمد محمود",
		"محمد علي",
		"خالد حسن",
		"ياسر عبد الله",
		"سعيد عمر",
	];
	const deductions = [0, 10, 20, 30, 50];

	const breakTimeData = Array.from({ length: 150 }, (_, index) => {
		const from = getRandomTime();
		const to = getRandomTime();
		const actual_end = getRandomTime();
		return {
			id: index + 1,
			date: getRandomDate(new Date(2025, 7, 1), new Date(2025, 11, 1)),
			employee: employees[Math.floor(Math.random() * employees.length)],
			from,
			to,
			actual_end,
			deduction: deductions[Math.floor(Math.random() * deductions.length)],
		};
	});

	return useQuery({
		queryKey: ["breakTimes"],
		queryFn: async () => {
			// const { data } = await axios.get("/api/break-times");
			return breakTimeData;
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
