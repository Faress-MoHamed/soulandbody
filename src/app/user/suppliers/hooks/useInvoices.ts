"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useDeleteQuotations() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id }: { id: number;  }) => {
			const res = await fetch(`http://192.168.1.15:8008/api/quotations/${id}`, {
				method: "DELETE", // Laravel يتعامل مع POST في حالة الـ update أحيانًا بدلاً من PUT
				headers: {
					Authorization: "Bearer 34|BlAVimHB5xXY30NJyWsifXHBid3mHuCTo75PMDBB704258d9",
				},
			});

			if (!res.ok) {
				throw new Error("فشل في التعديل");
			}

			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["type"] });
		},
	});
}

export type InvoiceType = {
	invoiceNumber: string;
	date: string;
	totalAmount: number;
	remainingAmount: number;
};
type ApiInvoiceType = {
	id: number;
	invoice_no: string;
	date: string;
	total_amount: string; // لأنه جاي كـ string
	outstanding: number;
	items: any[]; // لو هتستخدمها بعدين
};


export function useInvoices() {
	return useQuery<InvoiceType[]>({
		queryKey: ["invoices"],
		queryFn: async () => {
			const response = await fetch("http://192.168.1.15:8008/api/invoices", {
				headers: {
					Authorization: "Bearer 34|BlAVimHB5xXY30NJyWsifXHBid3mHuCTo75PMDBB704258d9",
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error("فشل في جلب الفواتير");
			}

			const apiData: ApiInvoiceType[] = await response.json();

			return apiData.map(item => ({
				invoiceNumber: item.invoice_no,
				date: formatDate(item.date),
				totalAmount: Number(item.total_amount),
				remainingAmount: Number(item.outstanding),
			  }));
			  
		},
		staleTime: 5 * 60 * 1000, // البيانات تصبح قديمة بعد 5 دقائق
		retry: 2, // عدد المحاولات عند الفشل
	});
}

// دالة مساعدة لتنسيق التاريخ (اختياري)
function formatDate(dateString: string): string {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	};
	return new Date(dateString).toLocaleDateString('ar-EG', options);
}