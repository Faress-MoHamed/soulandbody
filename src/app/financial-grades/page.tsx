"use client";
import React, { useEffect, useState } from "react";
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
import {
	useDeleteEmployee,
	useDistinctEmployees,
	useEmployees,
} from "../employees/useEmployee";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SelectableComponent from "@/components/selectableComponent";
import { useDeductions } from "./useDeductions";
import { useSalaries } from "./useSalaries";

const employees = [
	"أحمد محمود",
	"محمد علي",
	"خالد حسن",
	"ياسر عبد الله",
	"سعيد عمر",
];
const leaveTypes = ["عادية", "مرضية", "طارئة"];

type FormDataType = {
	employee: string;
	leaveType: string;
	leaveDays: string;
	leaveStart: string;
	leaveEnd: string;
	deduction: string;
};
type SalaryFormType = {
	employee: string;
	date: string;
	netSalary: string;
	extras: string;
	allowances: string;
	totalSalary: string;
};
function LeaveForm() {
	const [formData, setFormData] = useState<FormDataType>({
		employee: "",
		leaveType: "",
		leaveDays: "",
		leaveStart: "",
		leaveEnd: "",
		deduction: "",
	});
	const [errors, setErrors] = useState<Partial<FormDataType>>({});

	const validateForm = (): boolean => {
		let newErrors: Partial<FormDataType> = {};

		if (!formData.employee) newErrors.employee = "يرجى اختيار الموظف";
		if (!formData.leaveType) newErrors.leaveType = "يرجى اختيار نوع الأجازة";
		if (
			!formData.leaveDays ||
			isNaN(Number(formData.leaveDays)) ||
			Number(formData.leaveDays) <= 0
		)
			newErrors.leaveDays = "يرجى إدخال عدد أيام صالح";
		if (!formData.leaveStart) newErrors.leaveStart = "يرجى اختيار تاريخ البدء";
		if (!formData.leaveEnd) newErrors.leaveEnd = "يرجى اختيار تاريخ العودة";
		if (
			formData.leaveStart &&
			formData.leaveEnd &&
			formData.leaveStart > formData.leaveEnd
		)
			newErrors.leaveEnd = "تاريخ العودة يجب أن يكون بعد تاريخ البدء";
		if (
			!formData.deduction ||
			isNaN(Number(formData.deduction)) ||
			Number(formData.deduction) < 0
		)
			newErrors.deduction = "يرجى إدخال قيمة خصم صالحة";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (validateForm()) {
			console.log("Form submitted successfully", formData);
			// Handle form submission logic here
		}
	};

	const handleChange = (field: keyof FormDataType, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<CustomCard
			title="إضافة إجازة"
			width={1010}
			height={450}
			className={`md:w-[1010px] md:h-[450px] h-[550px] overflow-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300  dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 w-[350px] `}
			Content={
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div className="grid md:grid-cols-3 gap-4">
						{/** Employee Select **/}
						<div>
							<label>الموظف</label>
							<Select
								dir="rtl"
								value={formData.employee}
								onValueChange={(value) => handleChange("employee", value)}
							>
								<SelectTrigger className="md:min-w-[302px] min-w-full min-h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right flex">
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
								<span className="text-red-500">{errors.employee}</span>
							)}
						</div>

						{/** Leave Type Select **/}
						<div>
							<label>نوع الأجازة</label>
							<Select
								dir="rtl"
								value={formData.leaveType}
								onValueChange={(value) => handleChange("leaveType", value)}
							>
								<SelectTrigger className="md:min-w-[302px] min-w-full min-h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right flex">
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
								<span className="text-red-500">{errors.leaveType}</span>
							)}
						</div>

						{/** Leave Days Input **/}
						<div>
							<label>عدد الأيام</label>
							<Input
								type="number"
								value={formData.leaveDays}
								onChange={(e) => handleChange("leaveDays", e.target.value)}
								className="md:min-w-[302px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right"
							/>
							{errors.leaveDays && (
								<span className="text-red-500">{errors.leaveDays}</span>
							)}
						</div>

						{/** Leave Start Date **/}
						<div>
							<label>تاريخ البدء</label>
							<Input
								type="date"
								value={formData.leaveStart}
								onChange={(e) => handleChange("leaveStart", e.target.value)}
								className="md:min-w-[302px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right"
							/>
							{errors.leaveStart && (
								<span className="text-red-500">{errors.leaveStart}</span>
							)}
						</div>

						{/** Leave End Date **/}
						<div>
							<label>تاريخ العودة</label>
							<Input
								type="date"
								value={formData.leaveEnd}
								onChange={(e) => handleChange("leaveEnd", e.target.value)}
								className="md:min-w-[302px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right"
							/>
							{errors.leaveEnd && (
								<span className="text-red-500">{errors.leaveEnd}</span>
							)}
						</div>

						{/** Deduction Input **/}
						<div>
							<label>الخصم</label>
							<Input
								type="number"
								value={formData.deduction}
								onChange={(e) => handleChange("deduction", e.target.value)}
								className="md:min-w-[302px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right"
							/>
							{errors.deduction && (
								<span className="text-red-500">{errors.deduction}</span>
							)}
						</div>
					</div>

					<div className="pt-7 flex justify-end">
						<Button
							type="submit"
							className="text-white bg-[#16C47F] p-3 w-[148px] h-[48px] hover:bg-[#16C47F]/70 shadow-none"
						>
							حفظ
						</Button>
					</div>
				</form>
			}
		/>
	);
}

