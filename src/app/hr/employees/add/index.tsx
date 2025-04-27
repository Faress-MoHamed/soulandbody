"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmployeeManagement from "@/app/hr/work-hours";
import CustomPopUp from "@/components/popups";
import FileUpload from "@/components/uploadFile";

import {
	useCreateEmployee,
	useUpdateEmployee,
	useEmployee,
	useGetAllFacilaties,
} from "../useEmployee";
import { useSearchParams, useRouter } from "next/navigation";
import LoadingIndicator from "@/components/loadingIndicator";
import { Suspense, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";
import CustomSelect from "@/components/customSelect";
import CustomInput from "@/components/customInput";

export default function EmployeesForm({
	employeeId,
	withTitle = true,
	withEmployeeManagement = true,
	CardStyle,
	mode = "edit", // Added mode prop
}: {
	employeeId?: any;
	CardStyle?: any;
	withTitle?: boolean;
	withEmployeeManagement?: boolean;
	mode?: "edit" | "view"; // Added mode type
}) {
	const { t } = useTypedTranslation();
	const router = useRouter();
	const [navigateLoading, setNavigateLoading] = useState(false);
	const [selectedWorkNature, setSelectedWorkNature] = useState("");
	const { mutate: createEmployee, isPending: createEmployeePending } =
		useCreateEmployee();
	const { mutate: updateEmployee, isPending: updateEmployeePending } =
		useUpdateEmployee();
	const { data: employee, isLoading } = useEmployee(employeeId ?? "");
	const buttonRef = useRef(null);
	// Validation schema using Yup
	const EmployeeSchema = Yup.object().shape({
		employee: Yup.string().required(
			t("employeeForm.validation.employee_required")
		),
		birthDate: Yup.date().required(
			t("employeeForm.validation.birthDate_required")
		),
		qualification: Yup.string().required(
			t("employeeForm.validation.qualification_required")
		),
		position: Yup.string().required(
			t("employeeForm.validation.position_required")
		),
		net_salary: Yup.number()
			.required(t("employeeForm.validation.net_salary_required"))
			.positive(t("employeeForm.validation.net_salary_positive")),
		date: Yup.date().required(t("employeeForm.validation.date_required")),
		work_nature: Yup.string().required(
			t("employeeForm.validation.work_nature_required")
		),
		extras: Yup.string().required(t("employeeForm.validation.extras_required")),
	});

	if (employeeId && isLoading) return <p>{t("employeeForm.loading")}</p>;

	return (
		<div className="space-y-2">
			{withTitle && (
				<>
					<p className="text-2xl font-bold mb-4 text-start">
						{t("employeeForm.title")}
					</p>
					<h1 className="text-2xl text-start">
						{employeeId
							? mode === "edit"
								? t("employeeForm.subtitle.edit")
								: "view"
							: t("employeeForm.subtitle.add")}
					</h1>
				</>
			)}

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
								employee: employee?.employee || "",
								birthDate: employee?.birthDate || "",
								qualification: employee?.qualification || "",
								position: employee?.position || "",
								net_salary: employee?.net_salary || "",
								date: employee?.date || "",
								work_nature: employee?.work_nature || "",
								extras: employee?.extras || "",
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
									{mode === "edit" && (
										<div className="text-end max-w-fit self-end">
											<CustomPopUp
												DialogTriggerComponent={() => (
													<Button
														type="button"
														className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-md px-4 py-2"
													>
														{t("employeeForm.buttons.attachments")}
													</Button>
												)}
												DialogContentComponent={() => (
													<Card className="lg:w-[650px]">
														<CardHeader>
															{t("employeeForm.buttons.attachments")}
														</CardHeader>
														<CardContent className="p-6 max-h-full overflow-auto">
															<FileUpload />
														</CardContent>
													</Card>
												)}
											/>
										</div>
									)}

									<div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
										{[
											{
												name: "employee",
												label: t("employeeForm.fields.employee"),
											},
											{
												name: "phoneNumber",
												label: t("employeeForm.fields.phoneNumber"),
											},
											{
												name: "address",
												label: t("employeeForm.fields.address"),
											},
											{
												name: "birthDate",
												label: t("employeeForm.fields.birthDate"),
												type: "date",
											},
											{
												name: "qualification",
												label: t("employeeForm.fields.qualification"),
											},
											{
												name: "position",
												label: t("employeeForm.fields.position"),
											},
										].map(({ name, label, type = "text" }) => (
											<Field name={name} key={name}>
												{({ field, meta }: any) => (
													<CustomInput
														{...field}
														type={type}
														label={label}
														disabled={mode !== "edit"}
														value={(values as any)?.[name as any] || "-"}
														className="md:min-w-[200px] min-w-full rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-start"
														error={
															meta.touched && meta.error ? meta.error : null
														}
													/>
												)}
											</Field>
										))}

										{[
											{
												name: "date",
												label: t("employeeForm.fields.date"),
												type: "date",
											},
										].map(({ name, label, type = "text" }) => (
											<Field name={name} key={name}>
												{({ field, meta }: any) => (
													<CustomInput
														{...field}
														type={type}
														label={label}
														disabled={mode !== "edit"}
														value={(values as any)?.[name as any] || "-"}
														className="md:min-w-[200px] min-w-full rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-start"
														error={
															meta.touched && meta.error ? meta.error : null
														}
													/>
												)}
											</Field>
										))}
									</div>

									{mode === "edit" && (
										<div
											className={cn(
												"text-start mt-6",
												`${
													selectedWorkNature ===
													t("employeeForm.fields.work_nature_options.varied")
														? "hidden"
														: ""
												}`
											)}
										>
											<Button
												type="submit"
												ref={buttonRef}
												className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md"
											>
												{employeeId
													? t("employeeForm.buttons.update")
													: t("employeeForm.buttons.save")}
											</Button>
										</div>
									)}
								</Form>
							)}
						</Formik>
					</CardContent>
				)}
			</Card>

			{withEmployeeManagement && (
				<div className="p-6">
					<EmployeeManagement mode={mode} />
				</div>
			)}
		</div>
	);
}
