import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/customInput";
import { MultiSelect } from "@/components/multiSelector";
import { useTranslations } from "next-intl";

export default function AddCustomers() {
	const t = useTranslations("customers");

	return (
		<Card className="flex flex-col p-4 gap-6">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
					{t("addNewCustomer")}
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col items-start gap-6">
				<div className="grid md:grid-cols-3 grid-cols-1 w-full gap-6">
					<CustomInput label={t("form.customerName")} type="text" />
					<CustomInput label={t("form.phone")} type="text" />
				</div>
				<div className="grid md:grid-cols-3 grid-cols-1 w-full gap-6 items-end">
					<CustomInput label={t("form.address")} type="text" />
					<CustomInput label={t("form.discounts")} type="text" />
					{/* <MultiSelect placeholder={t('form.category')} options={options} /> */}
					<Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[182px] h-[47px] md:mt-8">
						{t("buttons.save")}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
