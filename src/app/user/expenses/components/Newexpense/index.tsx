"use client";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import { MonthPicker } from "@/components/monthPicker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

export default function NewExpense() {
	const { t } = useTypedTranslation();
	return (
		<Card className="md:py-6 py-4  md:px-12 px-6">
			<CardHeader> {t("expense.newExpense")}</CardHeader>
			<CardContent className="grid md:grid-cols-2 grid-cols-1 gap-6">
				<MonthPicker label={t("expense.date")} />
				<CustomSelect
					label={t("expense.expenseName")}
					options={["fares", "mohamed", "ahmed"]}
				/>
				<CustomInput label={t("expense.amount")} type="number" />
				<CustomSelect
					label={t("expense.accountName")}
					options={["جاري", "مؤقت", "دائم"]}
				/>
				<CustomSelect label={t("expense.type")} options={["مدين", "دائن"]} />
				<Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[182px] h-[47px] md:mt-8">
					{t("expense.save")}
				</Button>
			</CardContent>
		</Card>
	);
}
