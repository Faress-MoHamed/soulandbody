"use client";

import { useQuery } from "@tanstack/react-query";

export type EmployeesInvoicesType = {
	employees: string;
	units: string;
	totalOfUnit: string;
	totalUnits: number;
};

const generateRandomEmployeeData = (count: number) => {
	const items = [];
	const itemNames = ["فارس", "محمد", "احمد", "علي"];

	for (let i = 0; i < count; i++) {
		items.push({
			employees: itemNames[Math.floor(Math.random() * itemNames.length)],
			units: (Math.floor(Math.random() * 10) + 1).toString(),
			// totalOfUnit: (Math.floor(Math.random() * 5) + 1).toString(),
			totalUnits: (Math.floor(Math.random() * 1000) + 100).toString(),
		});
	}
	return items;
};
const data = generateRandomEmployeeData(100);

export function useEmployeesInvoices() {
	return useQuery({
		queryKey: ["employeesInvoices"],
		queryFn: async () => {
			// In a real application, you would fetch from an API:
			// const { data } = await axios.get("/api/bank-accounts");
			return data;
		},
	});
}

// Column definitions for React Table
export const bankAccountColumns = [
	{
		accessorKey: "bankName",
		header: "اسم البنك",
	},
	{
		accessorKey: "branch",
		header: "الفرع",
	},
	{
		accessorKey: "accountNumber",
		header: "رقم الحساب",
	},
	{
		accessorKey: "balance",
		header: "رصيد",
	},
];
