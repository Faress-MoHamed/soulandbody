import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import { useTranslations } from "next-intl";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";

const Transaction = () => {
	const { t } = useTypedTranslation();
	return (
		<Card className="flex flex-col p-4 gap-6">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
					{t("salesInvoicesTable.transaction.title")}
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col justify-center items-center gap-4">
				<div className="flex gap-5 md:flex-row flex-col self-stretch content-start items-start justify-center">
					<div className="flex flex-col gap-1 md:w-[302px] w-full items-start">
						<label>
							{t("salesInvoicesTable.transaction.checkNumberLabel")}
						</label>
						<Input
							className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-right"
							type="number"
						/>
					</div>
					<div className="flex flex-col gap-1 md:w-[302px] w-full items-start">
						<label>
							{t("salesInvoicesTable.transaction.checkAmountLabel")}
						</label>
						<Input
							className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-right"
							type="number"
						/>
					</div>
				</div>
				<Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[182px] h-[47px]">
					{t("salesInvoicesTable.transaction.saveButton")}
				</Button>
			</CardContent>
		</Card>
	);
};

export default Transaction;
