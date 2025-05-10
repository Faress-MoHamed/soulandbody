"use client";

import { AxiosInstance } from "@/lib/AxiosConfig";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
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
			const formData = new FormData();

			// Helper function to append fields
			const appendIfExists = (fieldName: string, value: any) => {
				if (value !== undefined && value !== null && value !== "") {
					formData.append(fieldName, value);
				}
			};

			// Append all regular fields
			appendIfExists("name", employee?.name);
			appendIfExists("qualification", employee?.qualification);
			appendIfExists("birth_date", employee?.birth_date);
			appendIfExists("job", employee?.job);
			appendIfExists("net_salary", employee?.net_salary);
			appendIfExists("job_start_date", employee?.job_start_date);
			appendIfExists("job_nature", employee?.job_nature);
			appendIfExists("extras", employee?.extras);
			appendIfExists("phoneNumber", employee?.phoneNumber);
			appendIfExists("address", employee?.address);
			appendIfExists("email", employee?.email);
			appendIfExists("password", employee?.password);
			appendIfExists(
				"net_salary_after_deduction",
				employee?.net_salary_after_deduction
			);
			appendIfExists("facility_id", employee?.facility_id);
			appendIfExists("department_id", employee?.department_id);
			appendIfExists("role", employee?.role);
			appendIfExists("allowance", employee?.allowance);

			// Append numeric fields only if they're not 0
			if (employee?.sick_leave_balance !== 0)
				appendIfExists("sick_leave_balance", employee?.sick_leave_balance);
			if (employee?.vacation_balance !== 0)
				appendIfExists("vacation_balance", employee?.vacation_balance);
			if (employee?.casual_leave_balance !== 0)
				appendIfExists("casual_leave_balance", employee?.casual_leave_balance);
			if (employee?.regular_leave_balance !== 0)
				appendIfExists(
					"regular_leave_balance",
					employee?.regular_leave_balance
				);
			if (employee?.separate_balance !== 0)
				appendIfExists("separate_balance", employee?.separate_balance);
			if (employee?.continous_balance !== 0)
				appendIfExists("continous_balance", employee?.continous_balance);

			// Handle attachments - both single file and array cases
			if (employee?.attachments) {
				if (Array.isArray(employee.attachments)) {
					employee.attachments.forEach((file, index) => {
						if (file instanceof File || file instanceof Blob) {
							formData.append(`attachments[${index}]`, file);
						}
					});
				} else if (
					employee.attachments instanceof File ||
					employee.attachments instanceof Blob
				) {
					formData.append("attachments[0]", employee.attachments);
				}
			}

			// Send the request with proper headers
			const { data } = await AxiosInstance.post("employee-data", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["employees"] });
			toast.success("user created successfully");
			router.push("/dashboard/hr/employees");
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
	const router = useRouter();

	return useMutation({
		mutationFn: async ({
			id,
			employee,
		}: {
			id: number;
			employee: Omit<any, "id">;
		}) => {
			const formData = new FormData();

			// Helper function to append fields
			const appendIfExists = (fieldName: string, value: any) => {
				if (value !== undefined && value !== null && value !== "") {
					formData.append(fieldName, value);
				}
			};

			// Append all regular fields
			appendIfExists("name", employee?.name);
			appendIfExists("qualification", employee?.qualification);
			appendIfExists("birth_date", employee?.birth_date);
			appendIfExists("job", employee?.job);
			appendIfExists("net_salary", employee?.net_salary);
			appendIfExists("job_start_date", employee?.job_start_date);
			appendIfExists("job_nature", employee?.job_nature);
			appendIfExists("extras", employee?.extras);
			appendIfExists("address", employee?.address);
			appendIfExists("email", employee?.email);
			appendIfExists("password", employee?.password);
			appendIfExists(
				"net_salary_after_deduction",
				employee?.net_salary_after_deduction
			);
			appendIfExists("facility_id", employee?.facility_id);
			appendIfExists("department_id", employee?.department_id);
			appendIfExists("role", employee?.role);
			appendIfExists("allowance", employee?.allowance);

			// Append numeric fields only if they're not 0
			if (employee?.sick_leave_balance !== 0)
				appendIfExists("sick_leave_balance", employee?.sick_leave_balance);
			if (employee?.vacation_balance !== 0)
				appendIfExists("vacation_balance", employee?.vacation_balance);
			if (employee?.casual_leave_balance !== 0)
				appendIfExists("casual_leave_balance", employee?.casual_leave_balance);
			if (employee?.regular_leave_balance !== 0)
				appendIfExists(
					"regular_leave_balance",
					employee?.regular_leave_balance
				);
			if (employee?.separate_balance !== 0)
				appendIfExists("separate_balance", employee?.separate_balance);
			if (employee?.continous_balance !== 0)
				appendIfExists("continous_balance", employee?.continous_balance);
			if (employee?.phone) {
				appendIfExists("phone", employee?.phone);
			}
			// Handle attachments - both single file and array cases
			if (employee?.attachments) {
				if (Array.isArray(employee.attachments)) {
					employee.attachments.forEach((file, index) => {
						if (file instanceof File || file instanceof Blob) {
							formData.append(`attachments[${index}]`, file);
						}
					});
				} else if (
					employee.attachments instanceof File ||
					employee.attachments instanceof Blob
				) {
					formData.append("attachments[0]", employee.attachments);
				}
			}

			// Send the request with proper headers
			const { data } = await AxiosInstance.post(
				`employee-data/${id}`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["employees"] });
			toast.success("user created successfully");
			router.push("/dashboard/hr/employees");
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
