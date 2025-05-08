'use client'
import CustomInput from "@/components/customInput";
import { Button } from "@heroui/react";

export const SupplierForm = ({ supplierData, setSupplierData, t }) => {
	return (
		
        <div className="grid grid-cols-2 gap-5 p-6">
			<div className="col-span-1">
				<CustomInput
					name="name"
					label={t("suppliers.supplierName")}
					value={supplierData.name}
					onChange={(e) =>
						setSupplierData((prev) => ({ ...prev, name: e.target.value }))
					}
				/>
			</div>
			<div className="col-span-1">
				<CustomInput
					name="phone"
					label={t("suppliers.phone")}
					value={supplierData.phone}
					onChange={(e) =>
						setSupplierData((prev) => ({ ...prev, phone: e.target.value }))
					}
				/>
			</div>
			<div className="col-span-1">
				<CustomInput
					name="address"
					label={t("suppliers.address")}
					value={supplierData.address}
					onChange={(e) =>
						setSupplierData((prev) => ({ ...prev, address: e.target.value }))
					}
				/>
			</div>
			<div className="col-span-1 flex items-end">
				<Button className="text-[16px] font-[500] text-[#FFFFFF] bg-[#16C47F] py-[10px] px-3 w-[148px] h-[48px] hover:bg-[#16C47F]/70 rounded-lg">
					{t("suppliers.save")}
				</Button>
			</div>
            </div>
	
	);
};
