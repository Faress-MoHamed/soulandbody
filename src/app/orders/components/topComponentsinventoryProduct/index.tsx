import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import CustomPopUp from "@/components/popups";
import QuantitySelector from "@/components/QuantitySelector";
import { Button } from "@/components/ui/button";
import React from "react";
import SendToSupplier from "../SendToSupplier";

export default function TopComponentsinventoryProduct() {
	return (
		<div className="flex flex-col gap-6 p-6 ">
			<div className="justify-end flex">
				<CustomPopUp
					DialogTriggerComponent={() => {
						return (
							<Button className="bg-[#16C47F] text-white rounded-[8px] w-[192px] h-[44px] ">
								أرسال الي مورد
							</Button>
						);
					}}
					DialogContentComponent={() => {
						return <SendToSupplier />;
					}}
				/>
			</div>
			<div className="flex gap-5 items-end">
				<CustomSelect label="أسم المنتج" />
				<CustomSelect label="فئة المنتج" />
				<QuantitySelector label="الكمية" />
				<Button className="bg-[#16C47F] text-white rounded-[8px] w-[148px] h-[44px]">
					اضافة
				</Button>
			</div>
		</div>
	);
}
