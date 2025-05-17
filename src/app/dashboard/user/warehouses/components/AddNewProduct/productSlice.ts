import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    product_id: number;
    store_id: number;
    facility_id: number;
    qty: number;
    measure_unit_id: number;
    show_for_sale_status:  string;
    min_quantity: number;
    max_quantity: number;
}

interface ProductState {
    supplier_id: number;
    invoice_date: string;
    discount: string;
    products: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    supplier_id: 0,
    invoice_date: '',
    discount: '',
    products: [],
    loading: false,
    error: null
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setSupplier: (state, action: PayloadAction<number>) => {
            state.supplier_id = action.payload;
        },
        setInvoiceDate: (state, action: PayloadAction<string>) => {
            state.invoice_date = action.payload;
        },
        setDiscount: (state, action: PayloadAction<string>) => {
            state.discount = action.payload;
        },
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
        updateProduct: (state, action: PayloadAction<{ index: number; product: Product }>) => {
            const { index, product } = action.payload;
            if (state.products[index]) {
                state.products[index] = product;
            }
        },
        removeProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter((_, index) => index !== action.payload);
        },
        resetForm: (state) => {
            return initialState;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    }
});

export const {
    setSupplier,
    setInvoiceDate,
    setDiscount,
    addProduct,
    updateProduct,
    removeProduct,
    resetForm,
    setLoading,
    setError
} = productSlice.actions;

export default productSlice.reducer;