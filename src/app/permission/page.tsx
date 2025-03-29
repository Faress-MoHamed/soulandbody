"use client";
import React, { useState } from "react";
import { usePermissions } from "./usePermissions";
import ReusableTable from "@/components/ReusableTable";
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
import CustomPopUp from "@/components/popups";
import AddButton from "@/components/AddButton";

function PermissionForm() {
	const [formData, setFormData] = useState<Record<any, any>>({
		employee: "",
		from: "",
		to: "",
		actualEnd: "",
		reason: "",
	});
	const [errors, setErrors] = useState<Record<any, any>>({});

	const validateForm = () => {
		let newErrors: any = {};
		if (!formData.employee) newErrors.employee = "يرجى اختيار الموظف";
		if (!formData.from) newErrors.from = "يرجى اختيار وقت البداية";
		if (!formData.to) newErrors.to = "يرجى اختيار وقت النهاية";
		if (!formData.actualEnd)
			newErrors.actualEnd = "يرجى اختيار وقت الانتهاء الفعلي";
		if (!formData.reason) newErrors.reason = "يرجى إدخال السبب";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (validateForm()) {
			console.log("Permission Form Submitted", formData);
			// Handle submission logic here
		}
	};

	return (
		<CustomCard
			title="استأذان"
			ButtonTitle="إرسال الاستئذان"
			className={`md:w-[1010px] md:h-[380px] h-[550px] overflow-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300  dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 w-[350px] `}
			Content={
				<form onSubmit={handleSubmit} className="flex flex-col gap-4 md:pl-6">
					<div className="grid md:grid-cols-3 grid-cols-1 items-center gap-4">
						<div className="flex flex-col gap-2 w-[302px]">
							<label>الموظف</label>
							<Select
								value={formData.employee}
								onValueChange={(value) => handleChange("employee", value)}
							>
								<SelectTrigger className="md:min-w-[302px] min-w-full min-h-[48px] rounded-[8px] bg-white border-[#D9D9D9] text-right">
									<SelectValue placeholder="اختر الموظف" />
								</SelectTrigger>
								<SelectContent>
									{["fares", "moahmed", "ahmed"].map((el) => (
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
						{["from", "to", "actualEnd"].map((field) => (
							<div key={field} className="flex flex-col gap-1 w-[302px]">
								<label>
									{field === "from"
										? "بداية"
										: field === "to"
										? "نهاية"
										: "وقت الأنتهاء الفعلي"}
								</label>
								<Input
									type="time"
									value={formData[field]}
									onChange={(e) => handleChange(field, e.target.value)}
									className="md:min-w-[302px] min-w-full h-[48px] rounded-[8px] bg-white border-[#D9D9D9] text-right justify-end"
								/>
								{errors[field] && (
									<span className="text-red-500">{errors[field]}</span>
								)}
							</div>
						))}
						<div className="flex flex-col gap-1 w-[302px]">
							<label>السبب</label>
							<Input
								type="text"
								value={formData.reason}
								onChange={(e) => handleChange("reason", e.target.value)}
								className="md:min-w-[302px] min-w-full h-[48px] rounded-[8px] bg-white border-[#D9D9D9] text-right justify-end"
							/>
							{errors.reason && (
								<span className="text-red-500">{errors.reason}</span>
							)}
						</div>
						<div className="pt-7 flex ">
							<Button
								type="submit"
								className="bg-[#16C47F] text-white px-3 w-[148px] h-[48px]"
							>
								حفظ
							</Button>
						</div>
					</div>
				</form>
			}
		/>
	);
}

export default function page() {
	const { data: permessions } = usePermissions();
	console.log(permessions);
	const columns = [
		{ accessorKey: "date", header: "التاريخ" },
		{ accessorKey: "employee", header: "الموظف" },
		{ accessorKey: "from", header: "من" },
		{ accessorKey: "to", header: "الي" },
		{ accessorKey: "actual_end", header: "وقت الأنتهاء الفعلي" },
		{ accessorKey: "reason", header: "السبب" },
		{ accessorKey: "deduction", header: "الخصم" },
	];
	const distinctEmployees = [
		...new Set(permessions?.map((el: any) => el?.employee)),
	];

	return (
		<div>
			<ReusableTable
				title="سجل استاذان"
				data={permessions ?? []}
				columns={columns}
				withActionButtons={false}
				employees={distinctEmployees}
				ButtonTrigger={() => (
					<CustomPopUp
						DialogTriggerComponent={() => {
							return <AddButton onClickAdd={() => {}} AddTitle=" استأذان" />;
						}}
						DialogContentComponent={() => <PermissionForm />}
					/>
				)}
			/>
		</div>
	);
}
