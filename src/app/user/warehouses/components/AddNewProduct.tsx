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

export default function AddNewProduct() {
	const t = useTranslations("purshes.addProduct");

	return (
		<Card>
			<CardHeader>{t("title")}</CardHeader>
			<p className="text-[24px] font-bold text-start ps-6">{t("code")}</p>
			<CardContent className="grid md:grid-cols-3 grid-cols-1 gap-6 px-6 pb-6">
				<CustomInput label={t("name")} />
				<CustomSelect label={"فئة المنتج"} />
				<CustomSelect label={"الوحده"} />
				<CustomInput label={"الحد الاقصي"} />
				<CustomInput label={"الحد الادني"} />
				<CustomSelect label={"اسم المورد"} options={[]} />
				<CustomSelect label={t("warehouse")} />
				<CustomSelect label={t("type")} options={[]} />
			</CardContent>
			<div className="px-6 flex flex-col gap-2">
				<CustomInput
					id="show"
					wrapperClassName="flex flex-row-reverse gap-2 lg:w-fit w-full"
					className="min-w-[28px] w-[28px] bg-white !border-red-500 !outline-red-500 placeholder:text-black text-start flex justify-end h-[28px] select-none"
					type="checkbox"
					label={t("show")}
				/>
				<div className="flex justify-start pb-6">
					<Button className="bg-[#16C47F] hover:bg-[#16C47F] text-white px-6 py-2 rounded-md w-[182px] h-[47px]  justify-self-start">
						{t("save")}
					</Button>
				</div>
			</div>
			{/* <CardFooter className="px-6 pb-6">
			</CardFooter> */}
		</Card>
	);
}
