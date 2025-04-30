"use client";

import React from "react";
import CustomPopUp from "@/components/popups";
import { useTranslations } from "next-intl";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import CustomSelect from "@/components/customSelect";
import { useUpdateVacations } from "../../hook/useHrVacations";

export default function StatusButton({
	status,
	id,
}: {
	status:
		| "pending"
		| "accepted"
		| "rejected"
		| "deduction-days-with-permission";
	id?: string;
}) {
	const { mutate: updateStatus, isPending } = useUpdateVacations(id || "");
	const t = useTranslations("vacationstatus");
	const typeBgColor: Record<typeof status, string> = {
		pending: "#FFF5C5",
		accepted: "#8DFB90",
		rejected: "#FFDCDC",
		"deduction-days-with-permission": "#DCD2FF",
	};

	const typeTextColor: Record<typeof status, string> = {
		pending: "#E27D00",
		accepted: "#04910C",
		rejected: "#FF0000",
		"deduction-days-with-permission": "#7F27FF",
	};

	const sharedClasses =
		"w-[150px] py-1.5 px-2 h-[30px] rounded-[10px] font-[500] text-[12px]";

	const content = (
		<div
			style={{
				background: typeBgColor[status],
				color: typeTextColor[status],
			}}
			className={`${sharedClasses} ${
				status !== "accepted" ? "opacity-70" : ""
			}`}
		>
			{t(status)}
		</div>
	);

	return status === "pending" ? (
		<CustomSelect
			options={[
				"pending",
				"accepted",
				"rejected",
				"deduction-days-with-permission",
			]}
			disabled={isPending}
			onValueChange={(value) => {
				updateStatus({ status: value });
			}}
			triggerStyle={{
				background: typeBgColor[status],
				color: typeTextColor[status],
			}}
		/>
	) : (
		content
	);
}
