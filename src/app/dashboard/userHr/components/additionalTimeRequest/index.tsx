"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomInput from "@/components/customInput";
import { Button } from "@heroui/react";
import { useTranslations } from "next-intl";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { setOvertimeField, clearOvertimeData } from "./overTime.slice";
import { useCreateOvertime } from "./hooks/useOvertime";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";

export default function AdditionalTimeRequest({
	closePopUp,
}: {
	closePopUp?: () => void;
}) {
	const t = useTypedTranslation();
	const { overtime } = useTypedSelector((state) => state.overTime);
	const dispatch = useDispatch();
	const [errors, setErrors] = React.useState<{
		hours?: string;
		minutes?: string;
	}>({});

	const handleChange = (field: keyof typeof overtime, value: any) => {
		console.log("valueee", value);
		console.log("overtimeeeeeee", overtime);
		console.log("all", { valueee: value, overtimeeeeeee: overtime });
		dispatch(setOvertimeField({ field, value: value }));
	};

	const { mutate, isPending } = useCreateOvertime();

const handleSendData = async () => {
	const today = new Date().toISOString().split("T")[0]; // Get today's date

	// Extract hours and minutes from overtime_start and overtime_end
	const hours = overtime?.overtime_start ? Number(overtime?.overtime_start) : 0;
	const minutes = overtime?.overtime_end ? Number(overtime?.overtime_end) : 0;

	await mutate(
		{
			date: today,
			hours,
			minutes,
		},
		{
			onSuccess: () => {
				dispatch(clearOvertimeData());
				closePopUp?.();
			},
			onError: () => {
				closePopUp?.();
			},
		}
	);
};


	return (
		<Card className="flex flex-col px-6 py-9 gap-6 md:w-fit md:h-fit">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
					{"popupTitle"}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid md:grid-cols-2 grid-cols-1 gap-6 place-items-end">
					<CustomInput
						type="text"
						label={"hours"}
						value={overtime?.overtime_start}
						error={errors.hours}
						onChange={(e) => handleChange("overtime_start", e.target.value)} // `overtime_start` maps to `hours` now
					/>

					<CustomInput
						type="text"
						label={"minutes"}
						value={overtime?.overtime_end}
						onChange={(e) => handleChange("overtime_end", e.target.value)} // `overtime_end` maps to `minutes` now
						error={errors.minutes}
					/>
				</div>
				<div className="flex justify-center mt-6">
					<Button
						onPress={handleSendData}
						isLoading={isPending}
						disabled={isPending}
						className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[148px] h-[48px]"
					>
						{/* {"submit"} */}
						submit
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
