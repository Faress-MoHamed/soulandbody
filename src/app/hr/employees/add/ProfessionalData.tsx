"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
	useGetAllFacilaties,
	useGetAlldepartments,
} from "../useEmployee";
import CustomPopUp from "@/components/popups";
import EmployeeManagement from "../../work-hours";
import {
	SickLeave,
	TotalLeave,
	RegularLeave,
	ContinuousAbsence,
	SeparateAbsence,
	EmergencyLeave,
} from "./popUps";
export default function ProfessionalData({
	employeeId,
	withTitle = true,
	withEmployeeManagement = true,
	CardStyle,
	ButtonSubmit,
	formik,
}: {
	mode?: "edit" | "view";
	employeeId?: any;
	withTitle?: any;
	withEmployeeManagement?: any;
	CardStyle?: any;
	formik?: any;
	ButtonSubmit?: any;
}) {
	const t = useTranslations();
	const [selectedWorkNature, setSelectedWorkNature] = useState("");

	// const { mutate: createEmployee, isPending: createEmployeePending } =
	// 	useCreateEmployee();
	// const { mutate: updateEmployee, isPending: updateEmployeePending } =
	// 	useUpdateEmployee();
	// const { data: employee, isLoading } = useEmployee(employeeId ?? "");



	const buttonRef = useRef(null);

	const { data: allFacilaties, isLoading: facilatiesLoading } =
		useGetAllFacilaties();
	const { data: alldepartments, isLoading: departmentsLoading } =
		useGetAlldepartments();

	// if (employeeId && isLoading)
	// 	return <p>{t("professionalData.form.loading")}</p>;

	return (
		<div className="space-y-2">
			<Card
				className={cn(
					"border-none bg-transparent shadow-none rounded-md p-6",
					CardStyle
				)}
			>
				{false? (
					<LoadingIndicator />
				) : (
					<CardContent className="p-0">
						<form
							onSubmit={formik.handleSubmit}
							className="space-y-6 flex flex-col"
						>
							<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
								{/* First Row */}
								<CustomInput
									label={t("professionalData.form.fields.email")}
									name="email"
									value={formik.values.email || "-"}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									// disabled={mode !== "edit"}
									type="text"
									className="md:min-w-[200px] min-w-full rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-start"
									error={
										formik.touched.email && formik.errors.email
											? formik.errors.email
											: null
									}
								/>

								<CustomInput
									label={t("professionalData.form.fields.password")}
									name="password"
									value={formik.values.password}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									// disabled={mode !== "edit"}
									className="md:min-w-[200px] min-w-full rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-start"
									error={
										formik.touched.password && formik.errors.password
											? formik.errors.password
											: null
									}
								/>

								<CustomInput
									label={t("professionalData.form.fields.total_salary")}
									name="totalsalary"
									value={formik.values.totalsalary || "-"}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									// disabled={mode !== "edit"}
									type="number"
									className="md:min-w-[200px] min-w-full rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-start"
									error={
										formik.touched.totalsalary && formik.errors.totalsalary
											? formik.errors.totalsalary
											: null
									}
								/>
								<div></div>

								{/* Second Row */}
								<CustomSelect
									label={t("professionalData.form.fields.facility")}
									name="facility"
									options={allFacilaties?.map((el: { name: any; id: any }) => ({
										label: el?.name,
										value: el?.id,
									}))}
									onValueChange={(value) => {
										formik.setFieldValue("facility", value);
									}}
									loading={facilatiesLoading}
									// disabled={mode !== "edit"}
									value={formik.values.facility || "-"}
									className="text-start"
									error={
										formik.touched.facility && formik.errors.facility
											? formik.errors.facility
											: null
									}
								/>

								<CustomSelect
									label={t("professionalData.form.fields.department")}
									name="department"
									options={alldepartments?.map(
										(el: { name: any; id: any }) => ({
											label: el?.name,
											value: el?.id,
										})
									)}
									onValueChange={(value) => {
										formik.setFieldValue("department", value);
									}}
									loading={departmentsLoading}
									// disabled={mode !== "edit"}
									value={formik.values.department || "-"}
									className="text-start"
									error={
										formik.touched.department && formik.errors.department
											? formik.errors.department
											: null
									}
								/>

								<CustomSelect
									label={t("professionalData.form.fields.user_type")}
									name="userType"
									options={["user", "admin", "manager"]}
									onValueChange={(value) => {
										formik.setFieldValue("userType", value);
									}}
									// disabled={mode !== "edit"}
									value={formik.values.userType || "-"}
									className="text-start"
									error={
										formik.touched.userType && formik.errors.userType
											? formik.errors.userType
											: null
									}
								/>
								<div></div>

								{/* Third Row */}
								<CustomSelect
									label={t("professionalData.form.fields.work_nature")}
									name="workNature"
									options={["full_time", "various"]}
									onValueChange={(value) => {
										formik.setFieldValue("workNature", value);
										setSelectedWorkNature(value);
									}}
									className="text-start"
									error={
										formik.touched.workNature && formik.errors.workNature
											? formik.errors.workNature
											: null
									}
									// disabled={mode !== "edit"}
									value={formik.values.workNature || "-"}
								/>

								<CustomInput
									label={t("professionalData.form.fields.net_salary")}
									name="netSalary"
									value={formik.values.netSalary || "-"}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									type="number"
									className="md:min-w-[200px] min-w-full rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-start"
									error={
										formik.touched.netSalary && formik.errors.netSalary
											? formik.errors.netSalary
											: null
									}
									// disabled={mode !== "edit"}
								/>

								<CustomInput
									label={t("professionalData.form.fields.allowances")}
									name="allowances"
									value={formik.values.allowances || "-"}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									type="number"
									className="md:min-w-[200px] min-w-full rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-start"
									error={
										formik.touched.allowances && formik.errors.allowances
											? formik.errors.allowances
											: null
									}
									// disabled={mode !== "edit"}
								/>
								<div></div>
							</div>

							{<ButtonSubmit ref={buttonRef} />}
						</form>
					</CardContent>
				)}
			</Card>

			{withEmployeeManagement && selectedWorkNature === "various" && (
				<div className="mt-8 p-6">
					<EmployeeManagement
						// mode={mode}
						saveHandler={() => {
							if (buttonRef?.current) {
								(buttonRef?.current as any)?.click();
							}
						}}
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
