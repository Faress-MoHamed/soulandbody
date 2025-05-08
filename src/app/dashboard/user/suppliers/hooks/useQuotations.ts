"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useDeleteQuotations() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id }: { id: number; }) => {
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

export function useQuotationDetails(QuotaionId: number) {
	return useQuery({
		queryKey: ["invoice-details", QuotaionId],
		queryFn: async () => {
			const response = await fetch(`http://192.168.1.15:8008/api/quotation/${QuotaionId}/items`, {
				headers: {
					Authorization: "Bearer 34|BlAVimHB5xXY30NJyWsifXHBid3mHuCTo75PMDBB704258d9",
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error("فشل في جلب تفاصيل الفاتورة");
			}

			const data = await response.json();

		

			return data; // أو data.items.map() لو عايز تعدل الشكل
		},
		enabled: !!QuotaionId, // لتفادي الاستدعاء قبل وصول الـ ID
	});
}
