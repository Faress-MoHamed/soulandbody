"use client";
import { useTranslations } from "next-intl";
import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import { Button } from "@/components/ui/button";

function InventoryReportsTopComponent({
	setShowinventoryDetails,
}: {
	setShowinventoryDetails?: any;
}) {
	const t = useTranslations("purshes.inventory");

	return (
		<div>
			<div className="flex flex-col md:gap-0 gap-5 px-6 pt-6">
				<div className="flex justify-between items-center">
					<h2 className="text-[26px] font-bold">{t("title")}</h2>
					<h2 className="text-[36px] font-[600]">S00026</h2>
				</div>
				<div className="grid 2xl:grid-cols-4 lg:grid-cols-3 grid-cols-1  gap-5">
					<CustomInput label={t("date")} type="date" />
					<CustomSelect label={t("code")} options={[]} />
					<CustomSelect label={t("type")} options={[]} />
					<CustomSelect label={t("name")} options={[]} />
				</div>
				<Button className="bg-[#16C47F] hover:bg-[#16C47F] text-white px-6 py-2 rounded-md w-[182px] h-[47px] md:mt-8">
					{t("save")}
				</Button>
			</div>
			<div className="flex justify-end px-6 pb-6">
				<Button
					onClick={() => setShowinventoryDetails?.(true)}
					className="bg-[#16C47F] hover:bg-[#16C47F] text-white px-6 py-2 rounded-md w-[182px] h-[47px] md:mt-8"
				>
					{t("log")}
				</Button>
			</div>
		</div>
	);
}

export default InventoryReportsTopComponent;
