import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CustomInput from '@/components/customInput';
import { MultiSelect } from '@/components/multiSelector';

export default function AddNewEmployee() {
  const options = [
		{ value: "doctor", label: "طبيب" },
		{ value: "nurse", label: "ممرض" },
		{ value: "technician", label: "فني" },
		{ value: "admin", label: "إداري" },
		{ value: "receptionist", label: "موظف استقبال" },
	];
  return (
		<Card className="flex flex-col p-4 gap-6 ">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
					اضافة موظف جديد
				</CardTitle>
			</CardHeader>
			<CardContent className="grid md:grid-cols-3 grid-cols-1 items-end gap-6">
				<CustomInput label="اسم الموظف" type="text" />
				<CustomInput label="رقم الهاتف" type="text" />
				<CustomInput label="العنوان" type="text" />
				<CustomInput label="المهنة" type="text" />
				<MultiSelect  placeholder="الفئة" options={options}  />
				<Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[182px] h-[47px] md:mt-8">
					حفظ
				</Button>
			</CardContent>
		</Card>
	);
}
