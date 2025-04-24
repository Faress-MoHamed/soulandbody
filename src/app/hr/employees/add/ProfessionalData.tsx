"use client";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter, useParams } from "next/navigation";
import { Suspense, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import CustomSelect from "@/components/customSelect";
import CustomInput from "@/components/customInput";
import LoadingIndicator from "@/components/loadingIndicator";
import {
	useCreateEmployee,
	useUpdateEmployee,
	useEmployee,
} from "../useEmployee";
import CustomPopUp from "@/components/popups";
import EmployeeManagement from "../../work-hours";
import FileUpload from "@/components/uploadFile";

export default function ProfessionalData({
	employeeId,
	withTitle = true,
	withEmployeeManagement = true,
	CardStyle,
	mode = "edit", // Added mode prop with default as edit
}: {
	mode?: "edit" | "view";
	employeeId?: any;
	withTitle?: any;
	withEmployeeManagement?: any;
	CardStyle?: any;
}) {
	const t = useTranslations();
	const router = useRouter();
	const [navigateLoading, setNavigateLoading] = useState(false);
	const [selectedWorkNature, setSelectedWorkNature] = useState("");

	const { mutate: createEmployee, isPending: createEmployeePending } =
		useCreateEmployee();
	const { mutate: updateEmployee, isPending: updateEmployeePending } =
		useUpdateEmployee();
	const { data: employee, isLoading } = useEmployee(employeeId ?? "");

	const SickLeave = () => (
		<LeaveCard
			header={t("professionalData.employeeForm.leave.header.sick")}
			label={t("professionalData.employeeForm.leave.days_count")}
			buttonText={t("professionalData.employeeForm.leave.buttons.save")}
		/>
	);

	const TotalLeave = () => (
		<LeaveCard
			header={t("professionalData.employeeForm.leave.header.total")}
			label={t("professionalData.employeeForm.leave.days_count")}
			buttonText={t("professionalData.employeeForm.leave.buttons.save")}
		/>
	);

	const RegularLeave = () => (
		<LeaveCard
			header={t("professionalData.employeeForm.leave.header.regular")}
			label={t("professionalData.employeeForm.leave.days_count")}
			buttonText={t("professionalData.employeeForm.leave.buttons.save")}
		/>
	);

	const ContinuousAbsence = () => (
		<LeaveCard
			header={t(
				"professionalData.employeeForm.leave.header.continuous_absence"
			)}
			label={t("professionalData.employeeForm.leave.days_count")}
			buttonText={t("professionalData.employeeForm.leave.buttons.save")}
		/>
	);

	const SeparateAbsence = () => (
		<LeaveCard
			header={t("professionalData.employeeForm.leave.header.separate_absence")}
			label={t("professionalData.employeeForm.leave.days_count")}
			buttonText={t("professionalData.employeeForm.leave.buttons.save")}
		/>
	);

	const EmergencyLeave = () => (
		<LeaveCard
			header={t("professionalData.employeeForm.leave.header.emergency")}
			label={t("professionalData.employeeForm.leave.days_count")}
			buttonText={t("professionalData.employeeForm.leave.buttons.save")}
		/>
	);

	const LeaveCard = ({ header, label, buttonText }: any) => {
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
	};

	const buttonRef = useRef(null);

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

	if (employeeId && isLoading)
		return <p>{t("professionalData.form.loading")}</p>;

	return (
		<div className="space-y-2">
			<Card
				className={cn(
					"border-none bg-transparent shadow-none rounded-md p-6",
					CardStyle
				)}
			>
				{createEmployeePending || updateEmployeePending || navigateLoading ? (
					<LoadingIndicator />
				) : (
					<CardContent className="p-0">
						<Formik
							initialValues={{
								email: employee?.email || "",
								password: employee?.password || "",
								totalsalary: employee?.totalsalary || "",
								facility: employee?.facility || "",
								department: employee?.department || "",
								userType: employee?.userType || "",
								workNature: employee?.workNature || "",
								netSalary: employee?.netSalary || "",
								allowances: employee?.allowances || "",
							}}
							enableReinitialize={true}
							validationSchema={mode === "edit" ? EmployeeSchema : null} // Only validate in edit mode
							onSubmit={async (values, { resetForm }) => {
								if (mode !== "edit") return; // Don't allow submission in view mode

								const stringifiedValues = Object.fromEntries(
									Object.entries(values).map(([key, value]) => [
										key,
										String(value),
									])
								);

								if (employeeId) {
									await updateEmployee({
										id: Number(employeeId),
										employee: stringifiedValues,
									});
								} else {
									await createEmployee(stringifiedValues);
								}

								setNavigateLoading(true);
								resetForm();
								router.push("/hr/employees");
							}}
						>
							{({ handleSubmit, values }) => (
								<Form
									onSubmit={handleSubmit}
									className="space-y-6 flex flex-col"
								>
									<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
										{/* First Row */}
										<Field name="email">
											{({ field, meta }: any) => (
												<CustomInput
													label={t("professionalData.form.fields.email")}
													{...field}
													disabled={mode !== "edit"}
													value={values.email || "-"}
													type="text"
													className="md:min-w-[200px] min-w-full rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-start"
													error={meta.touched && meta.error ? meta.error : null}
												/>
											)}
										</Field>

										<Field name="password">
											{({ field, meta }: any) => (
												<CustomInput
													label={t("professionalData.form.fields.password")}
													{...field}
													disabled={mode !== "edit"}
													value={values.password || "••••••••"}
													type="password"
													className="md:min-w-[200px] min-w-full rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-start"
													error={meta.touched && meta.error ? meta.error : null}
												/>
											)}
										</Field>

										<Field name="totalsalary">
											{({ field, meta }: any) => (
												<CustomInput
													{...field}
													label={t("professionalData.form.fields.total_salary")}
													disabled={mode !== "edit"}
													value={values.totalsalary || "-"}
													type="number"
													className="md:min-w-[200px] min-w-full rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-start"
													error={meta.touched && meta.error ? meta.error : null}
												/>
											)}
										</Field>
										<div></div>

										{/* Second Row */}
										<Field name="facility">
											{({ field, form, meta }: any) => (
												<CustomSelect
													label={t("professionalData.form.fields.facility")}
													options={["مصنع", "مكتب", "فرع"]}
													onValueChange={(value) => {
														form.setFieldValue("facility", value);
													}}
													disabled={mode !== "edit"}
													value={values.facility || "-"}
													className="text-start"
													error={meta.touched && meta.error ? meta.error : null}
												/>
											)}
										</Field>

										<Field name="department">
											{({ field, form, meta }: any) => (
												<CustomSelect
													label={t("professionalData.form.fields.department")}
													options={["تصنيع", "إدارة", "مبيعات", "محاسبة"]}
													onValueChange={(value) => {
														form.setFieldValue("department", value);
													}}
													disabled={mode !== "edit"}
													value={values.password || "-"}
													className="text-start"
													error={meta.touched && meta.error ? meta.error : null}
												/>
											)}
										</Field>

										<Field name="userType">
											{({ field, form, meta }: any) => (
												<CustomSelect
													label={t("professionalData.form.fields.user_type")}
													options={["user", "admin", "manager"]}
													onValueChange={(value) => {
														form.setFieldValue("userType", value);
													}}
													disabled={mode !== "edit"}
													value={values.userType || "-"}
													className="text-start"
													error={meta.touched && meta.error ? meta.error : null}
												/>
											)}
										</Field>
										<div></div>

										{/* Third Row */}
										<Field name="workNature">
											{({ field, form, meta }: any) => (
												<CustomSelect
													label={t("professionalData.form.fields.work_nature")}
													options={["متنوع", "دوام كامل", "دوام جزئي"]}
													onValueChange={(value) => {
														form.setFieldValue("workNature", value);
														setSelectedWorkNature(value);
													}}
													className="
														text-start"
													error={meta.touched && meta.error ? meta.error : null}
													disabled={mode !== "edit"}
													value={values.workNature || "-"}
												/>
											)}
										</Field>

										<Field name="netSalary">
											{({ field, meta }: any) => (
												<CustomInput
													label={t("professionalData.form.fields.net_salary")}
													{...field}
													type="number"
													className="md:min-w-[200px] min-w-full rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-start"
													error={meta.touched && meta.error ? meta.error : null}
													disabled={mode !== "edit"}
													value={values.netSalary || "-"}
												/>
											)}
										</Field>

										<Field name="allowances">
											{({ field, meta }: any) => (
												<CustomInput
													{...field}
													label={t("professionalData.form.fields.allowances")}
													type="number"
													className="md:min-w-[200px] min-w-full rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-start"
													error={meta.touched && meta.error ? meta.error : null}
													disabled={mode !== "edit"}
													value={values.allowances || "-"}
												/>
											)}
										</Field>
										<div></div>
									</div>

									{mode === "edit" && (
										<div className="text-start mt-6">
											<Button
												type="submit"
												ref={buttonRef}
												className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md"
											>
												{employeeId
													? t("professionalData.form.buttons.update")
													: t("professionalData.form.buttons.save")}
											</Button>
										</div>
									)}
								</Form>
							)}
						</Formik>
					</CardContent>
				)}
			</Card>

			{withEmployeeManagement &&
				(selectedWorkNature === "متنوع" || mode !== "edit") && (
					<div className="mt-8 p-6">
						<EmployeeManagement
							mode={mode}
							saveHandler={
								mode === "edit"
									? () => {
											if (buttonRef?.current) {
												(buttonRef?.current as any)?.click();
											}
									  }
									: undefined
							}
						/>
					</div>
				)}

			<ul className="p-6 text-[18px] flex flex-col md:gap-1 gap-1">
				<li className="flex flex-wrap">
					{t("employeeForm.leave.policy.intro")}
					<CustomPopUp
						DialogTriggerComponent={() => (
							<Button
								type="button"
								variant={"link"}
								className="px-1 text-[#129D66] text-[18px] py-0 h-fit font-semibold"
							>
								{t("employeeForm.leave.policy.total_days")}
							</Button>
						)}
						DialogContentComponent={() => <TotalLeave />}
					/>
					{t("employeeForm.leave.policy.divided_into")}
					<CustomPopUp
						DialogTriggerComponent={() => (
							<Button
								type="button"
								variant={"link"}
								className="px-1 text-[#129D66] text-[18px] py-0 h-fit font-semibold"
							>
								{t("employeeForm.leave.policy.regular_days")}
							</Button>
						)}
						DialogContentComponent={() => <RegularLeave />}
					/>
					{t("employeeForm.leave.policy.and")}
					<CustomPopUp
						DialogTriggerComponent={() => (
							<Button
								type="button"
								variant={"link"}
								className="px-1 text-[#129D66] text-[18px] py-0 h-fit font-semibold"
							>
								{t("employeeForm.leave.policy.emergency_days")}
							</Button>
						)}
						DialogContentComponent={() => <EmergencyLeave />}
					/>
					{t("employeeForm.leave.policy.and")}
					<CustomPopUp
						DialogTriggerComponent={() => (
							<Button
								type="button"
								variant={"link"}
								className="px-1 text-[#129D66] text-[18px] py-0 h-fit font-semibold"
							>
								{t("employeeForm.leave.policy.sick_days")}
							</Button>
						)}
						DialogContentComponent={() => <SickLeave />}
					/>
				</li>
				<li>{t("employeeForm.leave.policy.exceed_notice")}</li>
				<li className="flex flex-wrap">
					{t("employeeForm.leave.policy.absence_intro")}
					<CustomPopUp
						DialogTriggerComponent={() => (
							<Button
								type="button"
								variant={"link"}
								className="px-1 text-[#129D66] text-[18px] py-0 h-fit font-semibold"
							>
								{t("employeeForm.leave.policy.continuous_absence")}
							</Button>
						)}
						DialogContentComponent={() => <ContinuousAbsence />}
					/>
					{t("employeeForm.leave.policy.or")}
					<CustomPopUp
						DialogTriggerComponent={() => (
							<Button
								type="button"
								variant={"link"}
								className="px-1 text-[#129D66] text-[18px] py-0 h-fit font-semibold"
							>
								{t("employeeForm.leave.policy.separate_absence")}
							</Button>
						)}
						DialogContentComponent={() => <SeparateAbsence />}
					/>
					{t("employeeForm.leave.policy.termination_notice")}
				</li>
			</ul>
		</div>
	);
}
