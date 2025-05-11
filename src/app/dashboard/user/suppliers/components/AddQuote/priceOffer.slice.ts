import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Product {
	productCode: string;
	productCategory: string;
	productName: string;
	requiredQuantity: number;
	availableQuantity: number;
	salesUnit: number;
	tax: number;
	discount: number;
	description: string;
	total: number;
	measureUnitId?:any
}

interface PriceOfferState {
	products: Product[];
}

const initialState: PriceOfferState = {
	products: [
		{
			productCode: "125",
			productCategory: "كرتونة",
			productName: "ليب تون",
			requiredQuantity: 12,
			availableQuantity: 10,
			salesUnit: 200,
			tax: 10,
			discount: 10,
			description: "4+1",
			total: 2400,
		},
		{
			productCode: "125",
			productCategory: "كرتونة",
			productName: "ليب تون",
			requiredQuantity: 12,
			availableQuantity: 10,
			salesUnit: 200,
			tax: 10,
			discount: 10,
			description: "4+1",
			total: 2400,
		},
		{
			productCode: "125",
			productCategory: "كرتونة",
			productName: "ليب تون",
			requiredQuantity: 12,
			availableQuantity: 10,
			salesUnit: 200,
			tax: 10,
			discount: 10,
			description: "4+1",
			total: 2400,
		},
		{
			productCode: "125",
			productCategory: "كرتونة",
			productName: "ليب تون",
			requiredQuantity: 12,
			availableQuantity: 10,
			salesUnit: 200,
			tax: 10,
			discount: 10,
			description: "4+1",
			total: 2400,
		},
		{
			productCode: "125",
			productCategory: "كرتونة",
			productName: "ليب تون",
			requiredQuantity: 12,
			availableQuantity: 10,
			salesUnit: 200,
			tax: 10,
			discount: 10,
			description: "4+1",
			total: 2400,
		},
		{
			productCode: "125",
			productCategory: "كرتونة",
			productName: "ليب تون",
			requiredQuantity: 12,
			availableQuantity: 0,
			salesUnit: 0,
			tax: 0,
			discount: 0,
			description: "",
			total: 0,
		},
	],
};

export const priceOfferSlice = createSlice({
	name: "priceOffer",
	initialState,
	reducers: {
		setProductsFromMeta: (state, action: PayloadAction<any[]>) => {
			state.products = action.payload.map((meta) => ({
				productCode: meta.productCode,
				productCategory: meta.productCategory,
				productName: meta.productName,
				requiredQuantity: meta.requiredQuantity,
				measureUnitId: meta.measureUnitId,
				availableQuantity: 0,
				salesUnit: 0,
				tax: 0,
				discount: 0,
				description: "",
				total: 0,
			}))},
		updateField: (
			state,
			action: PayloadAction<{
				index: number;
				field: string;
				value: string | number;
			}>
		) => {
			const { index, field, value } = action.payload;
			const numericValue =
				typeof value === "string" ? Number.parseFloat(value) || 0 : value;

			// @ts-ignore - Dynamic field access
			state.products[index][field] =
				field === "description" ? value : numericValue;
		},

		calculateTotals: (state) => {
			state.products.forEach((product) => {
				const basePrice = product.salesUnit * product.requiredQuantity;
				const discountAmount = basePrice * (product.discount / 100);
				const afterDiscount = basePrice - discountAmount;
				const taxAmount = afterDiscount * (product.tax / 100);
				product.total = Math.round(afterDiscount + taxAmount);
			});
		},

		addProduct: (state) => {
			state.products.push({
				productCode: "125",
				productCategory: "كرتونة",
				productName: "ليب تون",
				requiredQuantity: 12,
				availableQuantity: 0,
				salesUnit: 0,
				tax: 0,
				discount: 0,
				description: "",
				total: 0,
			});
		},

		removeProduct: (state, action: PayloadAction<number>) => {
			state.products.splice(action.payload, 1);
		},
	},
});

export const { updateField, calculateTotals, addProduct, removeProduct,setProductsFromMeta } =
	priceOfferSlice.actions;


export default priceOfferSlice.reducer;
