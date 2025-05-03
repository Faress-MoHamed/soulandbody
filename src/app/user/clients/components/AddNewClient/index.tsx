import React from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import { MultiSelect } from "@/components/multiSelector";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";

export default function AddNewClient() {
	const { t } = useTypedTranslation();

	return (
		<Card className="flex flex-col px-6 py-9 pt-0 gap-6  w-[100%] h-fit">
			<CardHeader className="flex flex-row items-center justify-between p-0">
				<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
					{t("clients.addNewClient")}
				</CardTitle>
			</CardHeader>
			<CardContent className="grid md:grid-cols-3 items-end grid-cols-1 gap-5">
				<CustomInput label={t("clients.customerName")} />
				<CustomInput label={t("clients.phone")} />
				<div></div>
				<CustomInput label={t("clients.address")} />
				<Button
					type="submit"
					className="text-[16px] font-[500] text-[#FFFFFF] bg-[#16C47F] p-0 py-[10px] px-3 w-[148px] h-[48px]  hover:bg-[#16C47F]/70 shadow-none cursor-pointer rounded-lg"
				>
					{t("clients.save")}
				</Button>
			</CardContent>
		</Card>
	);
}
