"use client";
import { useTranslations } from "next-intl";
import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import { Button } from "@/components/ui/button";

function AddInvoiceTopComponent() {
	return (
		<div>
			<div className="flex flex-col gap-5 p-6">
				<div className="flex justify-between items-center">
					<h2 className="text-[26px] font-bold">بيان بضاعة</h2>
					<h2 className="text-[36px] font-[600]">S00026</h2>
				</div>
				<div className="grid lg:grid-cols-4 grid-cols-1 gap-5">
					<CustomInput label={"التاريخ"} type="date" />
					<CustomInput label={"رقم الفاتورة"} type="date" />
					<CustomInput label={"أسم العميل"} />
					<CustomInput label={"رقم الحساب"} />
				</div>
			</div>
		</div>
	);
}

export default AddInvoiceTopComponent;
