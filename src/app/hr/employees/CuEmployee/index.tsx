"use client";
import React, { useRef } from "react";
import SelectableComponent from "@/components/selectableComponent";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import EmployeeInformationFormContent from "../add/index";
import { Button } from "@/components/ui/button";
import { useCreateEmployee, useUpdateEmployee } from "../useEmployee";
import LoadingIndicator from "@/components/loadingIndicator";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import ProfessionalDataForm from "../add/ProfessionalData";

export default function CuEmployee() {
	const { t } = useTypedTranslation();
	const submitButtonRef = useRef<HTMLButtonElement>(null);
	const employee = useTypedSelector((state) => state.employee.employee);
	const { mutate: createEmployee, isPending: createEmployeePending } =
		useCreateEmployee();
	const { mutate: updateEmployee, isPending: updateEmployeePending } =
		useUpdateEmployee();

	// Common submit button component
	const SharedSubmitButton = React.forwardRef((props: any, ref: any) => (
		<div className="text-start mt-6">
			<Button
				ref={ref}
				className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md"
				onClick={(e) => {
					e.preventDefault();
					console.log(props.onClick);
					props?.onClick && props?.onClick();
					createEmployee(employee);
				}}
			>
				{props.employeeId
					? t("employeeForm.buttons.update")
					: t("employeeForm.buttons.save")}
			</Button>
		</div>
	));

	if (createEmployeePending || updateEmployeePending) {
		return <LoadingIndicator />;
	}

	return (
		<SelectableComponent
			items={[
				{
					component: (
						<ProfessionalDataForm
							ButtonSubmit={(props) => (
								<SharedSubmitButton ref={submitButtonRef} {...props} />
							)}
						/>
					),
					label: t("professional_data"),
				},
				{
					component: (
						<div className="space-y-2">
							<EmployeeInformationFormContent
								withTitle={false}
								ButtonSubmit={(props) => (
									<SharedSubmitButton ref={submitButtonRef} {...props} />
								)}
							/>
						</div>
					),
					label: t("employee_info"),
				},
			]}
			contentClassName="border"
			withTopPrinter={false}
		/>
	);
}
