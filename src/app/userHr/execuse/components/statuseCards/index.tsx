import AddCustomers from "@/app/companies/Customers/components/AddCustomers";
import CustomPopUp from "@/components/popups";
import React from "react";
import InOutPopUp from "../InAndOutPopUp";

export default function StatusCard({
	type,
}: {
	type: "pending" | "accepted" | "done" | "denied";
}) {
	const typeBgColor: Record<
		"pending" | "accepted" | "done" | "denied",
		string
	> = {
		pending: "#FFF5C5",
		accepted: "#8DFB90",
		denied: "#FFDCDC",
		done: "#DCD2FF",
	};
	const typeTextColor: Record<
		"pending" | "accepted" | "done" | "denied",
		string
	> = {
		pending: "#E27D00",
		accepted: "#04910C",
		denied: "#FF0000",
		done: "#7F27FF",
	};
	const Trnalation: Record<"pending" | "accepted" | "done" | "denied", string> =
		{
			accepted: "مقبول",
			pending: "في أنتظار الرد",
			done: "تمت",
			denied: "مرفوض",
		};
	return type === "accepted" ? (
		<CustomPopUp
			DialogTriggerComponent={() => (
					<div
						style={{
							background: typeBgColor[type],
							color: typeTextColor[type],
						}}
						className="w-[150px] py-1.5 px-2 h-[30px] rounded-[10px] bg-[#FFF5C5] text-[#E27D00] font-[500] text-[12px]"
					>
						{Trnalation[type]}
					</div>
			)}
			DialogContentComponent={() => <InOutPopUp />}
		/>
	) : (
		<div
			style={{
				background: typeBgColor[type],
				color: typeTextColor[type],
			}}
			className="w-[150px] py-1.5 px-2 h-[30px] rounded-[10px] bg-[#FFF5C5] text-[#E27D00] font-[500] text-[12px]"
		>
			{Trnalation[type]}
		</div>
	);
}
