"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface SalesInvoice {
	code: string;
	itemName: string;
	quantity: string;
	unit: string;
	saleUnit: string;
	total: string;
	discount: string;
	tax: string;
	totalSale: string;
}

// Function to generate random data
const generateRandomData = (count: number) => {
	const items = [];
	const itemNames = ["لاب توب", "هاتف", "شاشة", "لوحة مفاتيح", "ماوس"];
	const taxOptions = ["إضافة ضريبة", "بدون ضريبة"];

	for (let i = 0; i < count; i++) {
		items.push({
			code: Math.floor(Math.random() * 100).toString(),
			itemName: itemNames[Math.floor(Math.random() * itemNames.length)],
			quantity: (Math.floor(Math.random() * 10) + 1).toString(),
			unit: (Math.floor(Math.random() * 5) + 1).toString(),
			saleUnit: (Math.floor(Math.random() * 1000) + 100).toString(),
			total: (Math.floor(Math.random() * 5000) + 500).toString(),
			discount: Math.floor(Math.random() * 30).toString(),
			tax: "إضافة ضريبة",
			totalSale: (Math.floor(Math.random() * 4000) + 400).toString(),
		});
	}
	return items;
};

const allData = generateRandomData(100); // Generate 100 random rows
export function useSalesInvoices() {
	return useQuery({
		queryKey: ["SalesInvoices"],
		queryFn: async () => {
			// const { data } = await axios.get("/api/SalesInvoices");
			return allData;
		},
	});
}

// Fetch a single SalesInvoice record
export function useSalesInvoice(id: string) {
  type User = {
		id: string;
		customerName: string;
		customerPhone: string;
		customerAddress: string;
		customerDiscount: string;
	};

	const users: User[] = [
		{
			id: "1",
			customerName: "أحمد علي",
			customerPhone: "0551234567",
			customerAddress: "الرياض",
			customerDiscount: "tsfjdajbkvda,"
		},
		{
			id: "2",
			customerName: "سارة محمد",
			customerPhone: "0552345678",
			customerAddress: "جدة",
			customerDiscount: "10",
		},
		{
			id: "3",
			customerName: "خالد سعيد",
			customerPhone: "0553456789",
			customerAddress: "مكة",
			customerDiscount: "0,"
		},
		{
			id: "4",
			customerName: "نورة عبدالله",
			customerPhone: "0554567890",
			customerAddress: "الدمام",
			customerDiscount: "15",
		},
		{
			id: "5",
			customerName: "عبدالله فهد",
			customerPhone: "0555678901",
			customerAddress: "الخبر",
			customerDiscount: "20",
		},
		{
			id: "6",
			customerName: "ليلى حسن",
			customerPhone: "0556789012",
			customerAddress: "الطائف",
			customerDiscount: "5,"
		},
		{
			id: "7",
			customerName: "فيصل خالد",
			customerPhone: "0557890123",
			customerAddress: "أبها",
			customerDiscount: "0,"
		},
		{
			id: "8",
			customerName: "ريم يوسف",
			customerPhone: "0558901234",
			customerAddress: "نجران",
			customerDiscount: "12",
		},
		{
			id: "9",
			customerName: "ماجد ناصر",
			customerPhone: "0559012345",
			customerAddress: "جازان",
			customerDiscount: "8,"
		},
		{
			id: "10",
			customerName: "هدى صالح",
			customerPhone: "0560123456",
			customerAddress: "حائل",
			customerDiscount: "3,"
		},
	];


	return useQuery({
		queryKey: ["SalesInvoice", id],
    queryFn: async () => {
      const user = users.find((u) => u.id === id);
			return user || null;
			// const { data } = await axios.get(`/api/SalesInvoices?id=${id}`);
			// 			return data;
		},
		enabled: !!id,
	});
}

// Create a new SalesInvoice record
export function useCreateSalesInvoice() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (SalesInvoice: Omit<SalesInvoice, "id">) => {
			const { data } = await axios.post("/api/SalesInvoices", SalesInvoice);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["SalesInvoices"] });
		},
	});
}

// Update a SalesInvoice record
export function useUpdateSalesInvoice() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			id,
			SalesInvoice,
		}: {
			id: number;
			SalesInvoice: Partial<SalesInvoice>;
		}) => {
			const { data } = await axios.put(`/api/SalesInvoices`, {
				id,
				...SalesInvoice,
			});
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["SalesInvoices"] });
		},
	});
}
