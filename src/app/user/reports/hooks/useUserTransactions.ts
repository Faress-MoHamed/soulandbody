"use client";

import { useQuery } from "@tanstack/react-query";

export type UserTransaction = {
	date: string;
	transactionId: string;
	description: string;
	debit: string;
	credit: string;
	balance: string;
	username: string;
	notes: string;
};

const generateUserTransactions = (count: number): UserTransaction[] => {
	return Array.from({ length: count }, () => ({
		date: "07/12/2025",
		transactionId: "4521",
		description: "شيكات وارده(ندى هاني)",
		debit: "400",
		credit: "300",
		balance: "1254",
		username: "أحمد إبراهيم",
		notes: "تمت ف اليوم",
	}));
};

const allUserTransactions = generateUserTransactions(20);

export function useUserTransactions() {
	return useQuery({
		queryKey: ["UserTransactions"],
		queryFn: async () => {
			// const { data } = await axios.get("/api/user-transactions");
			return allUserTransactions;
		},
	});
}
