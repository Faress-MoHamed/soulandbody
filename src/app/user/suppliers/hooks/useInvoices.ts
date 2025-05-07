import { useQuery } from "@tanstack/react-query";

export type invoicesTypeDet = {
	tax: string;
	id: number;
	supplier_id: number;
	invoice_no: string;
	date: string;
	amount: string;           // لاحظ إنها string وليست number
	discount: string;
	total_amount: string;
	paid: string;
	sales_tax_id: number;
	income_tax_id: number;
	outstanding: number;
};

export function useInvoiceDetails(invoiceId: number) {
	return useQuery({
		queryKey: ["invoice-details", invoiceId],
		queryFn: async () => {
			const response = await fetch(`http://192.168.1.15:8008/api/invoices/${invoiceId}`, {
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
		enabled: !!invoiceId, // لتفادي الاستدعاء قبل وصول الـ ID
	});
}
