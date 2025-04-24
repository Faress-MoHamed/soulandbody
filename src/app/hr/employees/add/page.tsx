"use client";
import React from "react";
import EmployeesForm from ".";
import SelectableComponent from "@/components/selectableComponent";
import ProfessionalData from "./ProfessionalData";
import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";

export default function page() {
	const { t } = useTypedTranslation();
	return (
		<SelectableComponent
			items={[
				{
					component: <ProfessionalData />,
					label: t("professional_data"),
				},
				{
					component: <EmployeesForm withTitle={false} />,
					label: t("employee_info"),
				},
			]}
			contentClassName="border"
			withTopPrinter={false}
		/>
	);
	// return <EmployeesForm />;
}
