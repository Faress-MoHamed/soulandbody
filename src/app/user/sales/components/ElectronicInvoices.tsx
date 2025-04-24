import CustomInput from "@/components/customInput";
import { Button } from "@/components/ui/button";
import React from "react";
import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";

export default function ElectronicInvoicesTopComponent() {
	const { t } = useTypedTranslation();

	return (
		<div className="flex md:flex-row flex-col items-end gap-4 px-6">
			<CustomInput label={t("sales.common.from")} type="date" />
			<CustomInput label={t("sales.common.to")} type="date" />
			<Button className="bg-[#16C47F] hover:bg-[#16C47F]/70 text-white px-6 py-2 rounded-md w-[182px] h-[47px]">
				{t("sales.common.execute")}
			</Button>
		</div>
	);
}
