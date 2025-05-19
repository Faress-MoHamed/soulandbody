import { AxiosInstance } from "@/lib/AxiosConfig";
import { useQuery } from "@tanstack/react-query";

export function useWareHouseType() {
  return useQuery({
    queryKey: ["warehousestype"],
    queryFn: async () => {
      // Simulate network delay
      const { data } = await AxiosInstance.get("store-types");
      return data;
    },
  });
}
