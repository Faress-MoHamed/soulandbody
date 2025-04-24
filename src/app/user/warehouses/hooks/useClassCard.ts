"use client";
import { useQuery } from "@tanstack/react-query";

import { ColumnDef } from "@tanstack/react-table";

export type ClassCardType = {
	date: string; // تاريخ
	code: number; // كود الصنف
	incoming: number; // وارد
	outgoing: number; // صرف
	balance: number; // رصيد
	description: string; // بيان
};

// Function to generate varied product inventory data
export function generateClassCardData(count: number = 10): ClassCardType[] {
	return Array.from({ length: count }, () => {
		return {
			date: "14/10/2024",
			code: 452,
			incoming: 458,
			outgoing: 45,
			balance: 411,
			description: "اسم",
		};
	});
}

const initialClassCardData: ClassCardType[] = generateClassCardData(10);

export function useClassCardData() {
	return useQuery({
		queryKey: ["ClassCard"],
		queryFn: async () => {
			// Simulate network delay
			await new Promise((res) => setTimeout(res, 300));
			return initialClassCardData;
		},
	});
}


