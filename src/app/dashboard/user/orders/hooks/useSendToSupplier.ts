import { AxiosInstance } from "@/lib/AxiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateOrderToSupplier() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({ dataTosend }: { dataTosend: any }) => {
			const { data } = await AxiosInstance.post(
				`admin-purchase-requests`,
				
                dataTosend,
				
			);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["HrVacations"] });
			toast.success("vacations status changed successfully");
		},
		onError: (error: any, variables, context) => {
			// Check if the error response has a 'data' field with a 'message' or validation errors
			const errorMessages = error?.response?.data?.message;

			if (errorMessages && typeof errorMessages === "object") {
				// Loop through the error object and show individual toasts for each field
				Object.keys(errorMessages).forEach((field) => {
					const messages = errorMessages[field];
					messages.forEach((message: any) => {
						toast.error(`${message}`); // Show toast for each error message
					});
				});
			} else {
				// If there are no field errors, just show a generic error message
				toast.error("An error occurred. Please try again.");
			}
		},
	});
}


export function useSupplierType() {
	return useQuery({
		queryKey: ["supplierType"],
		queryFn:  async() => {
			const {data}=await AxiosInstance.get(`supplier-types`);
			return data
		},
	});
}
export function useSupplier() {
	return useQuery({
		queryKey: ["supplier"],
		queryFn:  async() => {
			const {data}=await AxiosInstance.get(`suppliers`);
			return data
		},
	});
}