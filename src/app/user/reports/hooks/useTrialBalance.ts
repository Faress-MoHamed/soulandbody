"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export type TrialBalanceRecord = {
	date: string; // "07/12/2025"
	accountName: string; // "أصول"
	debit1: number; // 200
	credit1: number; // 400
	debit2: number; // 300
	credit2: number; // 85
	debit3: number; // 512
	credit3: number; // 124
};

// Function to generate random data based on the image
const generateTrialBalanceRecords = (count: number) => {
	const records = [];

	for (let i = 0; i < count; i++) {
		records.push({
			date: "07/12/2025",
			accountName: "أصول",
			debit1: 200,
			credit1: 400,
			debit2: 300,
			credit2: 85,
			debit3: 512,
			credit3: 124,
		});
	}

	return records;
};

const allData = generateTrialBalanceRecords(100); // Generate 100 rows with the same data as in the image

export function useTrialBalance() {
	return useQuery({
		queryKey: ["TrialBalances"],
		queryFn: async () => {
			// In a real application, you would fetch data from an API like this:
			// const { data } = await axios.get("/api/TrialBalances");
			return allData;
		},
	});
}

// Add a mutation for creating a new TrialBalance record
export function useCreateTrialBalance() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (newTrialBalance: Omit<TrialBalanceRecord, "id">) => {
			// const { data } = await axios.post("/api/TrialBalances", newTrialBalance);
			// return data;
			return { ...newTrialBalance, id: Date.now() }; // Mock implementation
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["TrialBalances"] });
		},
	});
}

// Add a mutation for updating an TrialBalance record
export function useUpdateTrialBalance() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (updatedTrialBalance: TrialBalanceRecord) => {
			// const { data } = await axios.put(`/api/TrialBalances/${updatedTrialBalance.id}`, updatedTrialBalance);
			// return data;
			return updatedTrialBalance; // Mock implementation
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["TrialBalances"] });
		},
	});
}
