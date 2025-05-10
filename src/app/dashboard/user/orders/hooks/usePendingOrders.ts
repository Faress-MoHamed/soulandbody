import { AxiosInstance } from "@/lib/AxiosConfig";
import { useQuery } from "@tanstack/react-query";

export function usependingOrders() {
	return useQuery({
		queryKey: ["pendingOrders"],
		queryFn: async () => {
			const { data } = await AxiosInstance.get("pending_purchase_requests");
			return data;
		},
	});
}