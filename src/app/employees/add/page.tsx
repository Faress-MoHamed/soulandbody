"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EmployeeManagement from "@/app/work-hours/page";
import CustomPopUp from "@/components/popups";
import FileUpload from "@/components/uploadFile";
import CustomCard from "@/components/customCard";

// Validation schema using Yup
const EmployeeSchema = Yup.object().shape({
	name: Yup.string().required("الاسم مطلوب"),
	birthDate: Yup.date().required("تاريخ الميلاد مطلوب"),
	qualification: Yup.string().required("المؤهل مطلوب"),
	position: Yup.string().required("الوظيفة مطلوبة"),
	salary: Yup.number()
		.required("الراتب مطلوب")
		.positive("يجب أن يكون الراتب قيمة موجبة"),
	startDate: Yup.date().required("تاريخ بدء العمل مطلوب"),
	workNature: Yup.string().required("طبيعة العمل مطلوبة"),
	schedule: Yup.array().of(
		Yup.object().shape({
			day: Yup.string().required(),
			startTime: Yup.string().required(),
			endTime: Yup.string().required(),
			active: Yup.boolean(),
		})
	),
});

export default function EmployeeForm() {
	// Initial values for the form
	const initialValues = {
		name: "محمد احمد",
		birthDate: "2003-03-03",
		qualification: "بكالوريوس تجارة",
		position: "محاسب",
		salary: 2500,
		startDate: "2025-10-17",
		workNature: "متزوج",
		schedule: [
			{ day: "السبت", startTime: "16:00", endTime: "20:00", active: false },
			{ day: "الأحد", startTime: "16:00", endTime: "20:00", active: true },
			{ day: "الاثنين", startTime: "16:00", endTime: "20:00", active: true },
			{ day: "الثلاثاء", startTime: "16:00", endTime: "20:00", active: true },
			{ day: "الأربعاء", startTime: "16:00", endTime: "20:00", active: true },
			{ day: "الخميس", startTime: "16:00", endTime: "20:00", active: true },
			{ day: "الجمعة", startTime: "16:00", endTime: "20:00", active: false },
		],
	};

	const handleSubmit = (values: any) => {
		console.log(values);
		// Handle form submission here
	};

	return (
		<>
			<h1 className="text-2xl font-bold mb-6 text-right">الموظفين</h1>

			<Card className="border rounded-md p-6">
				<CardContent className="p-0">
					<Formik
						initialValues={initialValues}
						validationSchema={EmployeeSchema}
						onSubmit={handleSubmit}
					>
						{({ errors, touched, values, setFieldValue }) => (
							<Form className="space-y-6">
								<div className="text-right">
									<CustomPopUp
										DialogTriggerComponent={() => (
											<Button
												type="button"
												className="bg-emerald-500 hover:bg-emerald-600 text-white"
											>
												الملحقات
											</Button>
                    )}
                    // DialogContentclassName="bg-white"
										DialogContentComponent={() => (
											<CustomCard
												withButton={false}
												title={"رفع ملف، شهادة النجاح"}
												width={556}
												height={450}
												className={" md:w-[556px] h-fit"}
												Content={<FileUpload />}
											></CustomCard>
										)}
									></CustomPopUp>
								</div>

								{/* Employee Information */}
								<div className="grid grid-cols-4 gap-4 items-center">
									<div className="text-right font-semibold">الاسم</div>
									<div className="text-right font-semibold">تاريخ الميلاد</div>
									<div className="text-right font-semibold">المؤهل</div>
									<div className="text-right font-semibold">الوظيفة</div>

									<div>
										<Field
											name="name"
											type="text"
											className="w-full border rounded-md p-2 text-right"
										/>
										<ErrorMessage
											name="name"
											component="div"
											className="text-red-500 text-sm"
										/>
									</div>

									<div>
										<Field
											name="birthDate"
											type="date"
											className="w-full border rounded-md p-2 text-right"
										/>
										<ErrorMessage
											name="birthDate"
											component="div"
											className="text-red-500 text-sm"
										/>
									</div>

									<div>
										<Field
											name="qualification"
											type="text"
											className="w-full border rounded-md p-2 text-right"
										/>
										<ErrorMessage
											name="qualification"
											component="div"
											className="text-red-500 text-sm"
										/>
									</div>

									<div>
										<Field
											name="position"
											type="text"
											className="w-full border rounded-md p-2 text-right"
										/>
										<ErrorMessage
											name="position"
											component="div"
											className="text-red-500 text-sm"
										/>
									</div>
								</div>

								{/* Salary and Work Information */}
								<div className="grid grid-cols-4 gap-4 items-center">
									<div className="text-right font-semibold">راتب التعريف</div>
									<div className="text-right font-semibold">بدلات</div>
									<div className="text-right font-semibold">
										تاريخ بدء العمل
									</div>
									<div className="text-right font-semibold">طبيعة العمل</div>

									<div>
										<Field
											name="salary"
											type="number"
											className="w-full border rounded-md p-2 text-right"
										/>
										<ErrorMessage
											name="salary"
											component="div"
											className="text-red-500 text-sm"
										/>
									</div>
									<div>
										<Field
											name="salary"
											type="number"
											className="w-full border rounded-md p-2 text-right"
										/>
										<ErrorMessage
											name="salary"
											component="div"
											className="text-red-500 text-sm"
										/>
									</div>

									<div>
										<Field
											name="startDate"
											type="date"
											className="w-full border rounded-md p-2 text-right"
										/>
										<ErrorMessage
											name="startDate"
											component="div"
											className="text-red-500 text-sm"
										/>
									</div>

									<div>
										<Field
											as="select"
											name="workNature"
											className="w-full border rounded-md p-2 text-right"
										>
											<option value="متزوج">متزوج</option>
											<option value="أعزب">أعزب</option>
											<option value="مطلق">مطلق</option>
										</Field>
										<ErrorMessage
											name="workNature"
											component="div"
											className="text-red-500 text-sm"
										/>
									</div>
								</div>

								{/* Work Schedule */}
								<div className="mt-8">
									<EmployeeManagement />
								</div>

								<div className="text-right mt-6">
									<Button
										type="submit"
										className="bg-emerald-500 hover:bg-emerald-600 text-white"
									>
										حفظ
									</Button>
								</div>
							</Form>
						)}
					</Formik>
				</CardContent>
			</Card>
		</>
	);
}
