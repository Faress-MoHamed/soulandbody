"use client";

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
	const getRandomDate = (start: Date, end: Date) => {
		const date = new Date(
			start.getTime() + Math.random() * (end.getTime() - start.getTime())
		);
		return date.toISOString().split("T")[0];
	};

	const employees = [
		"أحمد محمود",
		"محمد علي",
		"خالد حسن",
		"ياسر عبد الله",
		"سعيد عمر",
	];
	const checkInTimes = ["7:00 ص", "7:30 ص", "8:00 ص", "9:00 ص"];
	const checkOutTimes = ["3:00 م", "4:00 م", "5:00 م", "6:00 م", "7:00 م"];
	const notes = ["استئذان تأخير", "منتج", "ميعاد طبي", "بدون ملاحظات"];
	const deductions = ["50", "100", "150", "200"];

	const attendanceData = Array.from({ length: 150 }, () => ({
		date: getRandomDate(new Date(2025, 8, 1), new Date(2025, 11, 1)),
		employee: employees[Math.floor(Math.random() * employees.length)],
		check_in: checkInTimes[Math.floor(Math.random() * checkInTimes.length)],
		check_out: checkOutTimes[Math.floor(Math.random() * checkOutTimes.length)],
		notes: notes[Math.floor(Math.random() * notes.length)],
		deduction: deductions[Math.floor(Math.random() * deductions.length)],
	}));

	console.log(attendanceData);

	return useQuery({
		queryKey: ["attendance"],
		queryFn: async () => {
			// const { data } = await axios.get("/api/attendance");
			return attendanceData;
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
