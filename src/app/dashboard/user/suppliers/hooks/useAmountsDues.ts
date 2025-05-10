import { AxiosInstance } from "@/lib/AxiosConfig";
import { useQuery } from "@tanstack/react-query";

export type AmountsDuesType = {
	id: number; // يجب إضافة هذا الحقل حسب البيانات الواردة
	name: string;
	total_outstanding: number;
};
export function useAmountsDues() {
	return useQuery<AmountsDuesType[]>({
		queryKey: ["amountsDues"],
		queryFn: async () => {
			const {data} = await AxiosInstance.get("total_outstanding", );

			// إرجاع البيانات بعد التحويل للشكل المطلوب
			return data.data.map((item: { id: any; name: any; total_outstanding: any; }) => ({
				id: item.id,
				name: item.name,
				total_outstanding: item.total_outstanding
			}));
		},
		staleTime: 5 * 60 * 1000, // 5 دقائق قبل اعتبار البيانات قديمة
	});
}