import { AxiosInstance } from "@/lib/AxiosConfig";
import { useQuery } from "@tanstack/react-query";

export function useFacilities() {
	return useQuery({
		queryKey: ["InventoryProductsData"],
		queryFn: async () => {
			// Simulate delay
			const {data} = await AxiosInstance.get("facilities");
			return data;
		},
	});
}