function SalariesForm() {
	const [formData, setFormData] = useState<SalaryFormType>({
		employee: "",
		date: "",
		netSalary: "",
		extras: "",
		allowances: "",
		totalSalary: "",
	});
	const [errors, setErrors] = useState<Partial<SalaryFormType>>({});

	const validateForm = (): boolean => {
		let newErrors: Partial<SalaryFormType> = {};

		if (!formData.employee) newErrors.employee = "يرجى اختيار الموظف";
		if (!formData.date) newErrors.date = "يرجى اختيار التاريخ";
		if (
			!formData.netSalary ||
			isNaN(Number(formData.netSalary)) ||
			Number(formData.netSalary) < 0
		)
			newErrors.netSalary = "يرجى إدخال صافي راتب صالح";
		if (
			!formData.extras ||
			isNaN(Number(formData.extras)) ||
			Number(formData.extras) < 0
		)
			newErrors.extras = "يرجى إدخال قيمة زيادات صالحة";
		if (
			!formData.allowances ||
			isNaN(Number(formData.allowances)) ||
			Number(formData.allowances) < 0
		)
			newErrors.allowances = "يرجى إدخال قيمة بدلات صالحة";
		if (
			!formData.totalSalary ||
			isNaN(Number(formData.totalSalary)) ||
			Number(formData.totalSalary) < 0
		)
			newErrors.totalSalary = "يرجى إدخال إجمالي راتب صالح";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (field: keyof SalaryFormType, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (validateForm()) {
			console.log("Salary Form Submitted", formData);
			// Handle salary submission logic here
		}
	};

	return (
		<CustomCard
			title="رواتب موظفين"
			ButtonTitle="ارسال الرواتب"
			className={`md:w-[1010px] md:h-[450px] h-[550px] overflow-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300  dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 w-[350px] `}
			Content={
				<form onSubmit={handleSubmit} className="flex flex-col gap-4 md:pl-6">
					<div className="grid md:grid-cols-3 grid-cols-1 items-center gap-4">
						{/* Employee Select */}
						<div className="flex flex-col gap-2 w-[302px]">
							<label>الموظف</label>
							<Select
								dir="rtl"
								value={formData.employee}
								onValueChange={(value) => handleChange("employee", value)}
							>
								<SelectTrigger className="md:min-w-[302px] min-w-full min-h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right flex">
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
								<span className="text-red-500">{errors.employee}</span>
							)}
						</div>

						{/* Date Input */}
						<div className="flex flex-col gap-1 w-[302px]">
							<label>التاريخ</label>
							<Input
								type="date"
								value={formData.date}
								onChange={(e) => handleChange("date", e.target.value)}
								className="md:min-w-[302px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right"
							/>
							{errors.date && (
								<span className="text-red-500">{errors.date}</span>
							)}
						</div>

						{/* Salary Inputs */}
						{[
							{ label: "صافي المرتب", field: "netSalary" },
							{ label: "زيادات", field: "extras" },
							{ label: "بدلات", field: "allowances" },
							{ label: "اجمالي المرتب", field: "totalSalary" },
						].map(({ label, field }) => (
							<div key={field} className="flex flex-col gap-1 w-[302px]">
								<label>{label}</label>
								<Input
									type="number"
									value={formData[field as keyof SalaryFormType]}
									onChange={(e) =>
										handleChange(field as keyof SalaryFormType, e.target.value)
									}
									className="md:min-w-[302px] min-w-full h-[48px] rounded-[8px] py-3 pr-3 pl-4 bg-white border-[#D9D9D9] placeholder:text-black text-right"
								/>
								{errors[field as keyof SalaryFormType] && (
									<span className="text-red-500">
										{errors[field as keyof SalaryFormType]}
									</span>
								)}
							</div>
						))}
					</div>

					{/* Submit Button */}
					<div className="pt-7 flex justify-end">
						<Button
							type="submit"
							className="text-white bg-[#16C47F] p-3 w-[148px] h-[48px] hover:bg-[#16C47F]/70 shadow-none"
						>
							حفظ
						</Button>
					</div>
				</form>
			}
		/>
	);
}

