"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { VacationBalanceEntry } from "../vacationsList.type";
import { AxiosInstance } from "@/lib/AxiosConfig";

export const vacationBalanceData: VacationBalanceEntry[] = [
	{ vacationType: "مرضية", totalDays: 15, remaining: 0 },
	{ vacationType: "عرضة", totalDays: 6, remaining: 6 },
	{ vacationType: "سنوية", totalDays: 14, remaining: 10 },
	{ vacationType: "أمومة", totalDays: 12, remaining: 9 },
];

export function useUserVacationsList() {
  return useQuery({
		queryKey: ["UserVacationsList"],
		queryFn: async () => {
			const { data } = await AxiosInstance.get("employee_vacations");
			return data;
		},
	});
}
