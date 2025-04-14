"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export type ExecuseRecord = {
	date: string; // "12/10/2025"
	from: string; // "6:00م"
	to: string; // "7:00م"
	actualEnd: string; // "8:00" or "-"
	reason: string; // e.g. "مصاد طبي"
	deduction: string; // e.g. "120"
	status: "pending" | "accepted" | "done" | "denied"; // "مقبول", "تحت", "مرفوض", "في انتظار الرد"
};

// Function to generate random data
const generateExecusesRecords = (count: number) => {
const statuses: Array<"pending" | "accepted" | "done" | "denied"> = [
	"pending",
	"accepted",
	"done",
	"denied",
];
	const reasons = ["مرضى", "إجازة", "معاد طبي", "ظرف طارئ"];

	const records = [];

	for (let i = 0; i < count; i++) {
		const status = statuses[Math.floor(Math.random() * statuses.length)];
		const actualEnd = Math.random() > 0.5 ? "8:00" : "-";

		records.push({
			date: "12/10/2025",
			from: "6:00م",
			to: "7:00م",
			actualEnd,
			reason: "معاد طبي",
			deduction: "120",
			status,
		});
	}

	return records;
};

const allData = generateExecusesRecords(100); // Generate 100 random rows
export function useBreakTime() {
	return useQuery({
		queryKey: ["BreakTime"],
		queryFn: async () => {
			// const { data } = await axios.get("/api/BreakTime");
			return allData;
		},
	});
}
