import { AxiosInstance } from "@/lib/AxiosConfig";
import { useQuery } from "@tanstack/react-query";

export function useProductMetaData() {
	return useQuery<any[]>({
		queryKey: ["productMeta"],
		queryFn: async () => {
			// const { data } = await AxiosInstance.get("product_meta");
            return []
			// return data.data.map((item: any) => ({
			// 	productCode: item.code,
			// 	productCategory: item.category,
			// 	productName: item.name,
			// 	requiredQuantity: item.required_quantity,
			// 	measureUnitId: item.measure_unit_id,
			// }));
		},
		staleTime: 5 * 60 * 1000,
	});
}
