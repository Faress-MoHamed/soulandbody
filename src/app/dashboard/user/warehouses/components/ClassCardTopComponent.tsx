"use client";
import { useTranslations } from "next-intl";
import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import { Button } from "@/components/ui/button";

function ClassCardTopComponent() {
	const t = useTranslations("purshes.classCard");

	return (
		<div>
			<div className="flex flex-col gap-5 p-6">
				<div className="flex justify-between items-center">
					<h2 className="text-[26px] font-bold">{t("title")}</h2>
					<h2 className="text-[36px] font-[600]">S00026</h2>
				</div>
				<div className="grid lg:grid-cols-4 grid-cols-1 gap-5">
					<CustomInput label={t("from")} type="date" />
					<CustomInput label={t("to")} type="date" />
					<CustomSelect label={t("items")} options={[]} />
					<Button className="bg-[#16C47F] hover:bg-[#16C47F] text-white px-6 py-2 rounded-md w-[182px] h-[47px] md:mt-8">
						{t("search")}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ClassCardTopComponent;
