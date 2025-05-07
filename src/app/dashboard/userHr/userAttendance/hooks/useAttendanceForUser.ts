"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type UserAttendance = {
	date: string; // "12/10/2025"
	arrivalTime: string; // "8:00ص"
	leaveTime: string; // "4:00م"
	execuseTotalTime: string; // "01:00"
	breakTotalTime: string; // "00:30"
	deduction: number; // "00:30"
	execuseNoteDeduction: string; // "خصم بسبب تأخير"
};

// Mock data generator
const generateUserAttendanceRecords = (count: number): UserAttendance[] => {
	const records: UserAttendance[] = [];

	for (let i = 0; i < count; i++) {
		records.push({
			date: "12/10/2025",
			arrivalTime: "8:00ص",
			leaveTime: "4:00م",
			execuseTotalTime: "01:00",
			breakTotalTime: "00:30",
			deduction: 800,
			execuseNoteDeduction: "خصم بسبب تأخير",
		});
	}

	return records;
};

const allAttendance = generateUserAttendanceRecords(50);

// Hook to fetch attendance records
export function useUserAttendance() {
	return useQuery({
		queryKey: ["userAttendance"],
		queryFn: async (): Promise<UserAttendance[]> => {
			// const { data } = await axios.get("/api/userAttendance");
			return allAttendance;
		},
	});
}
