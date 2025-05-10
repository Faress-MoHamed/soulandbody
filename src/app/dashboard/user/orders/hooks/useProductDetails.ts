"use client";

import { AxiosInstance } from "@/lib/AxiosConfig";
import { useQuery } from "@tanstack/react-query";



export function useProductDetails(id:string) {
	return useQuery({
		queryKey: ["productDetails"],

		queryFn: async () => {
			const { data } = await AxiosInstance.get(`admin-purchase-requests/${id}`);
			return data;
		},
	});
}
