"use client";
import { useTranslations } from "next-intl";
import {
	Card,
	CardContent,
	CardHeader,
} from "@/components/ui/card";
import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, setSupplier, setInvoiceDate, setDiscount } from './productSlice';
import { useState } from 'react';
import { useTypedSelector } from "@/hooks/useTypedSelector";

export default function AddNewProduct() {
	const t = useTranslations("purshes.addProduct");
	const dispatch = useDispatch();
	const [currentProduct, setCurrentProduct] = useState({
		product_id: 0,
		store_id: 0,
		facility_id: 0,
		qty: 0,
		measure_unit_id: 0,
		show_for_sale_status: 'show',
		min_quantity: 0,
		max_quantity: 0
	});
	const { supplier_id, invoice_date, discount, products, loading, error } = useTypedSelector((state) => state.productInventory);

	const handleSubmit = () => {
		dispatch(addProduct({
			...currentProduct,
			show_for_sale_status: currentProduct.show_for_sale_status
		}));
	};

	return (
		<Card>
			<CardHeader>{t("title")}</CardHeader>
			<p className="text-[24px] font-bold text-start ps-6">{t("code")}</p>
			<CardContent className="grid md:grid-cols-3 grid-cols-1 gap-6 px-6 pb-6">
				<CustomInput 
					label={t("name")}
					value={supplier_id}
					onChange={(e) => setCurrentProduct({
						...currentProduct,
						product_id: parseInt(e.target.value)
					})}
				/>
				<CustomSelect 
					label={"فئة المنتج"}
					onValueChange={(value) => setCurrentProduct({
						...currentProduct,
						facility_id: parseInt(value)
					})}
				/>
				<CustomSelect 
					label={"الوحده"}
					onValueChange={(value) => setCurrentProduct({
						...currentProduct,
						measure_unit_id: parseInt(value)
					})}
				/>
				<CustomInput 
					label={"الحد الاقصي"}
					onChange={(e) => setCurrentProduct({
						...currentProduct,
						max_quantity: parseInt(e.target.value)
					})}
				/>
				<CustomInput 
					label={"الحد الادني"}
					onChange={(e) => setCurrentProduct({
						...currentProduct,
						min_quantity: parseInt(e.target.value)
					})}
				/>
				<CustomSelect 
					label={"اسم المورد"} 
					options={[]}
					onValueChange={(value) => dispatch(setSupplier(parseInt(value)))}
				/>
				<CustomSelect 
					label={t("warehouse")}
					onValueChange={(value) => setCurrentProduct({
						...currentProduct,
						store_id: parseInt(value)
					})}
				/>
				<CustomSelect label={t("type")} options={[]} />
			</CardContent>
			<div className="px-6 flex flex-col gap-2">
				<CustomInput
					id="show"
					wrapperClassName="flex flex-row-reverse gap-2 lg:w-fit w-full"
					className="min-w-[28px] w-[28px] bg-white !border-red-500 !outline-red-500 placeholder:text-black text-start flex justify-end h-[28px] select-none"
					type="checkbox"
					label={t("show")}
					onChange={(e) => setCurrentProduct({
						...currentProduct,
						show_for_sale_status: e.target.checked ? 'show' : 'hide'
					})}
				/>
				<div className="flex justify-start pb-6">
					<Button 
						className="bg-[#16C47F] hover:bg-[#16C47F] text-white px-6 py-2 rounded-md w-[182px] h-[47px] justify-self-start"
						onClick={handleSubmit}
					>
						{t("save")}
					</Button>
				</div>
			</div>
		</Card>
	);
}
