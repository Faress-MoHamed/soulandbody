"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface Transaction {
	id: number;
	date: string;
	type: "خصم" | "مكافأة";
	amount: number;
	reason: string;
}

export function useTransactions() {
	const generateRandomDate = (start: Date, end: Date) => {
		const date = new Date(
			start.getTime() + Math.random() * (end.getTime() - start.getTime())
		);
		return date.toISOString().split("T")[0];
	};

	const reasons = [
		"تأخير ساعة",
		"يوم إضافي",
		"مكافأة أداء",
		"حافز شهري",
		"خصم إداري",
	];
	const types = ["خصم", "مكافأة"];
	const amounts = [100, 200, 300, 400, 500];
	const employees = [
		"أحمد محمود",
		"محمد علي",
		"خالد حسن",
		"ياسر عبد الله",
		"سعيد عمر",
	];
	const mockData = Array.from({ length: 150 }, (_, id) => ({
		id,
		employee: employees[Math.floor(Math.random() * employees.length)],
		date: generateRandomDate(new Date(2025, 0, 1), new Date(2025, 11, 31)),
		type: types[Math.floor(Math.random() * types.length)],
		amount: amounts[Math.floor(Math.random() * amounts.length)],
		reason: reasons[Math.floor(Math.random() * reasons.length)],
	}));

	return useQuery({
		queryKey: ["transactions"],
		queryFn: async () => {
			return mockData;
		},
	});
}

export function useTransaction(id: number) {
	return useQuery({
		queryKey: ["transaction", id],
		queryFn: async () => {
			const { data } = await axios.get(`/api/transactions/${id}`);
			return data;
		},
		enabled: !!id,
	});
}

export function useCreateTransaction() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (transaction: Omit<Transaction, "id">) => {
			const { data } = await axios.post("/api/transactions", transaction);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
		},
	});
}

export function useUpdateTransaction() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			id,
			transaction,
		}: {
			id: number;
			transaction: Partial<Transaction>;
		}) => {
			const { data } = await axios.put(`/api/transactions/${id}`, transaction);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
		},
	});
}
