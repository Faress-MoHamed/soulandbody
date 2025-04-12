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

// Validation schema using Yup
const EmployeeSchema = Yup.object().shape({
	employee: Yup.string().required("الاسم مطلوب"),
	birthDate: Yup.date().required("تاريخ الميلاد مطلوب"),
	qualification: Yup.string().required("المؤهل مطلوب"),
	position: Yup.string().required("الوظيفة مطلوبة"),
	net_salary: Yup.number()
		.required("الراتب مطلوب")
		.positive("يجب أن يكون الراتب قيمة موجبة"),
	date: Yup.date().required("تاريخ بدء العمل مطلوب"),
	work_nature: Yup.string().required("طبيعة العمل مطلوبة"),
	extras: Yup.string().required("البدلات مطلوبة"),
});

const SickLeave = () => {
	return (
		<Card className="flex flex-col   bg-gray-100 p-4 gap-6 lg:w-[597px] w-[300px] lg:h-[219px] h-fit">
			<CardHeader className="flex flex-row items-center justify-between ">
				<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
					عدد الأيام المرضي
				</CardTitle>
			</CardHeader>
						<CardContent className="flex md:flex-row flex-col items-end gap-4">

				<div className="flex flex-col gap-1 md:w-[302px] w-full items-start">
					<label>عدد ايام</label>
					<Input
						className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-right justify-end"
						type="number"
					/>
				</div>
				<div>
					<Button
						type="submit"
						// ref={buttonRef}
						className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[182px] h-[47px]"
					>
						{"حفظ"}
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
					رصيد الأجازات الكلي
				</CardTitle>
			</CardHeader>
						<CardContent className="flex md:flex-row flex-col items-end gap-4">

				<div className="flex flex-col gap-1 md:w-[302px] w-full items-start">
					<label>عدد الأيام</label>
					<Input
						className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-right"
						type="number"
					/>
				</div>
				<Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[182px] h-[47px]">
					حفظ
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
					رصيد الإجازة الاعتيادية
				</CardTitle>
			</CardHeader>
			<CardContent className="flex md:flex-row flex-col items-end gap-4">
				<div className="flex flex-col gap-1 md:w-[302px] w-full items-start">
					<label>عدد الأيام</label>
					<Input
						className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-right"
						type="number"
					/>
				</div>
				<Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[182px] h-[47px]">
					حفظ
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
					رصيد الإجازة العارضة
				</CardTitle>
			</CardHeader>
						<CardContent className="flex md:flex-row flex-col items-end gap-4">

				<div className="flex flex-col gap-1 md:w-[302px] w-full items-start">
					<label>عدد الأيام</label>
					<Input
						className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-right"
						type="number"
					/>
				</div>
				<Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[182px] h-[47px]">
					حفظ
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
					الغياب المتصل
				</CardTitle>
			</CardHeader>
						<CardContent className="flex md:flex-row flex-col items-end gap-4">

				<div className="flex flex-col gap-1 md:w-[302px] w-full items-start">
					<label>عدد الأيام</label>
					<Input
						className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-right"
						type="number"
					/>
				</div>
				<Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[182px] h-[47px]">
					حفظ
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
					الغياب المنفصل
				</CardTitle>
			</CardHeader>
						<CardContent className="flex md:flex-row flex-col items-end gap-4">

				<div className="flex flex-col gap-1 md:w-[302px] w-full items-start">
					<label>عدد الأيام</label>
					<Input
						className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-right"
						type="number"
					/>
				</div>
				<Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[182px] h-[47px]">
					حفظ
				</Button>
			</CardContent>
		</Card>
	);
};


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
	// const searchParams = useSearchParams();
	// const employeeId = searchParams.get("id");
	const router = useRouter();
	const [navigateLoading, setNavigateLoading] = useState(false);
	const [selectedWorkNature, setSelectedWorkNature] = useState("");
	const { mutate: createEmployee, isPending: createEmployeePending } =
		useCreateEmployee();
	const { mutate: updateEmployee, isPending: updateEmployeePending } =
		useUpdateEmployee();
	const { data: employee, isLoading } = useEmployee(employeeId ?? "");
	const buttonRef = useRef(null);
	// Loading state for existing employee
	if (employeeId && isLoading) return <p>Loading employee data...</p>;

	return (
		<div className="space-y-2">
			{withTitle && (
				<>
					<p className="text-2xl font-bold mb-4 text-right">بيانات موظف</p>
					<h1 className="text-2xl  text-right">
						{employeeId ? "تعديل بيانات الموظف" : "إضافة موظف جديد"}
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
							enableReinitialize={true} // Update values when `employee` changes
							validationSchema={EmployeeSchema}
							onSubmit={async (values, { resetForm }) => {
								// Convert all values to strings
								const stringifiedValues = Object.fromEntries(
									Object.entries(values).map(([key, value]) => [
										key,
										String(value),
									])
								);

								if (employeeId) {
									// Update existing employee
									await updateEmployee({
										id: Number(employeeId),
										employee: stringifiedValues,
									});
								} else {
									// Create new employee
									await createEmployee(stringifiedValues);
								}

								setNavigateLoading(true);
								resetForm();
								router.push("/employees"); // Redirect after submission
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
													{"الملحقات"}
												</Button>
											)}
											DialogContentComponent={() => (
												<CustomCard
													withButton={false}
													width={556}
													height={450}
													className={`lg:w-[600px] lg:h-[450px] h-[550px] overflow-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300  dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 w-[350px] `}
													Content={<FileUpload />}
												/>
											)}
										/>
									</div>
									<div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
										{/* Employee Information */}
										{/* <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center"> */}
										{[
											{ name: "employee", label: "الاسم", type: "text" },
											{
												name: "phoneNumber",
												label: "رقم الهاتف",
												type: "text",
											},
											{ name: "address", label: "العنوان", type: "text" },
											{
												name: "birthDate",
												label: "تاريخ الميلاد",
												type: "date",
											},
											{
												name: "qualification",
												label: "المؤهل",
												type: "text",
											},
											{ name: "position", label: "الوظيفة", type: "text" },
										].map(({ name, label, type }) => (
											<div className="flex flex-col gap-2" key={name}>
												<label className="block text-right font-semibold">
													{label}
												</label>
												<Field
													as={Input}
													type={type}
													name={name}
													className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-right justify-end"
												/>
												<ErrorMessage
													name={name}
													component="div"
													className="text-red-500 text-sm"
												/>
											</div>
										))}
										{/* </div> */}

										{/* Salary & Work Info */}
										{/* <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center"> */}
										{[
											{
												name: "net_salary",
												label: "صافي المرتب",
												type: "number",
											},
											{ name: "extras", label: "بدلات", type: "number" },
											{
												name: "date",
												label: "تاريخ بدء العمل",
												type: "date",
											},
											{
												name: "netSalary",
												label: "اجمالي الراتب",
												type: "text",
											},
										].map(({ name, label, type }) => (
											<div className="flex flex-col gap-2" key={name}>
												<label className="block text-right font-semibold">
													{label}
												</label>
												<Field
													as={Input}
													type={type}
													name={name}
													className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-right justify-end"
												/>
												<ErrorMessage
													name={name}
													component="div"
													className="text-red-500 text-sm"
												/>
											</div>
										))}
										{/* Work Nature */}
										<div className="flex flex-col gap-2">
											<label className="block text-right font-semibold">
												طبيعة العمل
											</label>
											<Field name="work_nature">
												{({ field, form }: any) => (
													<select
														{...field}
														onChange={(e) => {
															form.setFieldValue("work_nature", e.target.value);
															setSelectedWorkNature(e.target.value);
														}}
														className="md:min-w-[200px] min-w-full min-h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border border-[#D9D9D9] text-right"
													>
														<option value="">اختر طبيعة العمل</option>
														{["دوام كامل", "دوام جزئي", "متنوع"].map(
															(el, index) => (
																<option key={index} value={el}>
																	{el}
																</option>
															)
														)}
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
									{/* </div> */}
									{/* Submit Button */}
									<div
										className={cn(
											"text-right mt-6",
											`${selectedWorkNature === "متنوع" ? "hidden" : ""}`
										)}
									>
										<Button
											type="submit"
											ref={buttonRef}
											className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md"
										>
											{employeeId ? "تحديث البيانات" : "حفظ"}
										</Button>
									</div>

									{/* Work Schedule */}
									{selectedWorkNature === "متنوع" && (
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
					-رصيد الأجازات الكلي المسموحه للموظف{" "}
					<CustomPopUp
						DialogTriggerComponent={() => (
							<Button
								type="button"
								variant={"link"}
								className=" px-1 text-[#129D66] text-[18px] py-0 h-fit"
							>
								{"40 يوم"}
							</Button>
						)}
						DialogContentComponent={() => <TotalLeave />}
					/>
					منقسم الى
					<CustomPopUp
						DialogTriggerComponent={() => (
							<Button
								type="button"
								variant={"link"}
								className=" px-1 text-[#129D66] text-[18px] py-0 h-fit"
							>
								{"21 يوم اعتيادي"}
							</Button>
						)}
						DialogContentComponent={() => <RegularLeave />}
					/>
					و
					<CustomPopUp
						DialogTriggerComponent={() => (
							<Button
								type="button"
								variant={"link"}
								className=" px-1 text-[#129D66] text-[18px] py-0 h-fit"
							>
								7 ايام عارضة
							</Button>
						)}
						DialogContentComponent={() => <EmergencyLeave />}
					/>
					و
					<CustomPopUp
						DialogTriggerComponent={() => (
							<Button
								type="button"
								variant={"link"}
								className=" px-1 text-[#129D66] text-[18px] py-0 h-fit"
							>
								12 يوم مرضي
							</Button>
						)}
						DialogContentComponent={() => <SickLeave />}
					/>
				</li>
				<li>
					-في حالة تخطي عدد ايام الأجازة المسموح بها يتم تطبيق الخصم على حسب
					نظام الشركة
				</li>
				<li className="flex flex-wrap">
					-في حالةغياب الموظف
					<CustomPopUp
						DialogTriggerComponent={() => (
							<Button
								type="button"
								variant={"link"}
								className=" px-1 text-[#129D66] text-[18px] py-0 h-fit"
							>
								15 يوم متصلة
							</Button>
						)}
						DialogContentComponent={() => <ContinuousAbsence />}
					/>{" "}
					او{" "}
					<CustomPopUp
						DialogTriggerComponent={() => (
							<Button
								type="button"
								variant={"link"}
								className=" px-1 text-[#129D66] text-[18px] py-0 h-fit"
							>
								30 يوم منفصلة
							</Button>
						)}
						DialogContentComponent={() => <SeparateAbsence />}
					/>{" "}
					يتم اتخاذ اجراءات الفصل في اليوم الأخير
				</li>
			</ul>
		</div>
	);
}
