"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type {
	VacationBalance,
	VacationType,
	WorkRecord,
} from "../vacations.type";

const vacationTypes: VacationType[] = ["مرضية", "سنوية", "عارضة"];
const balanceOptions: VacationBalance[] = [
	"داخل رصيد الإجازات",
	"خارج رصيد الإجازات",
];
const statuses: Array<"pending" | "accepted" | "done" | "denied"> = [
	"pending",
	"accepted",
	"done",
	"denied",
];
const generateWorkRecords = (count: number): WorkRecord[] => {
	const records: WorkRecord[] = [];

	for (let i = 0; i < count; i++) {
		const hasVacation = Math.random() > 0.2;
		const vacationType = hasVacation
			? vacationTypes[Math.floor(Math.random() * vacationTypes.length)]
			: undefined;

		const balanceType = hasVacation
			? balanceOptions[Math.floor(Math.random() * balanceOptions.length)]
			: undefined;

		records.push({
			date: "12/10/2025",
			from: "6:00م",
			to: "7:00م",
			vacationType,
			balanceType,
			reason: "معاد طبي",
			deduction: "120",
			status: statuses[Math.floor(Math.random() * statuses.length)],
		});
	}

	return records;
};
const allData = generateWorkRecords(100);
export function useUserVacations() {
	return useQuery({
		queryKey: ["Vacations"],
		queryFn: async () => {
			// const { data } = await axios.get("/api/Vacations");
			return allData;
		},
	});
}
