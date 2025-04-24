"use client";

import React from "react";
import CustomPopUp from "@/components/popups";
import InOutPopUp from "../InAndOutPopUp";
import { useTranslations } from "next-intl";

export default function StatusCard({
	type,
}: {
	type: "pending" | "accepted" | "done" | "denied";
}) {
	const t = useTranslations("userHr.statuses");

	const typeBgColor: Record<typeof type, string> = {
		pending: "#FFF5C5",
		accepted: "#8DFB90",
		denied: "#FFDCDC",
		done: "#DCD2FF",
	};

	const typeTextColor: Record<typeof type, string> = {
		pending: "#E27D00",
		accepted: "#04910C",
		denied: "#FF0000",
		done: "#7F27FF",
	};

	const sharedClasses =
		"w-[150px] py-1.5 px-2 h-[30px] rounded-[10px] font-[500] text-[12px]";

	const content = (
		<div
			style={{
				background: typeBgColor[type],
				color: typeTextColor[type],
			}}
			className={`${sharedClasses} ${type !== "accepted" ? "opacity-70" : ""}`}
		>
			{t(type)}
		</div>
	);

	return type === "accepted" ? (
		<CustomPopUp
			DialogTriggerComponent={() => content}
			DialogContentComponent={() => <InOutPopUp />}
		/>
	) : (
		content
	);
}
