"use client";
import { AxiosInstance } from "@/lib/AxiosConfig";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { FileText, Trash2, Eye } from "lucide-react";

export type AdditionPermissionType = {
	id: number; // ID for React key purposes
	code: number; // المورد
	invoiceNumber: number; // الفاتورة
	quantity: number; // الكمية
	date: string; // التاريخ
	discount: string; // خصومات
	paymentMethod: string; // طريق الفاتورة
};

// Function to generate invoice data
export function generateAdditionPermission(
	count: number = 12
): AdditionPermissionType[] {
	return Array.from({ length: count }, (_, index) => {
		return {
			id: index + 1,
			code: 1,
			invoiceNumber: 6567,
			quantity: 665,
			date: "12/12/2025",
			discount: "500.5 جنية",
			paymentMethod: "",
		};
	});
}

const initialAdditionPermission: AdditionPermissionType[] =
	generateAdditionPermission();

export function useAdditionPermission() {
	return useQuery({
		queryKey: ["AdditionPermission"],
		queryFn: async () => {
			// Simulate network delay
			const {data}=await AxiosInstance("addition-permits")
			return data;
		},
	});
}

// Action buttons renderer function (can be used in column cell property)
export const renderActionButtons = () => {
	return (
		<div className="flex gap-2">
			<button className="px-3 py-1 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 flex items-center justify-center gap-1">
				<FileText size={16} />
			</button>
			<button className="px-3 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-50 flex items-center justify-center gap-1">
				<Trash2 size={16} />
				<span>حذف</span>
			</button>
			<button className="px-3 py-1 border border-green-500 text-green-500 rounded-md hover:bg-green-50 flex items-center justify-center gap-1">
				<Eye size={16} />
				<span>تعديل</span>
			</button>
		</div>
	);
};


