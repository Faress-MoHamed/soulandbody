"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type {
	VacationBalance,
	VacationType,
	WorkRecord,
} from "../vacations.type";
import toast from "react-hot-toast";
import { AxiosInstance } from "@/lib/AxiosConfig";
import { useRouter } from "next/navigation";

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

export function useReqUserVacations() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (vacationReq: any) => {
			// Send the request with proper headers
			const { data } = await AxiosInstance.post(
				"vacation-requests/request_vacation",
				vacationReq
			);

			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["Vacations"] });
			toast.success("vacationReq succesfully successfully");
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