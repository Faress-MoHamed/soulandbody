"use client";

import { AxiosInstance } from "@/lib/AxiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface AttendanceEmployee {
	id: number;
	date: string;
	checkIn: string;
	checkOut: string;
	breakTime: string;
	permission: string;
	hoursWorked: string;
	workLocation: string;
}

const generateRandomDate = (start: Date, end: Date) => {
	const date = new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
	return date.toISOString().split("T")[0];
};

const generateRandomTime = (baseHour: number, variance = 0) => {
	const hour = baseHour + Math.floor(Math.random() * variance);
	const minute = Math.floor(Math.random() * 60);
	return `${hour.toString().padStart(2, "0")}:${minute
		.toString()
		.padStart(2, "0")}`;
};

const workLocations = [
	"مقر العمل",
	"عن بعد",
	"فرع الرياض",
	"فرع جدة",
	"فرع الدمام",
];

// // Generate 150 attendance records
// 	return Array.from({ length: 150 }, (_, id) => {
// 		// Randomly decide if this is a regular work day or a special case
// 		const isRegularWorkDay = Math.random() > 0.1;
// 		const isHalfDay = !isRegularWorkDay && Math.random() > 0.5;
// 		const isVacation = !isRegularWorkDay && !isHalfDay;

// 		// Generate date (ensure dates are sorted from newest to oldest)
// 		const daysAgo = Math.floor(id / 3); // Approximately 3 records per day
// 		const today = new Date();
// 		const recordDate = new Date(today);
// 		recordDate.setDate(today.getDate() - daysAgo);
// 		const date = recordDate.toISOString().split("T")[0];

// 		if (isVacation) {
// 			// Vacation day
// 			return {
// 				id,
// 				date,
// 				checkIn: Math.random() > 0.5 ? "إجازة رسمية" : "إجازة مرضية",
// 				checkOut: "",
// 				breakTime: "",
// 				permission: "",
// 				hoursWorked: "",
// 				workLocation: "",
// 			};
// 		} else if (isHalfDay) {
// 			return {
// 				id,
// 				date,
// 				checkIn: "ص 9.00",
// 				checkOut: "م 12.00",
// 				breakTime: "ساعة 1",
// 				permission: "ساعة 1",
// 				hoursWorked: "3 ساعات",
// 				workLocation:
// 					workLocations[Math.floor(Math.random() * workLocations.length)],
// 			};
// 		} else {
// 			const checkInVariation = Math.random() > 0.8 ? 1 : 0;
// 			const checkIn = `ص ${9 + checkInVariation}.${Math.floor(
// 				Math.random() * 60
// 			)
// 				.toString()
// 				.padStart(2, "0")}`;
// 			const checkOutVariation = Math.random() > 0.7 ? -1 : 0;
// 			const checkOut = `م ${6 + checkOutVariation}.${Math.floor(
// 				Math.random() * 60
// 			)
// 				.toString()
// 				.padStart(2, "0")}`;

// 			const breakVariation = Math.random() > 0.9 ? 1 : 0;
// 			const breakTime = `ساعة ${2 + breakVariation}`;

// 			// Permission time is usually 3 hours
// 			const permissionVariation = Math.random() > 0.8 ? 1 : 0; // 20% chance of longer permission
// 			const permission = `ساعة ${3 + permissionVariation}`;

// 			// Calculate hours worked (typically 4 hours)
// 			const hoursWorkedVariation = Math.floor(Math.random() * 2); // 0-1 hour variation
// 			const hoursWorked = `${4 + hoursWorkedVariation} ساعات`;

// 			return {
// 				id,
// 				date,
// 				checkIn,
// 				checkOut,
// 				breakTime,
// 				permission,
// 				hoursWorked,
// 				workLocation:
// 					workLocations[Math.floor(Math.random() * workLocations.length)],
// 			};
// 		}
// 	});
// }, []);
export function useAttendanceEmployeeData(id: string) {
	return useQuery({
		queryKey: ["attendance", id],
		queryFn: async () => {
			const { data } = await AxiosInstance.get(`attendance/${id}`);
			return data;
		},
	});
}

export function useAttendanceEmployee(id: number) {
	// const { data: attendanceData } = useAttendanceData();

	return useQuery({
		queryKey: ["attendance", id],
		queryFn: async () => {
			// In a real app, this would fetch from an API
			return [];
		},
		enabled: !!id ,
	});
}

export function useCreateAttendanceEmployee() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (AttendanceEmployee: Omit<AttendanceEmployee, "id">) => {
			const { data } = await axios.post(
				"/api/AttendanceEmployees",
				AttendanceEmployee
			);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["AttendanceEmployees"] });
		},
	});
}

export function useUpdateAttendanceEmployee() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			id,
			AttendanceEmployee,
		}: {
			id: number;
			AttendanceEmployee: Partial<AttendanceEmployee>;
		}) => {
			const { data } = await axios.put(
				`/api/AttendanceEmployees/${id}`,
				AttendanceEmployee
			);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["AttendanceEmployees"] });
		},
	});
}
