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