function Deduction() {
	const {
		data: deductionData,
		isLoading: deductionLoading,
		error: deductionError,
	} = useDeductions();
	const columns = [
		{ accessorKey: "date", header: "التاريخ" },
		{ accessorKey: "employee", header: "الموظف" },
		{ accessorKey: "type", header: "نوع الحركة" },
		{ accessorKey: "amount", header: "المبلغ" },
		{ accessorKey: "reason", header: "السبب" },
	];
	const distinctEmployees = [
		...new Set(deductionData?.map((el: any) => el?.employee)),
	];

	return (
		<ReusableTable
			columns={columns}
			data={deductionData ?? []}
			employees={distinctEmployees}
			withActionButtons={false}
			loading={deductionLoading}
			error={deductionError}
			ButtonTrigger={() => (
				<CustomPopUp
					DialogTriggerComponent={() => {
						return (
							<AddButton onClickAdd={() => {}} AddTitle=" حركة حسابية جديدة" />
						);
					}}
					DialogContentComponent={() => <LeaveForm />}
				/>
			)}
		/>
	);
}
function Salaries() {
	const { data: salaryData, isLoading: salaryLoading } = useSalaries();

	const columns = [
		{ accessorKey: "date", header: "التاريخ" },
		{ accessorKey: "employee", header: "الموظف" },
		{ accessorKey: "salary", header: "الراتب" },
		{ accessorKey: "net_salary", header: "صافي المرتب" },
		{ accessorKey: "extras", header: "زيادات" },
		{ accessorKey: "allowances", header: "بدلات" },
	];
	const distinctEmployees = [
		...new Set(salaryData?.map((el: any) => el?.employee)),
	];

	return (
		<ReusableTable
			columns={columns}
			data={salaryData ?? []}
			employees={distinctEmployees}
			withActionButtons={false}
			// title="الموظفين"
			loading={salaryLoading}
			ButtonTrigger={() => (
				<CustomPopUp
					DialogTriggerComponent={() => {
						return <AddButton onClickAdd={() => {}} AddTitle="اضافة راتب" />;
					}}
					DialogContentComponent={() => <SalariesForm />}
				/>
			)}
		/>
	);
}

export default function Page() {
	return (
		<>
			<h2 className="text-[26px] font-bold">سجل الحركات</h2>
			<SelectableComponent
				contentClassName="border-2 p-6 rounded-lg"
				items={[
					{ label: "خصم واضافة", component: <Deduction /> },
					{ label: "مرتبات", component: <Salaries /> },
				]}
			/>
		</>
	);
}
