"use client";

import { useQuery } from "@tanstack/react-query";
export type AddSuppliersType = {
	types: any;
    id: number;
    type: string;
}
export function useTypes() {
    return useQuery<AddSuppliersType[]>({
        queryKey: ["type"],
        queryFn: async () => {
            const res = await fetch("http://192.168.1.15:8008/api/supplier-types", {
                headers: {
                    Authorization: "Bearer 34|BlAVimHB5xXY30NJyWsifXHBid3mHuCTo75PMDBB704258d9",
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch supplier types");
            }

            const data = await res.json();

            return data;
        },
    });
}
