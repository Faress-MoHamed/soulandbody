"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmployeeManagement from "@/app/work-hours";
import CustomPopUp from "@/components/popups";
import FileUpload from "@/components/uploadFile";
import CustomCard from "@/components/customCard";
import { Input } from "@/components/ui/input";
import {
	useCreateEmployee,
	useUpdateEmployee,
	useEmployee,
} from "../useEmployee";
import { useSearchParams, useRouter } from "next/navigation";
import LoadingIndicator from "@/components/loadingIndicator";
import { Suspense, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useTypedTranslation } from "@/app/hooks/useTypedTranslation"; // Import the translation hook

export default function EmployeesForm({
	employeeId,
	withTitle = true,
	withEmployeeManagement = true,
	CardStyle,
}: {
	employeeId?: any;
	CardStyle?: any;
	withTitle?: boolean;
	withEmployeeManagement?: boolean;
}) {
	const { t } = useTypedTranslation(); // Use the translation hook
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

	const SickLeave = () => {
		return (
			<Card className="flex flex-col bg-gray-100 p-4 gap-6 lg:w-[597px] w-[300px] lg:h-[219px] h-fit">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
						{t("employeeForm.leave.header.sick")}
					</CardTitle>
				</CardHeader>
				<CardContent className="flex md:flex-row flex-col items-end gap-4">
					<div className="flex flex-col gap-1 md:w-[302px] w-full items-start">
						<label>{t("employeeForm.leave.days_count")}</label>
						<Input
							className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-start justify-end"
							type="number"
						/>
					</div>
					<div>
						<Button
							type="submit"
							className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[182px] h-[47px]"
						>
							{t("employeeForm.leave.buttons.save")}
						</Button>
					</div>
				</CardContent>
			</Card>
		);
	};

	const TotalLeave = () => {
		return (
			<Card className="flex flex-col bg-gray-100 p-4 gap-6 lg:w-[597px] w-[300px] lg:h-[219px] h-fit">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
						{t("employeeForm.leave.header.total")}
					</CardTitle>
				</CardHeader>
				<CardContent className="flex md:flex-row flex-col items-end gap-4">
					<div className="flex flex-col gap-1 md:w-[302px] w-full items-start">
						<label>{t("employeeForm.leave.days_count")}</label>
						<Input
							className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-start"
							type="number"
						/>
					</div>
					<Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[182px] h-[47px]">
						{t("employeeForm.leave.buttons.save")}
					</Button>
				</CardContent>
			</Card>
		);
	};
	const RegularLeave = () => {
		return (
			<Card className="flex flex-col bg-gray-100 p-4 gap-6 lg:w-[597px] w-[300px] lg:h-[219px] h-fit">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
						<label>{t("employeeForm.leave.header.regular")}</label>
					</CardTitle>
				</CardHeader>
				<CardContent className="flex md:flex-row flex-col items-end gap-4">
					<div className="flex flex-col gap-1 md:w-[302px] w-full items-start">
						<label>{t("employeeForm.leave.days_count")}</label>
						<Input
							className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-start"
							type="number"
						/>
					</div>
					<Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[182px] h-[47px]">
						{t("employeeForm.leave.buttons.save")}
					</Button>
				</CardContent>
			</Card>
		);
	};
	const ContinuousAbsence = () => {
		return (
			<Card className="flex flex-col bg-gray-100 p-4 gap-6 lg:w-[597px] w-[300px] lg:h-[219px] h-fit">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
						<label>{t("employeeForm.leave.header.continuous_absence")}</label>
					</CardTitle>
				</CardHeader>
				<CardContent className="flex md:flex-row flex-col items-end gap-4">
					<div className="flex flex-col gap-1 md:w-[302px] w-full items-start">
						<label>{t("employeeForm.leave.days_count")}</label>
						<Input
							className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-start"
							type="number"
						/>
					</div>
					<Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[182px] h-[47px]">
						{t("employeeForm.leave.buttons.save")}
					</Button>
				</CardContent>
			</Card>
		);
	};
	const SeparateAbsence = () => {
		return (
			<Card className="flex flex-col bg-gray-100 p-4 gap-6 lg:w-[597px] w-[300px] lg:h-[219px] h-fit">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
						<label>{t("employeeForm.leave.header.separate_absence")}</label>
					</CardTitle>
				</CardHeader>
				<CardContent className="flex md:flex-row flex-col items-end gap-4">
					<div className="flex flex-col gap-1 md:w-[302px] w-full items-start">
						<label>{t("employeeForm.leave.days_count")}</label>
						<Input
							className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-start"
							type="number"
						/>
					</div>
					<Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[182px] h-[47px]">
						{t("employeeForm.leave.buttons.save")}
					</Button>
				</CardContent>
			</Card>
		);
	};
	const EmergencyLeave = () => {
		return (
			<Card className="flex flex-col bg-gray-100 p-4 gap-6 lg:w-[597px] w-[300px] lg:h-[219px] h-fit">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
						{t("employeeForm.leave.header.emergency")}
					</CardTitle>
				</CardHeader>
				<CardContent className="flex md:flex-row flex-col items-end gap-4">
					<div className="flex flex-col gap-1 md:w-[302px] w-full items-start">
						<label>{t("employeeForm.leave.days_count")}</label>
						<Input
							className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-start"
							type="number"
						/>
					</div>
					<Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[182px] h-[47px]">
						{t("employeeForm.leave.buttons.save")}
					</Button>
				</CardContent>
			</Card>
		);
	};
	// Similarly update RegularLeave, EmergencyLeave, ContinuousAbsence, and SeparateAbsence components
	// with t() function for translations...

	return (
		<div className="space-y-2">
			{withTitle && (
				<>
					<p className="text-2xl font-bold mb-4 text-start">
						{t("employeeForm.title")}
					</p>
					<h1 className="text-2xl text-start">
						{employeeId
							? t("employeeForm.subtitle.edit")
							: t("employeeForm.subtitle.add")}
					</h1>
				</>
			)}

			<Card className={cn("border rounded-md p-6", CardStyle)}>
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
							validationSchema={EmployeeSchema}
							onSubmit={async (values, { resetForm }) => {
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
								router.push("/employees");
							}}
						>
							{({ handleSubmit }) => (
								<Form
									onSubmit={handleSubmit}
									className="space-y-6 flex flex-col"
								>
									<div className="text-left max-w-fit self-end">
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
											<div className="flex flex-col gap-2" key={name}>
												<label className="block text-start font-semibold">
													{label}
												</label>
												<Field
													as={Input}
													type={type}
													name={name}
													dir="ltr"
													className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-start "
												/>
												<ErrorMessage
													name={name}
													component="div"
													className="text-red-500 text-sm"
												/>
											</div>
										))}

										{[
											{
												name: "net_salary",
												label: t("employeeForm.fields.net_salary"),
												type: "number",
											},
											{
												name: "extras",
												label: t("employeeForm.fields.extras"),
												type: "number",
											},
											{
												name: "date",
												label: t("employeeForm.fields.date"),
												type: "date",
											},
											{
												name: "netSalary",
												label: t("employeeForm.fields.netSalary"),
											},
										].map(({ name, label, type = "text" }) => (
											<div className="flex flex-col gap-2" key={name}>
												<label className="block text-start font-semibold">
													{label}
												</label>
												<Field
													as={Input}
													type={type}
													name={name}
													className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-start "
												/>
												<ErrorMessage
													name={name}
													component="div"
													className="text-red-500 text-sm"
												/>
											</div>
										))}

										<div className="flex flex-col gap-2">
											<label className="block text-start font-semibold">
												{t("employeeForm.fields.work_nature")}
											</label>
											<Field name="work_nature">
												{({ field, form }: any) => (
														<select
														dir="ltr"
														{...field}
														onChange={(e) => {
															form.setFieldValue("work_nature", e.target.value);
															setSelectedWorkNature(e.target.value);
														}}
														className="md:min-w-[200px] min-w-full min-h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border border-[#D9D9D9] text-start"
													>
														<option value="">
															{t("employeeForm.fields.work_nature_placeholder")}
														</option>
														{[
															t(
																"employeeForm.fields.work_nature_options.full_time"
															),
															t(
																"employeeForm.fields.work_nature_options.part_time"
															),
															t(
																"employeeForm.fields.work_nature_options.varied"
															),
														].map((option: string, index: number) => (
															<option key={index} value={option}>
																{option}
															</option>
														))}
													</select>
												)}
											</Field>
											<ErrorMessage
												name="work_nature"
												component="div"
												className="text-red-500 text-sm"
											/>
										</div>
									</div>

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

									{selectedWorkNature ===
										t("employeeForm.fields.work_nature_options.varied") && (
										<div className="mt-8">
											<EmployeeManagement
												saveHandler={() => {
													if (buttonRef?.current) {
														(buttonRef?.current as any)?.click();
													}
												}}
											/>
										</div>
									)}
								</Form>
							)}
						</Formik>
					</CardContent>
				)}
			</Card>

			<ul className="pt-9 text-[18px] flex flex-col md:gap-1 gap-1">
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
