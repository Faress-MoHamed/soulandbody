import { AxiosInstance } from "@/lib/AxiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
export type AddSuppliersType = {
	deleted_at: null;
	types: any;
    id: number;
    type: string;
}
export function useTypes() {
    return useQuery<AddSuppliersType[]>({
        queryKey: ["type"],
        queryFn: async () => {
            const {data} = await AxiosInstance.get("supplier-types");


            // نرجّع فقط الأنواع اللي مش متشالة (deleted_at === null)
            return data;
        },
		
    });
}

export function useAddSupplierType() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (formData: any) => {
			const res = await AxiosInstance.post("supplier-types",formData);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["type"] });
		},
	});
}

export function useUpdateSupplierType() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, formData }: { id: number; formData: any }) => {
			 await AxiosInstance.post(`supplier-types/${id}`,formData);

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
			const res = await AxiosInstance.delete(`supplier-types/${id}`);

			
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["type"] });
		},
	});
}