"use client";

import { useQuery } from "@tanstack/react-query";

// 1. تحديد نوع البيانات الجديد (بدلاً من OfferType)
export type QuotationType = {
	id: number;
	description: string;
	date: string;
	price: number;
	supplierName: string;
	// ... أية حقول إضافية ترجعها API
};

export function useOffers() {
	return useQuery<QuotationType[]>({
		queryKey: ["quotations"],
		queryFn: async () => {
			// 2. استبدال البيانات الثابتة بطلب API
			const response = await fetch("http://192.168.1.15:8008/api/quotations", {
				headers: {
					Authorization: "Bearer 34|BlAVimHB5xXY30NJyWsifXHBid3mHuCTo75PMDBB704258d9",
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error("فشل في جلب عروض الأسعار");
			}

			const data = await response.json();
			console.log(data)

			return data;
		},
	});
}
