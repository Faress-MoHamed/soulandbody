"use client";
import { AxiosInstance } from "@/lib/AxiosConfig";
import { useQuery } from "@tanstack/react-query";

export type SubWarehouseType = {
  code: number; // كود المخزن
  name: string; // اسم المخزن
  type: string; // نوع المخزن
  location: string; // الموقع
  department: string; // الإدارة المسؤولة
  capacity: string | number; // السعة القصوى
};

// Function to generate varied Subwarehouse data
export function generateSubWarehouseData(count: number = 10): SubWarehouseType[] {
  const SubwarehouseNames = [
    "مخزن طيبة",
    "مخزن الأمل",
    "مخزن النور",
    "مخزن الشفاء",
    "مخزن الصحة",
  ];
  const SubwarehouseTypes = ["طبي", "أدوية", "مستلزمات", "معدات", "عام"];
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
    const isMainSubWarehouse = Math.random() > 0.7;

    return {
      code: i + 1,
      name: SubwarehouseNames[Math.floor(Math.random() * SubwarehouseNames.length)],
      type: SubwarehouseTypes[Math.floor(Math.random() * SubwarehouseTypes.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      department: departments[Math.floor(Math.random() * departments.length)],
      capacity: isMainSubWarehouse
        ? (Math.floor(Math.random() * 5) + 2) * 100
        : "محلي",
    };
  });
}

// Sample static data
const initialSubWarehousesData: SubWarehouseType[] = [
  {
    code: 1,
    name: "مخزن طيبة",
    type: "طبي",
    location: "مدينة نصر",
    department: "مخزن طيبة",
    capacity: 400,
  },
  ...generateSubWarehouseData(80),
];

export function useSubWarehousesData() {
  return useQuery({
    queryKey: ["Subwarehouses"],
    queryFn: async () => {
      // Simulate network delay
      const {data} = await AxiosInstance.get("sub-stores")
      return data;
    },
  });
}
