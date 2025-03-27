"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EmployeeManagement from "@/app/work-hours/page";
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
import { useState } from "react";

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

export default function EmployeeForm() {
	const searchParams = useSearchParams();
	const employeeId = searchParams.get("id");
	const router = useRouter();
	const [navigateLoading, setNavigateLoading] = useState(false);

	const { mutate: createEmployee, isPending: createEmployeePending } =
		useCreateEmployee();
	const { mutate: updateEmployee, isPending: updateEmployeePending } =
		useUpdateEmployee();
	const { data: employee, isLoading } = useEmployee(employeeId ?? "");

	// Loading state for existing employee
	if (employeeId && isLoading) return <p>Loading employee data...</p>;

	return (
		<>
			<h1 className="text-2xl font-bold mb-6 text-right">
				{employeeId ? "تعديل بيانات الموظف" : "إضافة موظف جديد"}
			</h1>

			<Card className="border rounded-md p-6">
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
								<Form onSubmit={handleSubmit} className="space-y-6">
									<div className="text-left">
										<CustomPopUp
											DialogTriggerComponent={() => (
												<Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-md px-4 py-2">
													{"الملحقات"}
												</Button>
											)}
											DialogContentComponent={() => (
												<CustomCard
													withButton={false}
													title={"رفع ملف، شهادة النجاح"}
													width={556}
													height={450}
													Content={<FileUpload />}
												/>
											)}
										/>
									</div>

									{/* Employee Information */}
									<div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
										{[
											{ name: "employee", label: "الاسم", type: "text" },
											{
												name: "birthDate",
												label: "تاريخ الميلاد",
												type: "date",
											},
											{ name: "qualification", label: "المؤهل", type: "text" },
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
													className="md:min-w-[302px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-right justify-end"
												/>
												<ErrorMessage
													name={name}
													component="div"
													className="text-red-500 text-sm"
												/>
											</div>
										))}
									</div>

									{/* Salary & Work Info */}
									<div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
										{[
											{
												name: "net_salary",
												label: "صافي المرتب",
												type: "number",
											},
											{ name: "extras", label: "بدلات", type: "number" },
											{ name: "date", label: "تاريخ بدء العمل", type: "date" },
										].map(({ name, label, type }) => (
											<div className="flex flex-col gap-2" key={name}>
												<label className="block text-right font-semibold">
													{label}
												</label>
												<Field
													as={Input}
													type={type}
													name={name}
													className="md:min-w-[302px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] text-right justify-end"
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
											<Field
												as="select"
												name="work_nature"
												className="md:min-w-[302px] min-w-full min-h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border border-[#D9D9D9] text-right"
											>
												<option value="">اختر طبيعة العمل</option>
												{["متزوج", "أعزب", "مطلق"].map((el, index) => (
													<option key={index} value={el}>
														{el}
													</option>
												))}
											</Field>
											<ErrorMessage
												name="work_nature"
												component="div"
												className="text-red-500 text-sm"
											/>
										</div>
									</div>

									{/* Submit Button */}
									<div className="text-right mt-6">
										<Button
											type="submit"
											className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md"
										>
											{employeeId ? "تحديث البيانات" : "حفظ"}
										</Button>
									</div>

									{/* Work Schedule */}
									<div className="mt-8">
										<EmployeeManagement />
									</div>
								</Form>
							)}
						</Formik>
					</CardContent>
				)}
			</Card>
		</>
	);
}
