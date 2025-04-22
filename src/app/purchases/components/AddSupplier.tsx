"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CustomInput from "@/components/customInput";
import { Button } from "@/components/ui/button";
import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";

export default function AddSupplier() {
		const { t } = useTypedTranslation();

	return (
		<Card>
			<CardHeader> {t("AddSupplier.title")}</CardHeader>
			<CardContent className="grid md:grid-cols-2 grid-cols-1 gap-6 px-6 pb-6">
				<CustomInput label={t("AddSupplier.name")} />
				<CustomInput label={t("AddSupplier.phone")} />
				<CustomInput label={t("AddSupplier.address")} />
				<Button className="bg-[#16C47F] hover:bg-[#16C47F] text-white px-6 py-2 rounded-md w-[182px] h-[47px] md:mt-8">
					{t("AddSupplier.save")}
				</Button>{" "}
			</CardContent>
		</Card>
	);
}
