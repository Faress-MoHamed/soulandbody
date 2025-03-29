"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface Permission {
	id: number;
	date: string;
	employee: string;
	from: string;
	to: string;
	actual_end: string;
	reason: string;
	deduction: number;
}

export function usePermissions() {
	const getRandomDate = (start: Date, end: Date) => {
		const date = new Date(
			start.getTime() + Math.random() * (end.getTime() - start.getTime())
		);
		return date.toISOString().split("T")[0];
	};

	const getRandomTime = () => {
		const hours = Math.floor(Math.random() * 10) + 9; // 9 AM - 7 PM
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
	const reasons = [
		"موعد طبي",
		"ظرف طارئ",
		"اجتماع شخصي",
		"زيارة حكومية",
		"أمر عائلي",
	];
	const deductions = [0, 10, 20, 30, 50];

	const permissionData = Array.from({ length: 150 }, (_, index) => {
		const from = getRandomTime();
		const to = getRandomTime();
		const actual_end = getRandomTime();
		return {
			id: index + 1,
			date: getRandomDate(new Date(2025, 7, 1), new Date(2025, 11, 1)), // August - December 2025
			employee: employees[Math.floor(Math.random() * employees.length)],
			from,
			to,
			actual_end,
			reason: reasons[Math.floor(Math.random() * reasons.length)],
			deduction: deductions[Math.floor(Math.random() * deductions.length)],
		};
	});

	return useQuery({
		queryKey: ["permissions"],
		queryFn: async () => {
			// const { data } = await axios.get("/api/permissions");
			return permissionData;
		},
	});
}

// Fetch a single permission record
export function usePermission(id: number) {
	return useQuery({
		queryKey: ["permission", id],
		queryFn: async () => {
			const { data } = await axios.get(`/api/permissions?id=${id}`);
			return data;
		},
		enabled: !!id,
	});
}

// Create a new permission record
export function useCreatePermission() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (permission: Omit<Permission, "id">) => {
			const { data } = await axios.post("/api/permissions", permission);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["permissions"] });
		},
	});
}

// Update a permission record
export function useUpdatePermission() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			id,
			permission,
		}: {
			id: number;
			permission: Partial<Permission>;
		}) => {
			const { data } = await axios.put(`/api/permissions`, {
				id,
				...permission,
			});
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["permissions"] });
		},
	});
}
