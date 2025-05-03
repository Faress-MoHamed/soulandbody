import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useState } from "react";

export default function MovementAccountTopComponent() {
	const [accountDescriptions, setAccountDescriptions] = useState(2);

	const handleAddAccount = () => {
		setAccountDescriptions((prev) => prev + 1);
	};

	return (
		<Card className="p-6">
			<CardHeader className="pt-0">ادخل البيانات لاضافة حساب جديد</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<CustomInput label="اسم الحساب" type="text" className="w-full" />
					</div>

					<div>
						<CustomInput label="وصف الحساب" type="text" className="w-full" />
					</div>

					<div>
						<CustomSelect
							label="وصف الحساب ١"
							options={["نقاط البيع", "كاش", "تحويل بنكي"]}
							triggerClassName="!h-[48px] w-full bg-white border border-gray-300 rounded-lg shadow-sm"
						/>
					</div>
					<div>
						<CustomSelect
							label="وصف الحساب ٢"
							options={["نقاط البيع", "كاش", "تحويل بنكي"]}
							triggerClassName="!h-[48px] w-full bg-white border border-gray-300 rounded-lg shadow-sm"
						/>
					</div>
					{Array.from({ length: accountDescriptions - 2 }, (_, i) => (
						<div key={i}>
							<CustomSelect
								label={`وصف الحساب ${i + 3}`}
								options={["نقاط البيع", "كاش", "تحويل بنكي"]}
								triggerClassName="!h-[48px] w-full bg-white border border-gray-300 rounded-lg shadow-sm"
							/>
						</div>
					))}
					<div className="col-span-2 text-start">
						<p
							className="text-[rgba(22,196,127,1)] font-semibold text-sm mb-1 underline cursor-pointer"
							onClick={handleAddAccount}
						>
							ربط حسابات
						</p>
					</div>

					<div>
						<CustomSelect
							label="طبيعة الحساب"
							options={["نقاط البيع", "كاش", "تحويل بنكي"]}
							triggerClassName="!h-[48px] w-full bg-white border border-gray-300 rounded-lg shadow-sm"
						/>
					</div>
					<div>
						<CustomInput label="رصيد افتتاحي" type="text" className="w-full" />
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4 mt-4">
					{["ميزان مراجعة", "قائمة الدخل"].map((option) => (
						<div className="flex items-center gap-2" key={option}>
							<input
								type="checkbox"
								id={`option-${option}`}
								// checked={selectedOptions.includes(option)}
								// onChange={() => toggleOption(option)}
								className="accent-[#13A66C] w-4 h-4 cursor-pointer"
							/>
							<label
								htmlFor={`option-${option}`}
								className="cursor-pointer text-sm font-semibold text-[#13A66C]"
							>
								{option}
							</label>
						</div>
					))}
				</div>

				<div className="flex justify-start gap-4 mt-6">
					<Button className="bg-[#16C47F] hover:bg-[#13A66C]">
						اضافة حساب جديد
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
