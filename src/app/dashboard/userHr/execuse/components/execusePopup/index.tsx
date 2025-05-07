import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomInput from "@/components/customInput";
import { Button } from "@heroui/react";
import { useTranslations } from "next-intl";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { setExecutionsField } from "../../executions.slice";
import { useCreateExecutions } from "../../hooks/useExecuses";

export default function ExecusePopup({ closePopUp }: { closePopUp?: any }) {
	const t = useTranslations("userHr.execusesPopUp");
	const { executions } = useTypedSelector((state) => state.executions);
	const dispatch = useDispatch();
	const handleChange = (field: keyof typeof executions, value: any) => {
		dispatch(setExecutionsField({ field, value }));
	};
	const { mutate, isPending } = useCreateExecutions();
	const handleSendData = async () => {
		await mutate(
			{
				...executions,
				permission_date: new Date().toISOString().split("T")[0],
			},
			{
				onSuccess: () => {
					closePopUp();
				},
				onError: () => {
					closePopUp();
				},
			}
		);
	};

	return (
		<Card className="flex flex-col px-6 py-9 gap-6 md:w-fit md:h-fit">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
					{t("popupTitle")}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid md:grid-cols-3 grid-cols-1 gap-6 place-items-end">
					<CustomInput
						value={executions.permission_start}
						type="time"
						label={t("start")}
						onChange={(e) => handleChange("permission_start", e.target.value)}
					/>
					<CustomInput
						value={executions.permission_end}
						type="time"
						label={t("end")}
						onChange={(e) => handleChange("permission_end", e.target.value)}
					/>
					<CustomInput
						onChange={(e) => handleChange("reason", e.target.value)}
						value={executions.reason}
						label={t("reason")}
					/>
				</div>
				<div className="flex md:mt-0 mt-3">
					<Button
						onPress={handleSendData}
						isLoading={isPending}
						disabled={isPending}
						className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[148px] h-[48px] md:mt-8"
					>
						{t("submit")}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
