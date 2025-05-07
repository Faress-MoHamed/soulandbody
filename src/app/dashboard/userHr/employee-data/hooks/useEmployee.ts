"use client";

import { AxiosInstance } from "@/lib/AxiosConfig";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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


// Fetch a single employee
export function useEmployee() {
	return useQuery({
		queryKey: ["employee"],
		queryFn: async () => {
			const { data } = await AxiosInstance.get(`employee_data`);
			return data;
		},
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


export function useGetAllFacilaties() {
	return useQuery({
		queryKey: ["facilaties"],
		queryFn: async () => {
			const { data } = await AxiosInstance.get("facilities");
			return data;
		},
		staleTime: 1000 * 60 * 60, // Cache for 1 hour
		gcTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours
		refetchOnWindowFocus: false, // Don't refetch on window focus
	});
}

export function useGetAlldepartments() {
	return useQuery({
		queryKey: ["departments"],
		queryFn: async () => {
			const { data } = await AxiosInstance.get("departments");
			return data;
		},
		staleTime: 1000 * 60 * 60, // Cache for 1 hour
		gcTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours
		refetchOnWindowFocus: false, // Don't refetch on window focus
	});
}
