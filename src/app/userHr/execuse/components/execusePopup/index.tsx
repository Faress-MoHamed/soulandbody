import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomInput from "@/components/customInput";
import { Button } from "@heroui/react";
import { useTranslations } from "next-intl";

export default function ExecusePopup() {
	const t = useTranslations("userHr.execusesPopUp");

	return (
		<Card className="flex flex-col px-6 py-9 gap-6 md:w-fit md:h-fit">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
					{t("popupTitle")}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid md:grid-cols-3 grid-cols-1 gap-6 place-items-end">
					<CustomInput type="time" label={t("start")} />
					<CustomInput type="time" label={t("end")} />
					<CustomInput label={t("reason")} />
				</div>
				<div className="flex md:mt-0 mt-3">
					<Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[148px] h-[48px] md:mt-8">
						{t("submit")}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
