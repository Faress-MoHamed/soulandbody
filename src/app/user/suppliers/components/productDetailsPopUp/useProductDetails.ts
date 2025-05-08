"use client";

import { useQuery } from "@tanstack/react-query";

export type ProductDetailType = {
  productCode: string;
  productName: string;
  category: string;
  quantity: number;
  unitPrice: number;
  tax: string;
  discount: string;
  description: string;
  total: number;
};

// نوع البيانات القادمة من API
type ApiQuotationType = {
  id: number;
  product_code: string;
  product_name: string;
  product_cat: number;
  measure_unit_name: string;
  qty: number;
  unit_price: string;
  discount: string;
  tax: string;
  total_amount: string;
  description: string;
};

export function useProductDetails() {
  return useQuery<ProductDetailType[]>({
    queryKey: ["productDetails"],
    queryFn: async () => {
      const response = await fetch("http://192.168.1.15:8008/api/quotations", {
        headers: {
          Authorization: "Bearer 34|BlAVimHB5xXY30NJyWsifXHBid3mHuCTo75PMDBB704258d9",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("فشل في جلب بيانات المنتجات");
      }

      const apiData: ApiQuotationType[] = await response.json();

      // تحويل البيانات من شكل API إلى ProductDetailType
      return apiData.map(item => ({
        productCode: item.product_code,
        productName: item.product_name,
        category: `الفئة ${item.product_cat} (${item.measure_unit_name})`,
        quantity: item.qty,
        unitPrice: parseFloat(item.unit_price),
        tax: `${item.tax}%`,
        discount: `${item.discount}%`,
        description: item.description,
        total: parseFloat(item.total_amount),
      }));
    },
  });
}