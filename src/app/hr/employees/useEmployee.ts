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
			const { data } = await AxiosInstance.get(`employee-data/${id}`);
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
	const router = useRouter();
	return useMutation({
		mutationFn: async (employee: Omit<any, "id">) => {
			let dataToSend: any = {};
			if (employee?.name) {
				dataToSend.name = employee?.name;
			}
			if (employee?.qualification) {
				dataToSend.qualification = employee?.qualification;
			}
			if (employee?.birth_date) {
				dataToSend.birth_date = employee?.birth_date;
			}
			if (employee?.job) {
				dataToSend.job = employee?.job;
			}
			if (employee?.net_salary) {
				dataToSend.net_salary = employee?.net_salary;
			}
			if (employee?.job_start_date) {
				dataToSend.job_start_date = employee?.job_start_date;
			}
			if (employee?.job_nature) {
				dataToSend.job_nature = employee?.job_nature;
			}
			if (employee?.extras) {
				dataToSend.extras = employee?.extras;
			}
			if (employee?.phoneNumber) {
				dataToSend.phoneNumber = employee?.phoneNumber;
			}
			if (employee?.address) {
				dataToSend.address = employee?.address;
			}
			if (employee?.email) {
				dataToSend.email = employee?.email;
			}
			if (employee?.password) {
				dataToSend.password = employee?.password;
			}
			if (employee?.net_salary_after_deduction) {
				dataToSend.net_salary_after_deduction =
					employee?.net_salary_after_deduction;
			}
			if (employee?.facility_id) {
				dataToSend.facility_id = employee?.facility_id;
			}
			if (employee?.department_id) {
				dataToSend.department_id = employee?.department_id;
			}
			if (employee?.role) {
				dataToSend.role = employee?.role;
			}
			if (employee?.allowance) {
				dataToSend.allowance = employee?.allowance;
			}

			if (employee?.sick_leave_balance !== 0) {
				dataToSend.sick_leave_balance = employee?.sick_leave_balance;
			}
			if (employee?.vacation_balance !== 0) {
				dataToSend.vacation_balance = employee?.vacation_balance;
			}
			if (employee?.casual_leave_balance !== 0) {
				dataToSend.casual_leave_balance = employee?.casual_leave_balance;
			}
			if (employee?.regular_leave_balance !== 0) {
				dataToSend.regular_leave_balance = employee?.regular_leave_balance;
			}
			if (employee?.separate_balance !== 0) {
				dataToSend.separate_balance = employee?.separate_balance;
			}
			if (employee?.continous_balance !== 0) {
				dataToSend.continous_balance = employee?.continous_balance;
			}

			const { data } = await AxiosInstance.post("employee-data", dataToSend);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["employees"] });
			toast.success("user created successfully");
			router.push("/hr/employees");
		},
		onError: (error: any, variables, context) => {
			// Check if the error response has a 'data' field with a 'message' or validation errors
			const errorMessages = error?.response?.data?.message;

			if (errorMessages && typeof errorMessages === "object") {
				// Loop through the error object and show individual toasts for each field
				Object.keys(errorMessages).forEach((field) => {
					const messages = errorMessages[field];
					messages.forEach((message: any) => {
						toast.error(`${message}`); // Show toast for each error message
					});
				});
			} else {
				// If there are no field errors, just show a generic error message
				toast.error("An error occurred. Please try again.");
			}
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
			const { data } = await AxiosInstance.put(`employee-data/${id}`);
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
			await AxiosInstance.delete(`employee-data/${id}`);
			toast.success(`تم حذف الموظف بنجاح`);
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
		staleTime: Infinity, // Data will never be considered stale
		// cacheTime: 1000 * 60 * 60, // Cache for 1 hour
	});
}

export function useGetAlldepartments() {
	return useQuery({
		queryKey: ["departments"],
		queryFn: async () => {
			const { data } = await AxiosInstance.get("departments");
			return data;
		},
		staleTime: Infinity, // Data will never be considered stale
	});
}
