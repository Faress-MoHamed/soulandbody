"use client";

import { useQuery } from "@tanstack/react-query";

export type AmountsDuesType = {
	id: number; // يجب إضافة هذا الحقل حسب البيانات الواردة
	name: string;
	total_outstanding: number;
};

export function useAmountsDues() {
	return useQuery<AmountsDuesType[]>({
		queryKey: ["amountsDues"],
		queryFn: async () => {
			const response = await fetch("http://192.168.1.15:8008/api/total_outstanding", {
				headers: {
					Authorization: "Bearer 34|BlAVimHB5xXY30NJyWsifXHBid3mHuCTo75PMDBB704258d9",
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				throw new Error("فشل في جلب المبالغ المستحقة");
			}

			const responseData = await response.json();

			if (!responseData.data || !Array.isArray(responseData.data)) {
				throw new Error("هيكل البيانات غير متوقع");
			}

			// إرجاع البيانات بعد التحويل للشكل المطلوب
			return responseData.data.map((item: { id: any; name: any; total_outstanding: any; }) => ({
				id: item.id,
				name: item.name,
				total_outstanding: item.total_outstanding
			}));
		},
		staleTime: 5 * 60 * 1000, // 5 دقائق قبل اعتبار البيانات قديمة
	});
}