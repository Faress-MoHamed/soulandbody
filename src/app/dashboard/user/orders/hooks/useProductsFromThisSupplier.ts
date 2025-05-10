import { AxiosInstance } from "@/lib/AxiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useProductsFromThisSupplier(id?: string) {
	return useQuery({
		queryKey: ["products"],
		queryFn: async () => {
      // قم بكتابة منطق الحصول على البيانات هنا
      const { data } = await AxiosInstance.get(`quotation/${id}/items`);
      return data;

		},
		enabled: !!id, // تعطيل الاستعلام إذا لم يتم تمرير id

	});
}
export function useOrderProductFromSupplier() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({ qutation_id, item_id }: { qutation_id: any; item_id: any }) => {
			const { data } = await AxiosInstance.post(
				`quotations/request-supplier-qutation/qutation_id=${qutation_id}/item_id=${item_id}`,
				
{status:"requested"}				
			);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			// toast.success("vacations status changed successfully");
		},
		onError: (error: any, variables, context) => {

		},
		
	});
}
