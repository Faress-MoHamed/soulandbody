"use client";

import { AxiosInstance } from "@/lib/AxiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useDeleteQuotations() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id }: { id: number; }) => {
			await AxiosInstance.delete(`quotations/${id}`);

			
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
			const {data} = await AxiosInstance.get(`api/quotation/${QuotaionId}/items`);

		

			return data; // أو data.items.map() لو عايز تعدل الشكل
		},
		enabled: !!QuotaionId, // لتفادي الاستدعاء قبل وصول الـ ID
	});
}
