"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import CustomSelect from "../customSelect";
import CustomInput from "../customInput";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";

export default function WarningPopUp() {
	const [warningType, setWarningType] = useState<string>("");
	const { t } = useTypedTranslation();
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission
		console.log("Form submitted");
	};

	return (
		<Card className="flex flex-col   bg-white p-4 gap-6 ">
			<CardHeader className="flex flex-row items-center justify-between ">
				<CardTitle className="text-center flex-1 text-xl">
					{t("warningPopup.disciplinaryActions")}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={handleSubmit}
					className="space-y-4 flex lg:flex-row flex-col items-end gap-2"
				>
					<div className="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full">
						<CustomSelect
							label={t("warningPopup.employeeName")}
							placeholder="احمد محمود"
							options={["thvscda", "cdadaca", "cacad"]}
						/>
						<CustomSelect
							label={t("warningPopup.warningType")}
							placeholder="احمد محمود"
							options={[
								{
									label: t("warningPopup.warningTypes.warning"),
									value: "warning",
								},
								{
									label: t("warningPopup.warningTypes.suspension"),
									value: "suspension",
								},
								{
									label: t("warningPopup.warningTypes.termination"),
									value: "termination",
								},
							]}
							onValueChange={setWarningType}
						/>

						{warningType === "suspension" && (
							<>
								<CustomInput label="من تاريخ" type="month" />
								<CustomInput label="إلى تاريخ" type="month" />
							</>
						)}
					</div>
					<div
						className={warningType === "suspension" ? "pb-[16px]" : "pb-[24px]"}
					>
						<Button
							type="submit"
							className="bg-emerald-500 hover:bg-emerald-600 p-0 py-[10px] px-3 w-[117px] h-[44px]  shadow-none border-[1px]"
						>
							حفظ
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
