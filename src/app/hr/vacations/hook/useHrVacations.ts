"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
export type VacationRecord = {
	id: number;
	date: string; // Format: DD/MM/YYYY
	employee: string;
	leaveStart: string; // Format: DD/MM/YYYY
	leaveEnd: string; // Format: DD/MM/YYYY
	leaveDays: number;
	leaveType: string;
	deduction: number;
	attachmentLink: string | null; // ملحقات: optional link
};

// Function to generate random data
const getRandomDate = (start: any, end: any) => {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toISOString().split("T")[0].split("-").reverse().join("/"); // Format: DD/MM/YYYY
};
export const employees = [
  "أحمد محمود",
  "محمد علي",
  "خالد حسن",
  "ياسر عبد الله",
  "سعيد عمر",
];
export const leaveTypes = ["عادية", "مرضية", "طارئة"];
const deductions = [100, 120, 150, 200];

const data = Array.from({ length: 100 }, (_, index) => {
	const leaveStart = getRandomDate(
		new Date(2025, 9, 10),
		new Date(2025, 11, 20)
	);
	const leaveEnd = getRandomDate(new Date(2025, 9, 11), new Date(2025, 11, 25));

	const hasAttachment = Math.random() < 0.5; // 50% chance to have ملحقات
	const attachmentLink = hasAttachment
		? `https://example.com/attachments/file-${index + 1}.pdf`
		: null;

	return {
		id: index + 1,
		date: getRandomDate(new Date(2025, 8, 1), new Date(2025, 11, 1)),
		employee: employees[Math.floor(Math.random() * employees.length)],
		leaveStart,
		leaveEnd,
		leaveDays: Math.max(1, Math.floor(Math.random() * 5)),
		leaveType: leaveTypes[Math.floor(Math.random() * leaveTypes.length)],
		deduction: deductions[Math.floor(Math.random() * deductions.length)],
		attachmentLink, // This is the new field for ملحقات
	};
});

export function useHrVacations() {
	return useQuery({
		queryKey: ["HrVacations"],
		queryFn: async () => {
			// const { data } = await axios.get("/api/Executions");
			return data;
		},
	});
}
