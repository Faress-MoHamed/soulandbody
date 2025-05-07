"use client";

import { useQuery } from "@tanstack/react-query";

export type CustomerType = {
	name: string;
	phone: string;
	address: string;
};

// The data from the image shows multiple entries for Ahmed Hussein with the same details
const customersData: CustomerType[] = Array(100).fill({
	name: "أحمد حسين",
	phone: "0105581212",
	address: "جهاز الموبايل",
});

export function useCustomers() {
	return useQuery({
		queryKey: ["customers"],
		queryFn: async () => {
			// In a real app, this would fetch from an API
			// This is simulating that with the static data
			return customersData;
		},
	});
}

