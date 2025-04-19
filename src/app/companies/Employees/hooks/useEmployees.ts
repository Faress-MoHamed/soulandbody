"use client";

import { useQuery } from "@tanstack/react-query";

export type EmployeesType = {
	name: string;
	phone: string;
	address: string;
	job: string;
	permissions: string;
	options: string;
};
const EmployeesData = Array.from({ length: 100 }, (_, i) => ({
	name: `الموظف رقم ${i + 1}`,
	phone: `05${Math.floor(100000000 + Math.random() * 900000000)}`,
	address: `عنوان ${i + 1}`,
	job: ["مدير", "محاسب", "مبرمج", "مسوق", "مصمم"][i % 5],
	permissions: ["عرض", "تعديل", "حذف", "إضافة"][i % 4],
	options: "خيارات",
}));

export function useEmployees() {
	return useQuery({
		queryKey: ["Employees"],
		queryFn: async () => {
			// In a real application, you would fetch from an API:
			// const { data } = await axios.get("/api/bank-accounts");
			return EmployeesData;
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
