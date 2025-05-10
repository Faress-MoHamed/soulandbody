"use client";

import { AxiosInstance } from "@/lib/AxiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type SuppliersType = {
	id: number;
	name: string;
	phone: string;
	address: string;
	supplierType: string | null;
};

type ApiSupplierType = {
	id: number;
	name: string;
	phone: string;
	address: string;
	supplier_type: string | null;
	supplier_type_id: number;
	deleted_at: string | null;
};

export function useSuppliers() {
	const queryClient = useQueryClient();

	return useQuery<SuppliersType[]>({
		queryKey: ["suppliers"],
		queryFn: async () => {
			const {data} = await AxiosInstance.get("suppliers");

			

			// التحقق من وجود البيانات بالهيكل الجديد
			if (!data.data || !Array.isArray(data.data)) {
				throw new Error("هيكل البيانات غير متوقع");
			}
			return data.data
				.filter((item: ApiSupplierType) => !item.deleted_at)
				.map((item: ApiSupplierType) => ({
					id: item.id,
					name: item.name,
					phone: item.phone,
					address: item.address,
					supplierType: item.supplier_type ?? "غير محدد",
				}));
		},
		initialData: () => {
			// يمكنك استخدام بيانات أولية من ذاكرة التخزين المؤقت إذا كانت متاحة
			return queryClient.getQueryData<SuppliersType[]>(["suppliers"]);
		},
	});
}

export const useAddSupplier = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (formData: any) => {
			const {data} = await AxiosInstance.post("suppliers",{
			formData,
			});

			return data;
		},
		onSuccess: (newSupplier) => {
			// تحديث البيانات المحلية بدون الحاجة لإعادة جلبها من الخادم
			queryClient.setQueryData<SuppliersType[]>(["suppliers"], (oldData = []) => [
				...oldData,
				{
					id: newSupplier.id,
					name: newSupplier.name,
					phone: newSupplier.phone,
					address: newSupplier.address,
					supplierType: newSupplier.supplier_type ?? "غير محدد",
				},
			]);

			// أو يمكنك استخدام:
			// queryClient.invalidateQueries({ queryKey: ["suppliers"] });
		},
		onError: (error) => {
			console.error("Error adding supplier:", error);
		},
	});
};

export function useDeleteSupplier() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id }: { id: number }) => {
			await AxiosInstance.delete(`suppliers/${id}`, );

	

			return { id }; // نعيد الـ id لاستخدامه في onSuccess
		},
		onSuccess: ({ id }) => {
			// تحديث البيانات المحلية مباشرة
			queryClient.setQueryData<SuppliersType[]>(["suppliers"], (oldData = []) =>
				oldData.filter((supplier) => supplier.id !== id)
			);

			// أو يمكنك استخدام:
			// queryClient.invalidateQueries({ queryKey: ["suppliers"] });
		},
		onError: (error) => {
			console.error("Error deleting supplier:", error);
		},
	});
}
export type SupplierDetailsType = {
	id: number | null;
	name: string;
	phone: string;
	address: string;
	invoices: invoicesTypee[];
	quotations: QuotationTypee[];
	supplier_type?: string | null;
	total_outstanding: number;
	total_amounts:number
};


export type QuotationTypee = {
	id: number;
	supplier_id: number;
	purchase_request_id: number | null;
	quotation_no: string;
	date: string;
	total_amount: number;
	total_amounts: number;
	description: string | null;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
};
export type invoicesTypee = {
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


export function useUpdateSupplierDet() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, formData }: { id: number; formData: FormData }) => {
			const res = await AxiosInstance.post(`suppliers/${id}`, {
				 formData,
			});

		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["suppliers"] });
		},
	});
}


export function useSupplierById(id: string | null) {
	return useQuery<SupplierDetailsType>({
		queryKey: ["supplier", id],
		enabled: !!id, // يمنع تشغيل الاستعلام إذا كان id = null
		queryFn: async () => {
			const { data } = await AxiosInstance.get(`/suppliers/supplier_file/${id}`);



			return {
				id: data.data.id,
				name: data.data.name,
				description: data.data.description,
				phone: data.data.phone,
				address: data.data.address,
				total_amounts: data.data.total_amounts,
				invoices: data.data.invoices || [],
				quotations: data.data.quotations || [],
				total_outstanding: data.data.total_outstanding || 0,
			};
		},
		staleTime: 5 * 60 * 1000, // 5 دقائق
	});
}



