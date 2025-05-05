import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddSupplierType() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (formData: FormData) => {
			const res = await fetch("http://192.168.1.15:8008/api/supplier-types", {
				method: "POST",
				headers: {
					Authorization: "Bearer 34|BlAVimHB5xXY30NJyWsifXHBid3mHuCTo75PMDBB704258d9",
				},
				body: formData, // إرسال الفورم داتا هنا
			});

			if (!res.ok) {
				throw new Error("فشل في الإضافة");
			}

			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["type"] });
		},
	});
}

export function useUpdateSupplierType() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, formData }: { id: number; formData: FormData }) => {
			const res = await fetch(`http://192.168.1.15:8008/api/supplier-types/${id}`, {
				method: "POST", 
				headers: {
					Authorization: "Bearer 34|BlAVimHB5xXY30NJyWsifXHBid3mHuCTo75PMDBB704258d9",
				},
				body: formData,
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

export function useDeleteSupplierType() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id }: { id: number;  }) => {
			const res = await fetch(`http://192.168.1.15:8008/api/supplier-types/${id}`, {
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