"use client";
import { useTranslations } from "next-intl";
import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import { Button } from "@/components/ui/button";

function AddPermissionTopComponent() {
	const t = useTranslations("purshes.classCard");

	return (
		<div>
			<div className="flex flex-col gap-5 p-6">
				<div className="flex justify-between items-start">
					<h2 className="text-[26px] font-bold">اذن اضافة</h2>
					<div className="flex flex-col gap-5">
						<h2 className="text-[36px] font-[600]">S00026</h2>
						<Button className="bg-[#16C47F] hover:bg-[#16C47F] text-white px-6 py-2 rounded-md w-[126px] h-[47px] ">
							اضافة الفاتورة
						</Button>
					</div>
				</div>
				<div className="grid lg:grid-cols-4 grid-cols-1 gap-5">
					<CustomSelect label={"رقم الفاتورة"} />
					<CustomInput label={"التاريخ"} type="date" />
				</div>
			</div>
		</div>
	);
}

export default AddPermissionTopComponent;
