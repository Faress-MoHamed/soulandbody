import { AxiosInstance } from "@/lib/AxiosConfig";
import { useQuery } from "@tanstack/react-query";
export type InvoiceItem = {
	id: number;
	invoice_id: number;
	product_id: number;
	qty: number;
	discount: string;
	tax: string;
	unit_price: string;
	product_code: string;
	product_name: string;
	description: string;
	purchase_price: string;
	sale_price: string;
	measure_unit: string;
	category_name: string;
	total: number;
	total_price: number;
  };
  
  export type InvoiceDetailsResponseType = {
	total_amount: string;
	total_discount: string;
	total_invoice_amount: number;
	sales_tax: string;
	income_tax: string;
	net_invoice: number;
	items: InvoiceItem[];
  };
  
export function useInvoiceDetails(invoiceId: number) {
	return useQuery({
		queryKey: ["invoice-details", invoiceId],
		queryFn: async () => {
			const {data} = await AxiosInstance.get(`invoices/${invoiceId}`);


		

			return data; // أو data.items.map() لو عايز تعدل الشكل
		},
		enabled: !!invoiceId, // لتفادي الاستدعاء قبل وصول الـ ID
	});
}
