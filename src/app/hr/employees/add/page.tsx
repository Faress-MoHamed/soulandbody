"use client";
import React, { forwardRef } from "react";
import EmployeesForm from ".";
import SelectableComponent from "@/components/selectableComponent";
import ProfessionalData from "./ProfessionalData";
import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { ButtonSubmit } from "./buttonSubmit";
interface ButtonSubmitProps {
	employeeId?: string | number | null;
	onFormSubmit?: () => void;
}

export default function page() {
	const { t } = useTypedTranslation();

	// Validation schema
	const EmployeeSchema = Yup.object().shape({
		email: Yup.string().required(
			t("professionalData.form.validation.email_required")
		),
		password: Yup.string().required(
			t("professionalData.form.validation.password_required")
		),
		totalsalary: Yup.number()
			.required(t("professionalData.form.validation.total_salary_required"))
			.positive(t("professionalData.form.validation.total_salary_positive")),
		facility: Yup.string().required(
			t("professionalData.form.validation.facility_required")
		),
		department: Yup.string().required(
			t("professionalData.form.validation.department_required")
		),
		userType: Yup.string().required(
			t("professionalData.form.validation.user_type_required")
		),
		workNature: Yup.string().required(
			t("professionalData.form.validation.work_nature_required")
		),
		netSalary: Yup.number()
			.required(t("professionalData.form.validation.net_salary_required"))
			.positive(t("professionalData.form.validation.net_salary_positive")),
		allowances: Yup.number()
			.required(t("professionalData.form.validation.allowances_required"))
			.positive(t("professionalData.form.validation.allowances_positive")),
	});

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			totalsalary: "",
			facility: "",
			department: "",
			userType: "",
			workNature: "",
			netSalary: "",
			allowances: "",
		},
		enableReinitialize: true,
		validationSchema: EmployeeSchema,
		onSubmit: async (values, { resetForm }) => {},
	});

	return (
		<SelectableComponent
			items={[
				{
					component: (
						<ProfessionalData
							ButtonSubmit={() => (
								<ButtonSubmit onFormSubmit={formik.handleSubmit} />
							)}
							formik={formik}
						/>
					),
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
