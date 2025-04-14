"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface Product {
  productCode: number;
  productName: string;
  productDescription: string;
  unit: string;
  price: number;
  quantity: number;
  measurementUnit: number;
  inStock: number;
  otherBranches: string;
  date: string;
  category: string;
};

export function useProducts() {
	// This mock data represents the table shown in the image

  function generateTableRows(rowCount = 100) {
		// Product name variations
		const productNames = [
			"لاب توب",
			"موبايل",
			"تابلت",
			"شاشة",
			"طابعة",
			"سماعات",
			"ماوس",
			"كيبورد",
			"سيرفر",
			"راوتر",
		];

		// Product description variations
		const productDescriptions = [
			"لاب توب بحجم شاشة",
			"موبايل ذكي بكاميرا",
			"تابلت متعدد الاستخدامات",
			"شاشة عالية الدقة",
			"طابعة ليزر ملونة",
			"سماعات بلوتوث لاسلكية",
			"ماوس ارجونوميك",
			"كيبورد ميكانيكي",
			"سيرفر عالي الأداء",
			"راوتر واي فاي",
		];

		// Units variations
		const units = ["قطعة", "كرتونة", "عبوة", "صندوق", "وحدة"];

		// Category variations
		const categories = [
			"الكترونيات",
			"اكسسوارات",
			"قطع غيار",
			"أجهزة مكتبية",
			"معدات شبكات",
		];

		// Branch variations
		const branches = [
			"فرع الرياض",
			"فرع جدة",
			"فرع الدمام",
			"فرع مكة",
			"فرع المدينة",
		];

		// Function to generate a random date in the format DD/MM/YYYY
		function generateRandomDate() {
			const day = Math.floor(Math.random() * 28) + 1;
			const month = Math.floor(Math.random() * 12) + 1;
			const year = 2024 + Math.floor(Math.random() * 2);
			return `${day < 10 ? "0" + day : day}/${
				month < 10 ? "0" + month : month
			}/${year}`;
		}

		// Function to generate a random number between min and max
		function getRandomNumber(min: number, max: number) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		const rows = [];

		for (let i = 1; i <= rowCount; i++) {
			// Random product name and description index
			const productIndex = Math.floor(Math.random() * productNames.length);
			const descIndex = Math.floor(Math.random() * productDescriptions.length);

			// Generate a row object
			const row = {
				productCode: i,
				productName: productNames[productIndex],
				productDescription: `${
					productDescriptions[descIndex]
				} ${getRandomNumber(10, 30)} ${
					productIndex % 2 === 0 ? "بوصة" : "انش"
				}`,
				unit: units[Math.floor(Math.random() * units.length)],
				price: getRandomNumber(500, 10000),
				quantity: getRandomNumber(100, 5000),
				measurementUnit: getRandomNumber(1000, 5000),
				inStock: getRandomNumber(1000, 5000),
				otherBranches: branches[Math.floor(Math.random() * branches.length)],
				date: generateRandomDate(),
				category: categories[Math.floor(Math.random() * categories.length)],
			};

			rows.push(row);
		}

		return rows;
	}
	const MockData = generateTableRows()
	return useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			// In a real application, you would fetch from an API
			// const { data } = await axios.get("/api/products");
			// return data;
      // console.log(generateTableRows());
			// For now, we'll return the mock data
			return MockData;
		},
	});
}

export function useProduct(id: number) {
	return useQuery({
		queryKey: ["product", id],
		queryFn: async () => {
			const { data } = await axios.get(`/api/products/${id}`);
			return data;
		},
		enabled: !!id,
	});
}

export function useCreateProduct() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (product: Omit<Product, "id">) => {
			const { data } = await axios.post("/api/products", product);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
}

export function useUpdateProduct() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			id,
			product,
		}: {
			id: number;
			product: Partial<Product>;
		}) => {
			const { data } = await axios.put(`/api/products/${id}`, product);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
}

export function useDeleteProduct() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: number) => {
			await axios.delete(`/api/products/${id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
}
