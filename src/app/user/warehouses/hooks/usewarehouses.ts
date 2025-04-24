"use client";
import { useQuery } from "@tanstack/react-query";

export type WarehouseType = {
	code: number; // كود المخزن
	name: string; // اسم المخزن
	type: string; // نوع المخزن
	location: string; // الموقع
	department: string; // الإدارة المسؤولة
	capacity: string | number; // السعة القصوى
};

// Function to generate varied warehouse data
export function generateWarehouseData(count: number = 10): WarehouseType[] {
	const warehouseNames = [
		"مخزن طيبة",
		"مخزن الأمل",
		"مخزن النور",
		"مخزن الشفاء",
		"مخزن الصحة",
	];
	const warehouseTypes = ["طبي", "أدوية", "مستلزمات", "معدات", "عام"];
	const locations = [
		"مدينة نصر",
		"المعادي",
		"الدقي",
		"العبور",
		"الشروق",
		"6 أكتوبر",
	];
	const departments = [
		"قسم المخازن",
		"إدارة المستلزمات",
		"قسم الإمداد",
		"إدارة التوريدات",
	];

	return Array.from({ length: count }, (_, i) => {
		const isMainWarehouse = Math.random() > 0.7;

		return {
			code: i + 1,
			name: warehouseNames[Math.floor(Math.random() * warehouseNames.length)],
			type: warehouseTypes[Math.floor(Math.random() * warehouseTypes.length)],
			location: locations[Math.floor(Math.random() * locations.length)],
			department: departments[Math.floor(Math.random() * departments.length)],
			capacity: isMainWarehouse
				? (Math.floor(Math.random() * 5) + 2) * 100
				: "محلي",
		};
	});
}

// Sample static data
const initialWarehousesData: WarehouseType[] = [
	{
		code: 1,
		name: "مخزن طيبة",
		type: "طبي",
		location: "مدينة نصر",
		department: "مخزن طيبة",
		capacity: 400,
	},
	...generateWarehouseData(80),
];

export function useWarehousesData() {
	return useQuery({
		queryKey: ["warehouses"],
		queryFn: async () => {
			// Simulate network delay
			return initialWarehousesData;
		},
	});
}
