"use client";
import React, { useState } from "react";
import ReusableTable from "@/components/ReusableTable";
import WarningPopUp from "@/components/warningPopUp";
import CustomPopUp from "@/components/popups";
import { cn } from "@/lib/utils";
import AddButton from "@/components/AddButton";
import CustomCard from "@/components/customCard";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const columns = [
	{ accessorKey: "date", header: "التاريخ" },
	{ accessorKey: "employee", header: "الموظف" },
	{ accessorKey: "leaveStart", header: "بداية الأجازة" },
	{ accessorKey: "leaveEnd", header: "نهاية الأجازة" },
	{ accessorKey: "leaveDays", header: "عدد الأيام" },
	{ accessorKey: "leaveType", header: "نوع الأجازة" },
	{ accessorKey: "deduction", header: "الخصم" },
];

const getRandomDate = (start: any, end: any) => {
	const date = new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
	return date.toISOString().split("T")[0].split("-").reverse().join("/"); // Format: DD/MM/YYYY
};
const employees = [
	"أحمد محمود",
	"محمد علي",
	"خالد حسن",
	"ياسر عبد الله",
	"سعيد عمر",
];
const leaveTypes = ["عادية", "مرضية", "طارئة"];
const deductions = [100, 120, 150, 200];

const data = Array.from({ length: 100 }, (_, index) => {
	const leaveStart = getRandomDate(
		new Date(2025, 9, 10),
		new Date(2025, 11, 20)
	); // Random date between Oct-Dec 2025
	const leaveEnd = getRandomDate(new Date(2025, 9, 11), new Date(2025, 11, 25));

	return {
		id: index + 1,
		date: getRandomDate(new Date(2025, 8, 1), new Date(2025, 11, 1)), // Random date between Sep-Dec 2025
		employee: employees[Math.floor(Math.random() * employees.length)],
		leaveStart,
		leaveEnd,
		leaveDays: Math.max(1, Math.floor(Math.random() * 5)), // 1 to 4 days
		leaveType: leaveTypes[Math.floor(Math.random() * leaveTypes.length)],
		deduction: deductions[Math.floor(Math.random() * deductions.length)],
	};
});
export default function Page() {
	const employees = [
		"أحمد محمود",
		"محمد علي",
		"خالد حسن",
		"ياسر عبد الله",
		"سعيد عمر",
	];
	const leaveTypes = ["عادية", "مرضية", "طارئة"];

	return (
		<ReusableTable
			columns={columns}
			data={data}
			employees={employees}
			title="سجل الأجازات"
			ButtonTrigger={() => (
				<CustomPopUp
					DialogTriggerComponent={() => {
						return <AddButton onClickAdd={() => {}} AddTitle="اضافة اجازة" />;
					}}
					DialogContentComponent={() => {
						const [formData, setFormData] = useState<Record<string, any>>({
							employee: "",
							leaveType: "",
							leaveDays: "",
							leaveStart: "",
							leaveEnd: "",
							deduction: "",
						});
						const [errors, setErrors] = useState<Record<string, any>>({});

						const validateForm = () => {
							let newErrors: any = {};
							if (!formData.employee) newErrors.employee = "يرجى اختيار الموظف";
							if (!formData.leaveType)
								newErrors.leaveType = "يرجى اختيار نوع الأجازة";
							if (
								!formData.leaveDays ||
								isNaN(formData.leaveDays) ||
								formData.leaveDays <= 0
							)
								newErrors.leaveDays = "يرجى إدخال عدد أيام صالح";
							if (!formData.leaveStart)
								newErrors.leaveStart = "يرجى اختيار تاريخ البدء";
							if (!formData.leaveEnd)
								newErrors.leaveEnd = "يرجى اختيار تاريخ العودة";
							if (
								formData.leaveStart &&
								formData.leaveEnd &&
								formData.leaveStart > formData.leaveEnd
							)
								newErrors.leaveEnd = "تاريخ العودة يجب أن يكون بعد تاريخ البدء";
							if (
								!formData.deduction ||
								isNaN(formData.deduction) ||
								formData.deduction < 0
							)
								newErrors.deduction = "يرجى إدخال قيمة خصم صالحة";

							setErrors(newErrors);
							return Object.keys(newErrors).length === 0;
						};

						const handleSubmit = (e: { preventDefault: () => void }) => {
							e.preventDefault();
							if (validateForm()) {
								console.log("Form submitted successfully", formData);
								// Handle form submission logic here
							}
						};
						return (
							<CustomCard
								title={"اجازات"}
								width={1010}
								height={450}
								className={`lg:w-[1010px] lg:h-[450px] h-[550px] overflow-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300  dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 w-[350px] `}
								Content={
									<form onSubmit={handleSubmit} className="flex flex-col gap-4">
										<div className="grid lg:grid-cols-3 gap-4">
											<div>
												<label>الموظف</label>
												<Select
													value={formData.employee}
													onValueChange={(e) =>
														setFormData({ ...formData, employee: e })
													}
												>
													<SelectTrigger className="md:min-w-[200px] min-w-full min-h-[48px] rounded-[8px] py-3 pr-3 pl-4  bg-white border-[#D9D9D9] placeholder:text-black text-right flex w-full ">
														{" "}
														<SelectValue placeholder="اختر الموظف" />
													</SelectTrigger>
													<SelectContent>
														{employees.map((el) => (
															<SelectItem key={el} value={el}>
																{el}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												{errors.employee && (
													<span className="text-red-500">
														{errors.employee}
													</span>
												)}
											</div>
											<div>
												<label>نوع الأجازة</label>
												<Select
													value={formData.leaveType}
													onValueChange={(e) =>
														setFormData({ ...formData, leaveType: e })
													}
												>
													<SelectTrigger className="md:min-w-[200px] min-w-full min-h-[48px] rounded-[8px] py-3 pr-3 pl-4  bg-white border-[#D9D9D9] placeholder:text-black text-right flex  w-full ">
														<SelectValue placeholder="اختر النوع" />
													</SelectTrigger>
													<SelectContent>
														{leaveTypes.map((el) => (
															<SelectItem key={el} value={el}>
																{el}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												{errors.leaveType && (
													<span className="text-red-500">
														{errors.leaveType}
													</span>
												)}
											</div>
											<div>
												<label>عدد الأيام</label>
												<Input
													className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right flex justify-end"
													type="number"
													value={formData.leaveDays}
													onChange={(e) =>
														setFormData({
															...formData,
															leaveDays: e.target.value,
														})
													}
												/>
												{errors.leaveDays && (
													<span className="text-red-500">
														{errors.leaveDays}
													</span>
												)}
											</div>
											<div>
												<label>تاريخ البدء</label>
												<Input
													className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right flex justify-end"
													type="date"
													value={formData.leaveStart}
													onChange={(e) =>
														setFormData({
															...formData,
															leaveStart: e.target.value,
														})
													}
												/>
												{errors.leaveStart && (
													<span className="text-red-500">
														{errors.leaveStart}
													</span>
												)}
											</div>
											<div>
												<label>تاريخ العودة</label>
												<Input
													className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right flex justify-end"
													type="date"
													value={formData.leaveEnd}
													onChange={(e) =>
														setFormData({
															...formData,
															leaveEnd: e.target.value,
														})
													}
												/>
												{errors.leaveEnd && (
													<span className="text-red-500">
														{errors.leaveEnd}
													</span>
												)}
											</div>
											<div>
												<label>الخصم</label>
												<Input
													className="md:min-w-[200px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right flex justify-end"
													type="number"
													value={formData.deduction}
													onChange={(e) =>
														setFormData({
															...formData,
															deduction: e.target.value,
														})
													}
												/>
												{errors.deduction && (
													<span className="text-red-500">
														{errors.deduction}
													</span>
												)}
											</div>
										</div>
										<div className="pt-7 flex justify-end">
											<Button
												type="submit"
												className="text-[16px] font-[500] text-[#FFFFFF] bg-[#16C47F] p-0 py-[10px] px-3 w-[148px] h-[48px]  hover:bg-[#16C47F]/70 shadow-none cursor-pointer"
											>
												حفظ
											</Button>
										</div>
									</form>
								}
							/>
						);
					}}
				/>
			)}
		/>
	);
}
