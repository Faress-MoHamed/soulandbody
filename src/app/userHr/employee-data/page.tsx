import EmployeesForm from "@/app/hr/employees/add";
import ProfessionalData from "@/app/hr/employees/add/ProfessionalData";
import SelectableComponent from "@/components/selectableComponent";
import React from "react";

export default function page() {
	return (
		<SelectableComponent
			items={[
				{
					component: <EmployeesForm mode="view" withTitle={false} />,
					label: "معلومات شخصية",
				},
				{
					component: <ProfessionalData/>,
					label: "بيانات مهنية",
				},
			]}
			contentClassName="border"
			withTopPrinter={false}
		/>
	);
	// return <EmployeesForm mode="view" />;
}
