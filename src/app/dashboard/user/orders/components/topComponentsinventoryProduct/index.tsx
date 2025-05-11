import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import CustomPopUp from "@/components/popups";
import QuantitySelector from "@/components/QuantitySelector";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import SendToSupplier from "../SendToSupplier";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { useDispatch } from "react-redux";
import { addProduct } from "./inventorySlice";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useCategory, useMeasureUnits, useProductsWithCategory } from "../../hooks/useOrderProducts";

export default function TopComponentsinventoryProduct() {
  const { t } = useTypedTranslation();
  const dispatch = useDispatch();
  const { products } = useTypedSelector(s => s.inventory);
  console.log(products);
  

  

  // Local state for form inputs (storing label and value)
  const [productName, setProductName] = useState({ label: "", value: "" });
  const [productCategory, setProductCategory] = useState({ label: "", value: "" });
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState({ label: "", value: "" });

  const { data: ProductsWithCategory, isLoading: ProductsWithCategoryLoading } = useProductsWithCategory(productCategory.value);
  const {data:categories,isLoading:categoriesLoading}=useCategory()
  const {data:MeasureUnits,isLoading:MeasureUnitsLoading}=useMeasureUnits()
  const handleAddProduct = () => {
	if (productName && productCategory && quantity > 0) {
 
      const newProduct = { 
        productName: productName.value, 
        productCategory: productCategory.value, 
        quantity,
        productNameLabel: (ProductsWithCategory?.products || []).map((el: { name: any; id: any; }) => ({
            label: el?.name,
            value: el?.id
          }))?.find((el: { value: string; })=>el?.value===productName.value)?.label, // Storing the label
        productCategoryLabel: productCategory.label, // Storing the label
        unitLabel: unit.label, // Storing the label
 }
 dispatch(addProduct(newProduct)); // Dispatch to store
 }
    
}

  return (
    <div className="flex flex-col gap-6 p-6 ">
      <div className="justify-end flex">
        <CustomPopUp
          DialogTriggerComponent={() => {
            return (
              <Button className="bg-[#16C47F] text-white rounded-[8px] w-[192px] h-[44px] ">
                {t("ordersInUser.TopComponentsinventoryProduct.sendToSupplier")}
              </Button>
            );
          }}
          DialogContentComponent={({closePopup}) => {
            return <SendToSupplier closePopup={closePopup}/>;
          }}
        />
      </div>
      <div className="md:grid md:grid-cols-4 grid-cols-1 gap-5 items-end">
        <CustomSelect
          label={t("ordersInUser.TopComponentsinventoryProduct.productCategory")}
          value={productCategory.value}
          options={(categories || []).map((el: { name: any; id: any; }) => ({
            label: el?.name,
            value: el?.id
          }))}          onValueChange={(selectedOption) => {
            setProductCategory({ label: selectedOption, value: selectedOption });
          }}
        />
        <CustomSelect
          label={t("ordersInUser.TopComponentsinventoryProduct.productName")}
          value={productName.value}
          options={(ProductsWithCategory?.products || []).map((el: { name: any; id: any; }) => ({
            label: el?.name,
            value: el?.id
          }))}
          onValueChange={(selectedOption) => {
            setProductName({ label: selectedOption, value: selectedOption });
          }}
        />
        <CustomSelect
          label={"وحدة المنتج"}
          value={unit.value}
		  options={(MeasureUnits || []).map((el: { name: any; id: any; }) => ({
            label: el?.name,
            value: el?.id
          }))}     
          onValueChange={(selectedOption) => {
            setUnit({ label: selectedOption, value: selectedOption });
          }}
        />
        <QuantitySelector
          label={t("ordersInUser.TopComponentsinventoryProduct.quantity")}
          onChange={(e) => setQuantity(Number(e))}
        />
        <Button
          className="bg-[#16C47F] text-white rounded-[8px] w-[148px] h-[44px]"
          onClick={handleAddProduct}
        >
          {t("ordersInUser.TopComponentsinventoryProduct.add")}
        </Button>
      </div>
    </div>
  );
}
