"use client";

import { AxiosInstance } from "@/lib/AxiosConfig";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface Employee {
	id: number;
	date: string;
	employee: string;
	leaveStart: string;
	leaveEnd: string;
	leaveDays: number;
	leaveType: string;
	deduction: number;
	work_nature: string;
	net_salary: string;
	phone_number: string;
	address: string;
	birthDate: string;
	qualification: string;
	position: string;
	extras: string;
}

interface Pagination {
	total: number;
	pages: number;
	current: number;
}

// Fetch all employees with pagination
export function useEmployees(page: number = 1, limit: number = 10) {
	return useQuery({
		queryKey: ["employees", page, limit],
		queryFn: async () => {
			const { data } = await AxiosInstance.get("employee-data");
			// console.log(
			// 	data
			// );
			return data;
		},
	});
}

// Fetch a single employee
export function useEmployee(id: string) {
	return useQuery({
		queryKey: ["employee", id],
		queryFn: async () => {
			const { data } = await axios.get(`/api/employees?id=${id}`);
			return data;
		},
		enabled: !!id, // Prevents unnecessary fetches when id is not provided
	});
}

// Fetch distinct employees
export function useDistinctEmployees() {
	return useQuery({
		queryKey: ["distinctEmployees"],
		queryFn: async () => {
			const { data } = await axios.get("/api/employees/distinct");
			return data;
		},
	});
}

// Create an employee
export function useCreateEmployee() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (employee: Omit<any, "id">) => {
			const { data } = await axios.post("/api/employees", employee);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["employees"] });
		},
	});
}

// Update an employee
export function useUpdateEmployee() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			id,
			employee,
		}: {
			id: number;
			employee: Partial<Employee>;
		}) => {
			const { data } = await axios.put(`/api/employees`, { id, ...employee });
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["employees"] });
		},
	});
}

// Delete an employee
export function useDeleteEmployee() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			await axios.delete(`/api/employees`, { params: { id } });
			return id;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["employees"] });
		},
	});
}

export function useGetAllFacilaties() {
	return useQuery({
		queryKey: ["facilaties"],
		queryFn: async () => {
			const { data } = await AxiosInstance.get("facilities");
			return data;
		},
	});
}

export function useGetAlldepartments() {
	return useQuery({
		queryKey: ["departments"],
		queryFn: async () => {
			const { data } = await AxiosInstance.get("departments");
			return data;
		},
	});
}
