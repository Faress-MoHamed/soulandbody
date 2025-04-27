"use client";

import { useTranslations } from "next-intl";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LeaveCardProps {
	header: string;
	label: string;
	buttonText: string;
}

export default function LeaveCard({
	header,
	label,
	buttonText,
}: LeaveCardProps) {
	return (
		<Card className="flex flex-col bg-gray-100 p-4 gap-6">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
					{header}
				</CardTitle>
			</CardHeader>
			<CardContent className="flex md:flex-row flex-col items-end gap-4">
				<div className="flex flex-col gap-1 md:w-[302px] w-full items-start">
					<label>{label}</label>
					<Input
						className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-start justify-end"
						type="number"
					/>
				</div>
				<Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[182px] h-[47px]">
					{buttonText}
				</Button>
			</CardContent>
		</Card>
	);
}

export function SickLeave() {
	const t = useTranslations();
	return (
		<LeaveCard
			header={t("professionalData.employeeForm.leave.header.sick")}
			label={t("professionalData.employeeForm.leave.days_count")}
			buttonText={t("professionalData.employeeForm.leave.buttons.save")}
		/>
	);
}

export function TotalLeave() {
	const t = useTranslations();
	return (
		<LeaveCard
			header={t("professionalData.employeeForm.leave.header.total")}
			label={t("professionalData.employeeForm.leave.days_count")}
			buttonText={t("professionalData.employeeForm.leave.buttons.save")}
		/>
	);
}

export function RegularLeave() {
	const t = useTranslations();
	return (
		<LeaveCard
			header={t("professionalData.employeeForm.leave.header.regular")}
			label={t("professionalData.employeeForm.leave.days_count")}
			buttonText={t("professionalData.employeeForm.leave.buttons.save")}
		/>
	);
}

export function ContinuousAbsence() {
	const t = useTranslations();
	return (
		<LeaveCard
			header={t(
				"professionalData.employeeForm.leave.header.continuous_absence"
			)}
			label={t("professionalData.employeeForm.leave.days_count")}
			buttonText={t("professionalData.employeeForm.leave.buttons.save")}
		/>
	);
}

export function SeparateAbsence() {
	const t = useTranslations();
	return (
		<LeaveCard
			header={t("professionalData.employeeForm.leave.header.separate_absence")}
			label={t("professionalData.employeeForm.leave.days_count")}
			buttonText={t("professionalData.employeeForm.leave.buttons.save")}
		/>
	);
}

export function EmergencyLeave() {
	const t = useTranslations();
	return (
		<LeaveCard
			header={t("professionalData.employeeForm.leave.header.emergency")}
			label={t("professionalData.employeeForm.leave.days_count")}
			buttonText={t("professionalData.employeeForm.leave.buttons.save")}
		/>
	);
}
