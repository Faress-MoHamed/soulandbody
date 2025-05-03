import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export type SupplierType = {
	code: string;
	name: string;
	date: string;
};


const suppliers =() => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return Array.from({ length: 100 }, (_, i) => ({
    code: `SUP-${String(i + 1).padStart(3, "0")}`,
    name: `مورد ${i + 1}`,
    date: formatter.format(new Date(now.getTime() - i * 86400000)), // Subtract i days
  }));
};

const data = suppliers();
export function useSuppliers() {
	return useQuery({
		queryKey: ["suppliers"],
		queryFn: async () => {
			// Simulate delay if needed
			// await new Promise((res) => setTimeout(res, 300));
			return data;
		},
	});
}