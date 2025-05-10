import { AxiosInstance } from "@/lib/AxiosConfig";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export type SupplierType = {
	code: string;
	name: string;
	date: string;
};


// export function useQutationFromEachSupplier() {
// 	return useQuery({
// 		queryKey: ["suppliers"],
// 		queryFn: async (id:string) => {
//     },
// 	});
// }
export function useQuotationFromEachSupplier(id?: string) {
  return useQuery({
    queryKey:["suppliers", id], // queryKey
   queryFn: async () => {
      // قم بكتابة منطق الحصول على البيانات هنا
      const { data } = await AxiosInstance.get(`suppliers_qutations/${id}`);
      return data;

    },
    enabled: !!id, // تعطيل الاستعلام إذا لم يتم تمرير id
}
  );
}

