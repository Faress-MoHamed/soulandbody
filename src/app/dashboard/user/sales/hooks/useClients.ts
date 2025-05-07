"use client";

import { useQuery } from "@tanstack/react-query";

export type ClientType = {
	name: string;
	phone: string;
	address: string;
};

const clientsData: ClientType[] = Array.from({ length: 100 }, () => ({
	name: "أحمد ابراهيم",
	phone: "0101011515",
	address: "تيستتيستتيست",
}));

export function useClients() {
	return useQuery({
		queryKey: ["clients"],
		queryFn: async () => {
			// Simulate fetch delay
			// await new Promise((res) => setTimeout(res, 300));
			return clientsData;
		},
	});
}
