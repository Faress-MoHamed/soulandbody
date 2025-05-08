"use client";

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
			const response = await fetch("http://192.168.1.15:8008/api/suppliers", {
				headers: {
					Authorization: "Bearer 34|BlAVimHB5xXY30NJyWsifXHBid3mHuCTo75PMDBB704258d9",
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error("فشل في جلب الموردين");
			}

			const responseData = await response.json();

			// التحقق من وجود البيانات بالهيكل الجديد
			if (!responseData.data || !Array.isArray(responseData.data)) {
				throw new Error("هيكل البيانات غير متوقع");
			}
			return responseData.data
				.filter((item: ApiSupplierType) => !item.deleted_at)
				.map((item: ApiSupplierType) => ({
					id: item.id,
					name: item.name,
					phone: item.phone,
					address: item.address,
					supplierType: item.supplier_type ?? "غير محدد",
				}));
		},
		// إعدادات إضافية لتحسين الأداء
		staleTime: 5 * 60 * 1000, // 5 دقائق قبل اعتبار البيانات قديمة
		initialData: () => {
			// يمكنك استخدام بيانات أولية من ذاكرة التخزين المؤقت إذا كانت متاحة
			return queryClient.getQueryData<SuppliersType[]>(["suppliers"]);
		},
	});
}

export const useAddSupplier = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (formData: FormData) => {
			const res = await fetch("http://192.168.1.15:8008/api/suppliers", {
				method: "POST",
				headers: {
					Authorization: "Bearer 34|BlAVimHB5xXY30NJyWsifXHBid3mHuCTo75PMDBB704258d9",
				},
				body: formData,
			});

			if (!res.ok) {
				throw new Error("فشل في الإضافة");
			}

			return res.json();
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
			const res = await fetch(`http://192.168.1.15:8008/api/suppliers/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: "Bearer 34|BlAVimHB5xXY30NJyWsifXHBid3mHuCTo75PMDBB704258d9",
				},
			});

			if (!res.ok) {
				throw new Error("فشل في الحذف");
			}

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



export function useSupplierById() {
	const queryClient = useQueryClient();

	const fetchSupplier = async (id: number) => {
		const response = await fetch(`http://192.168.1.15:8000/api/suppliers/supplier_file/${id}`, {
			headers: {
				Authorization: "Bearer 34|BlAVimHB5xXY30NJyWsifXHBid3mHuCTo75PMDBB704258d9",
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("فشل في جلب بيانات المورد");
		}

		const responseData = await response.json();

		if (!responseData.data || typeof responseData.data !== "object") {
			throw new Error("هيكل البيانات غير متوقع");
		}

		return {
			id: responseData.data.id,
			name: responseData.data.name,
			description: responseData.data.description,
			phone: responseData.data.phone,
			total_amounts: responseData.data.total_amounts ,
			address: responseData.data.address,
			invoices: responseData.data.invoices || [],
			quotations: responseData.data.quotations || [],
		};

	};

	return {
		fetchSupplier, // تقدر تناديها يدويًا لما يكون الـ ID جاهز
		queryClient,  // لو حبيت تعمل caching أو invalidate
	};
}


// type SupplierType = {
// 	id: number;
// 	name: string;
// 	phone: string;
// 	address: string;
	
//   };
  
//   export function useUpdateSupplierType() {
// 	const queryClient = useQueryClient();

// 	return useMutation({
// 		mutationFn: async ({ id }: { id: number;  }) => {
// 			const res = await fetch(`http://192.168.1.15:8008/api/suppliers/${id}`, {
// 				method: "POST", 
// 				headers: {
// 					Authorization: "Bearer 34|BlAVimHB5xXY30NJyWsifXHBid3mHuCTo75PMDBB704258d9",
// 				},
				
// 			});

// 			if (!res.ok) {
// 				throw new Error("فشل في التعديل");
// 			}

// 			return res.json();
// 		},
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ["type"] });
// 		},
// 	});
// }
