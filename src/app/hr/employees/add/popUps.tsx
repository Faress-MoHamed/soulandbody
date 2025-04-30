"use client";

import { useTranslations } from "next-intl";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import {
	setEmployeeData,
	employeeInitialValues,
} from "./createNewEmployee.slice";
import { useState } from "react";

interface LeaveCardProps {
	header: string;
	label: string;
	buttonText: string;
	value?: any;
	onClick?: any;
	field: keyof typeof employeeInitialValues;
	ButtonSubmit?: React.ComponentType<any>;
}


export default function LeaveCard({
	header,
	label,
	value,
	field,
	onClick,
	buttonText,
}: LeaveCardProps) {
	const dispatch = useDispatch(); // Initialize the dispatch function
	const employee = useTypedSelector((state) => state.employee.employee);

	// Store the input value in local state
	const [localValue, setLocalValue] = useState(value);

	// Update local value when input changes
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocalValue(e.target.value);
	};

	// Handle the button click to dispatch the saved data
	const handleButtonClick = () => {
		dispatch(setEmployeeData({ [field]: localValue }));
		if (onClick) {
			onClick(localValue); // If there is an additional onClick handler, call it
		}
	};

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
						value={localValue}
						onChange={handleInputChange} // Use the local value
						className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-start justify-end"
						type="number"
					/>
				</div>
				<Button
					className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[182px] h-[47px]"
					onClick={handleButtonClick} // Handle button click
				>
					{buttonText}
				</Button>
			</CardContent>
		</Card>
	);
}

export function SickLeave({
	ButtonSubmit,
	closePopup,
}: {
	ButtonSubmit?: React.ComponentType<any>;
	closePopup?: any;
}) {
	const t = useTranslations();
	return (
		<LeaveCard
			ButtonSubmit={ButtonSubmit}
			onClick={closePopup}
			header={t("professionalData.employeeForm.leave.header.sick")}
			label={t("professionalData.employeeForm.leave.days_count")}
			buttonText={t("professionalData.employeeForm.leave.buttons.save")}
			field="sick_leave_balance"
		/>
	);
}

export function TotalLeave({
	ButtonSubmit,
	closePopup
}: {
	ButtonSubmit?: React.ComponentType<any>;
	closePopup?: any;
}) {
	const t = useTranslations();
	return (
		<LeaveCard
			ButtonSubmit={ButtonSubmit}
			onClick={closePopup}
			header={t("professionalData.employeeForm.leave.header.total")}
			label={t("professionalData.employeeForm.leave.days_count")}
			buttonText={t("professionalData.employeeForm.leave.buttons.save")}
			field={"vacation_balance"}
		/>
	);
}

export function RegularLeave({
	ButtonSubmit,
	closePopup
}: {
	ButtonSubmit?: React.ComponentType<any>;
	closePopup?: any;
}) {
	const t = useTranslations();
	return (
		<LeaveCard
			ButtonSubmit={ButtonSubmit}
			onClick={closePopup}
			header={t("professionalData.employeeForm.leave.header.regular")}
			label={t("professionalData.employeeForm.leave.days_count")}
			buttonText={t("professionalData.employeeForm.leave.buttons.save")}
			field="regular_leave_balance"
		/>
	);
}

export function ContinuousAbsence({
	ButtonSubmit,
	closePopup
}: {
	ButtonSubmit?: React.ComponentType<any>;
	closePopup?: any;
}) {
	const t = useTranslations();
	return (
		<LeaveCard
			ButtonSubmit={ButtonSubmit}
			onClick={closePopup}
			header={t(
				"professionalData.employeeForm.leave.header.continuous_absence"
			)}
			label={t("professionalData.employeeForm.leave.days_count")}
			buttonText={t("professionalData.employeeForm.leave.buttons.save")}
			field={"continous_balance"}
		/>
	);
}

export function SeparateAbsence({
	ButtonSubmit,
	closePopup
}: {
	ButtonSubmit?: React.ComponentType<any>;
	closePopup?: any;
}) {
	const t = useTranslations();
	return (
		<LeaveCard
			ButtonSubmit={ButtonSubmit}
			onClick={closePopup}
			header={t("professionalData.employeeForm.leave.header.separate_absence")}
			label={t("professionalData.employeeForm.leave.days_count")}
			buttonText={t("professionalData.employeeForm.leave.buttons.save")}
			field="separate_balance"
		/>
	);
}

export function EmergencyLeave({
	ButtonSubmit,
	closePopup
}: {
	ButtonSubmit?: React.ComponentType<any>;
	closePopup?: any;
}) {
	const t = useTranslations();
	return (
		<LeaveCard
			ButtonSubmit={ButtonSubmit}
			onClick={closePopup}
			header={t("professionalData.employeeForm.leave.header.emergency")}
			label={t("professionalData.employeeForm.leave.days_count")}
			buttonText={t("professionalData.employeeForm.leave.buttons.save")}
			field="casual_leave_balance"
		/>
	);
}
