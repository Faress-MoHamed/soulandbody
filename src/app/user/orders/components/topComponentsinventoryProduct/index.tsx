import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import CustomPopUp from "@/components/popups";
import QuantitySelector from "@/components/QuantitySelector";
import { Button } from "@/components/ui/button";
import React from "react";
import SendToSupplier from "../SendToSupplier";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";

export default function TopComponentsinventoryProduct() {
	const { t } = useTypedTranslation();
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
					DialogContentComponent={() => {
						return <SendToSupplier />;
					}}
				/>
			</div>
			<div className="md:grid grid-cols-4 grid-cols-1 gap-5 items-end">
				<CustomSelect
					label={t("ordersInUser.TopComponentsinventoryProduct.productName")}
				/>
				<CustomSelect
					label={t(
						"ordersInUser.TopComponentsinventoryProduct.productCategory"
					)}
				/>
				<QuantitySelector
					label={t("ordersInUser.TopComponentsinventoryProduct.quantity")}
				/>
				<Button className="bg-[#16C47F] text-white rounded-[8px] w-[148px] h-[44px]">
					{t("ordersInUser.TopComponentsinventoryProduct.add")}
				</Button>
			</div>
		</div>
	);
}
