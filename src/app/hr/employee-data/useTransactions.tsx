"use client";

import { AxiosInstance } from "@/lib/AxiosConfig";
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
	return useQuery({
		queryKey: ["transactions"],
		queryFn: async () => {
			const { data } = await AxiosInstance.get(`financial-transactions`);
			return data;
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
