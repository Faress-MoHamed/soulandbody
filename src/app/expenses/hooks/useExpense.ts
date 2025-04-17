"use client";

import { useQuery } from "@tanstack/react-query";

export type Expense = {
	code: string; // Expense Code - كود المصروف
	name: string; // Expense Name - اسم المصروف
	total: string; // Total - الإجمالي
};

// Function to generate dummy data
const generateExpenses = (count: number): Expense[] => {
	const names = ["مصروفات مواصلات", "مصروفات مكتبية", "مصروفات تسويق"];
	const codes = ["451", "452", "453"];
	const totals = ["3560", "2000", "1500"];

	return Array.from({ length: count }, () => {
		const index = Math.floor(Math.random() * names.length);
		return {
			code: codes[index],
			name: names[index],
			total: totals[index],
		};
	});
};

const allExpenses = generateExpenses(50); // Generate 50 fake expenses

export function useExpenses() {
	return useQuery({
		queryKey: ["Expenses"],
		queryFn: async () => {
			// Simulate an API call
			// const { data } = await axios.get("/api/expenses");
			return allExpenses;
		},
	});
}
