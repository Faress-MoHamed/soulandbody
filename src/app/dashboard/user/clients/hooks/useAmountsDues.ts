"use client";

import { useQuery } from "@tanstack/react-query";

export type AmountsDuesType = {
	supplierName: string;
	RemainingAmount: string;
};

const generateRandomProduct = (index: number): AmountsDuesType => {
	const quantity = 30 + Math.floor(Math.random() * 5); // vary quantity
	const unitPrice = 1400 + Math.floor(Math.random() * 200); // vary price
	return {
		supplierName: `fares - ${quantity * unitPrice}`,
		RemainingAmount: `${quantity * unitPrice}`,
	};
};

const AmountsDuesTypeData: AmountsDuesType[] = Array.from(
	{ length: 100 },
	(_, i) => generateRandomProduct(i + 1)
);

export function useAmountsDues() {
	return useQuery({
		queryKey: ["AmountsDues"],
		queryFn: async () => {
			return AmountsDuesTypeData;
		},
	});
}
