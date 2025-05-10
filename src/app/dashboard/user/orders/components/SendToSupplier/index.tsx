import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import { MultiSelect } from "@/components/multiSelector";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { useCreateOrderToSupplier, useSupplier, useSupplierType } from "../../hooks/useSendToSupplier";
import { useTypedSelector } from "@/hooks/useTypedSelector";

export default function SendToSupplier() {
	const [selectedSupplierType, setSelectedSupplierType] = useState<string | null>(null);
	const [selectedSupplierIds, setselectedSupplierIds] = useState<string[] | null>(null);
	const { t } = useTypedTranslation();
	const {data:SupplierType}=useSupplierType()
	const {data:Suppliers}=useSupplier();
	const filteredSuppliers = Suppliers?.data?.filter(
		(		el: { supplier_type: string | null; }) => el?.supplier_type === selectedSupplierType
	) || [];
	console.log(selectedSupplierType,filteredSuppliers)
// البيانات اللي عندك
// const rawData = [
// 	{
// 	  productName: 2,
// 	  productCategory: "cadcac",
// 	  quantity: 4,
// 	},
// 	{
// 	  productName: 2,
// 	  productCategory: "saxaxcac",
// 	  quantity: 3,
// 	},
// 	{
// 	  productName: 3,
// 	  productCategory: 1,
// 	  quantity: 3,
// 	},
// 	{
// 	  productName: 2,
// 	  productCategory: 2,
// 	  quantity: 4,
// 	},
// 	{
// 	  productName: "",
// 	  productCategory: "",
// 	  quantity: 0,
// 	}
//   ];
// [
//     {
//         "productName": 2,
//         "productCategory": "cadcac",
//         "quantity": 4,
//         "productNameLabel": "Product B",
//         "productCategoryLabel": "cadcac",
//         "unitLabel": "cadcac",
//         "index": 8
//     },
//     {
//         "productName": 2,
//         "productCategory": "saxaxcac",
//         "quantity": 3,
//         "productNameLabel": "Product B",
//         "productCategoryLabel": "saxaxcac",
//         "unitLabel": "saxaxcac",
//         "index": 2
//     },
//     {
//         "productName": 3,
//         "productCategory": 1,
//         "quantity": 3,
//         "productNameLabel": "Product Cc",
//         "productCategoryLabel": 1,
//         "unitLabel": "saxaxcac",
//         "index": 2
//     },
//     {
//         "productName": 2,
//         "productCategory": 2,
//         "quantity": 4,
//         "productNameLabel": "Product B",
//         "productCategoryLabel": 2,
//         "unitLabel": 2,
//         "index": 3
//     },
//     {
//         "productName": "",
//         "productCategory": "",
//         "quantity": 0,
//         "productCategoryLabel": "",
//         "unitLabel": "",
//         "index": 2
//     }
// ]
const {products}=useTypedSelector(s=>s.inventory)
  
  // 1. نظّفي الداتا من الصفوف الفاضية
  const cleaned = products.filter((item: { productName: any; quantity: any; }) => item.productName && item.quantity);
  
  // 2. اجمعي الكمية لكل منتج (حسب `productName`)
  const grouped: Record<number, { qty: number; cat: any }> = {};
  
  cleaned.forEach((item: { productName: any; quantity: number; productCategoryLabel: any; }) => {
	const id = item.productName;
	if (!grouped[id]) {
	  grouped[id] = { qty: item.quantity, cat: item.productCategoryLabel };
	} else {
	  grouped[id].qty += item.quantity;
	}
  });
  
  // 3. جهزي الداتا للإرسال
  const result = {
	product_id: Object.keys(grouped).map(id => Number(id)),
	product_cat: Object.values(grouped).map(item => item.cat),
	qty: Object.values(grouped).map(item => item.qty),
	supplier_ids: selectedSupplierIds // من MultiSelect
  };

  const {mutate,isPending}=useCreateOrderToSupplier()
	return (
		<Card className="flex flex-col px-6 py-9 pt-0 gap-6  w-[100%] h-fit">
			<CardHeader className="flex flex-row items-center justify-between p-0">
				<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
					{t("ordersInUser.SendToSupplier.title")}
				</CardTitle>
			</CardHeader>
			<CardContent className="grid md:grid-cols-2 grid-cols-1 justify-between gap-5">
			<CustomSelect
	label={t("ordersInUser.SendToSupplier.supplierType")}
	options={(SupplierType || []).map((el: { type: any; id: any; }) => ({
		label: el?.type,
		value: el?.type // <-- هنا بدل id
	}))}
	onValueChange={(val) => setSelectedSupplierType(val)}
/>
<MultiSelect
	label={"اسم المورد"}
	options={filteredSuppliers.map((el: { name: any; id: any; }) => ({
		label: el?.name,
		value: el?.id
	}))}
	onChange={(e)=>setselectedSupplierIds(e)}
	className="md:max-w-auto"
/>
			</CardContent>
			<CardFooter className="flex gap-3 justify-end">
				<Button
					onClick={(e)=>mutate({dataTosend:result})}
					className="text-[16px] font-[500] text-[#FFFFFF] bg-[#16C47F] p-0 py-[10px] px-3 w-[148px] h-[48px]  hover:bg-[#16C47F]/70 shadow-none cursor-pointer rounded-lg"
				>
					{t("ordersInUser.SendToSupplier.save")}
				</Button>
			</CardFooter>
		</Card>
	);
}
