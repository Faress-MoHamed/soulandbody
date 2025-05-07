"use client";

import { useQuery } from "@tanstack/react-query";

export type InvoiceType = {
	invoiceNumber: string;
	date: string;
	totalAmount: number;
	remainingAmount: number;
};

// Sample data from the image
const invoicesData: InvoiceType[] = [
	{
		invoiceNumber: "1542",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "12454",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "5482",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "1245",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "45451",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "45451",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "5145",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "9562",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "989623",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "87894",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "1542",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "12454",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "5482",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "1245",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "45451",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "45451",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "5145",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "9562",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "989623",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "87894",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "1542",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "12454",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "5482",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "1245",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "45451",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "45451",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "5145",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "9562",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "989623",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
	{
		invoiceNumber: "87894",
		date: "0105851212",
		totalAmount: 5000,
		remainingAmount: 200,
	},
];

export function useInvoices() {
	return useQuery({
		queryKey: ["invoices"],
		queryFn: async () => {
			// In a real app, this would fetch from an API
			return invoicesData;
		},
	});
}

