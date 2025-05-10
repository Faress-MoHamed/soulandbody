import { AxiosInstance } from "@/lib/AxiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// نوع الفاتورة
export interface Invoice {
	invoice_no: string;
	date: string;
	total_amount: string;
	outstanding_amount: string;
}

// نوع العميل
export interface Customer {
	id: number;
	name: string;
	phone: string;
	address: string;
	updated_at: string;
	sell_invoices: Invoice[];
}

export type CustomerType = {
	id: number;
	name: string;
	phone: string;
	address: string;
	invoice_no: string;
	outstanding_amount: string;
};

export function useCustomers() {
	return useQuery<Customer[]>({
		queryKey: ["customers"], // خليه بصيغة جمع للتفريق بينه وبين "customer"
		queryFn: async () => {
			const { data } = await AxiosInstance.get("clients");
			return data; // من المفترض أن البيانات هنا هي مصفوفة من العملاء
		},
	});
}
export const fetchCustomerById = async (id: number): Promise<Customer> => {
	const { data } = await AxiosInstance.get<Customer>(`clients/${id}`);
	return data; // ترجع العميل كامل بكل بياناته والفواتير
};
export const deleteCustomerById = async (id: number) => {
	const { data } = await AxiosInstance.delete<Customer>(`clients/${id}`);
	return data;
};




export function useAddCustomer() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (newCustomer: CustomerType) => { // تأكد من أن البيانات التي يتم إرسالها هي من نوع CustomerType
			const { data } = await AxiosInstance.post("clients", newCustomer);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["customers"] });
		},
	});
}
