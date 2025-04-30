"use client";
import { useTranslations } from "next-intl";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import { Button } from "@/components/ui/button";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";

export default function AddNewWareHouse() {
	const { t } = useTypedTranslation();

	return (
		<Card>
			<CardHeader>{t("addNewWareHouse.addNewStore")}</CardHeader>
			<p className="text-[24px] font-bold text-start ps-6">
				{t("addNewWareHouse.code")} : 24210
			</p>
			<CardContent className="grid md:grid-cols-2 grid-cols-1 gap-6 px-6 ">
				<CustomInput label={t("addNewWareHouse.storeName")} />
				<CustomSelect label={t("addNewWareHouse.storeType")} options={[]} />
				<CustomInput label={t("addNewWareHouse.purchasePrice")} />
				<CustomInput label={t("addNewWareHouse.Responsiblemanagement")} />
			</CardContent>
			<div className="px-6">
				<CustomInput
					wrapperClassName=" lg:w-full"
					label={t("addNewWareHouse.geographicalLocation")}
				/>
			</div>
			<CardFooter className="px-6 pb-6">
				<Button className="bg-[#16C47F] hover:bg-[#16C47F] text-white px-6 py-2 rounded-md w-[182px] h-[47px] md:mt-8">
					{t("addNewWareHouse.save")}
				</Button>{" "}
			</CardFooter>
		</Card>
	);
}
