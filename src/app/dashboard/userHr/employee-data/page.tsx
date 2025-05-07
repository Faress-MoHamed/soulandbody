"use client";
import { useDispatch } from "react-redux";
import { useEmployee } from "./hooks/useEmployee";
import EmployeesForm from "./index";
import ProfessionalData from "./ProfessionalData";
import SelectableComponent from "@/components/selectableComponent";
import React, { useEffect } from "react";
import { setEmployeeData } from "@/app/dashboard/hr/employees/add/createNewEmployee.slice";

export default function page() {
	const employeeQuery = useEmployee();
	const dispatch = useDispatch();

	// Update employee data when query data changes
	useEffect(() => {
		if (employeeQuery?.data) {
			dispatch(setEmployeeData(employeeQuery.data));
		}
	}, [employeeQuery?.data, dispatch]);

	return (
		<SelectableComponent
			items={[
				{
					component: <EmployeesForm mode="view" withTitle={false} />,
					label: "معلومات شخصية",
				},
				{
					component: <ProfessionalData />,
					label: "بيانات مهنية",
				},
			]}
			contentClassName="border"
			withTopPrinter={false}
		/>
	);
	// return <EmployeesForm mode="view" />;
}
