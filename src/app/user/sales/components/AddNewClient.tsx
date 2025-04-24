"use client";
import CustomInput from "@/components/customInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";

export default function AddNewClient() {
	const { t } = useTypedTranslation();

	return (
		<Card className="flex flex-col p-4 gap-6">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
					{t("sales.clients.addNewTitle")}
				</CardTitle>
			</CardHeader>
			<CardContent className="grid md:grid-cols-2 grid-cols-1 items-end gap-6">
				<CustomInput label={t("sales.clients.columns.name")} type="text" />
				<CustomInput
					label={t("sales.clients.columns.phoneNumber")}
					type="text"
				/>
				<CustomInput label={t("sales.clients.columns.address")} type="text" />
				<Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[182px] h-[47px] md:mt-8">
					{t("sales.common.save")}
				</Button>
			</CardContent>
		</Card>
	);
}
