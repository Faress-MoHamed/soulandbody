"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CustomInput from "@/components/customInput";
import { Button } from "@/components/ui/button";
import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";

export default function AddNewCategory() {
	const { t } = useTypedTranslation();

	return (
		<Card>
			<CardHeader>{t("AddNewCategory.title")}</CardHeader>
			<p className="text-[24px] font-bold text-start ps-6">
				{t("AddNewCategory.code")} : 125
			</p>
			<CardContent className="grid md:grid-cols-2 grid-cols-1 gap-6 px-6 pb-6">
				<CustomInput label={t("AddNewCategory.name")} />
				<CustomInput label={t("AddNewCategory.description")} />
				<CustomInput label={t("AddNewCategory.purchasePrice")} />
				<CustomInput label={t("AddNewCategory.salePrice")} />
				<Button className="bg-[#16C47F] hover:bg-[#16C47F] text-white px-6 py-2 rounded-md w-[182px] h-[47px] md:mt-8">
					{t("AddNewCategory.save")}
				</Button>{" "}
			</CardContent>
		</Card>
	);
}
