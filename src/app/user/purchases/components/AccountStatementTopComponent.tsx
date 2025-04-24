import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import { Button } from "@/components/ui/button";
import React from "react";
import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";

export default function AccountStatementTopComponent() {
	const { t } = useTypedTranslation();

	return (
		<div className="flex flex-col gap-5 p-6">
			<h2 className="text-[26px] font-bold">
				{t("AccountStatementTopComponent.title")}
			</h2>
			<div className="flex md:flex-row flex-col items-end gap-4">
				<CustomInput label={t("sales.common.from")} type="date" />
				<CustomInput label={t("sales.common.to")} type="date" />
				<CustomSelect
					label={t("AccountStatementTopComponent.item")}
					options={[]}
				/>
				<Button className="bg-[#16C47F] hover:bg-[#16C47F]/70 text-white px-6 py-2 rounded-md w-[182px] h-[47px]">
					{t("sales.common.execute")}
				</Button>
			</div>
		</div>
	);
}
