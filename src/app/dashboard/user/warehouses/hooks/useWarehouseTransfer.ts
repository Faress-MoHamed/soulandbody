"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Trash2, Edit } from "lucide-react";

export type WarehouseTransferType = {
	id: number; // ID for React key purposes
	code: number; // كود التحويل
	date: string; // التاريخ
	sourceWarehouse: string; // اسم المخزن منه
	destinationWarehouse: string; // اسم المخزن اليه
};

// Function to generate warehouse transfer data
export function generateWarehouseTransferData(
	count: number = 13
): WarehouseTransferType[] {
	return Array.from({ length: count }, (_, index) => {
		return {
			id: index + 1,
			code: 1,
			date: "14/10/2024",
			sourceWarehouse: "طيبة",
			destinationWarehouse: "طيبة",
		};
	});
}

const initialWarehouseTransferData: WarehouseTransferType[] =
	generateWarehouseTransferData();

export function useWarehouseTransferData() {
	return useQuery({
		queryKey: ["warehouseTransfers"],
		queryFn: async () => {
			// Simulate network delay
			// await new Promise((res) => setTimeout(res, 300));
			return initialWarehouseTransferData;
		},
	});
}




