"use client";

import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import { useAddSupplier } from "../../hooks/useSuppliers";
import { useTypes } from "../../hooks/useAddSup";
import toast from "react-hot-toast";

export default function AddNewSupplier() {
	const addSupplier = useAddSupplier();

	const [nameSup, setNameSup] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [supplierType, setSupplierType] = useState();
	const { data: types, isLoading, error } = useTypes(); // جلب البيانات من useTypes
	const supplierTypeOptions = types?.map((type) => ({
		label: type.type,
		value: type.id
	})) || [];
	console.log(supplierType)

	const notifySuccess = () => {
		toast.success("تم اضافة المورد بنجاح!");
	};
	const handleSubmit = () => {


		console.log("القيم المرسلة:", {
			nameSup,
			phone,
			address,
			supplierType
		});

		const formData = new FormData();
		formData.append("name", nameSup);
		formData.append("phone", phone);
		formData.append("address", address);
		formData.append("supplier_type_id", supplierType); // تأكد من تحويلها إلى سلسلة


		addSupplier.mutate(formData, {
			onSuccess: () => {
				notifySuccess();
				setNameSup("");
				setPhone("");
				setAddress("");
				setSupplierType(null);
			},
			onError: (error) => {
				console.error("Error adding supplier:", error);
				toast.error("فشل في إضافة المورد");
			}
		});
	};



	return (
		<Card className="flex flex-col px-6 py-9 pt-0 gap-6 w-full h-fit">
			<CardHeader className="flex flex-row items-center justify-between p-0">
				<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
					اضافة مورد جديد
				</CardTitle>
			</CardHeader>
			<CardContent className="grid md:grid-cols-3 items-end grid-cols-1 gap-5">
				<CustomInput
					label="أسم المورد"
					value={nameSup}
					onChange={(e) => setNameSup(e.target.value)}
				/>
				<CustomInput
					label="رقم الهاتف"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>
				<div></div>

				<CustomSelect
					label="نوع المورد"
					options={supplierTypeOptions}
					value={supplierType}
					onValueChange={(e) => setSupplierType(+e)}
					required // ⬅️ يمنع إرسال النموذج دون اختيار
				/>
				<CustomInput
					label="العنوان"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
				/>
				<Button
					type="submit"
					onClick={handleSubmit}
					className="text-[16px] font-[500] text-white bg-[#16C47F] py-[10px] px-3 w-[182px] h-[48px] hover:bg-[#16C47F]/70 rounded-lg"
				>
					حفظ
				</Button>

			</CardContent>
		</Card>
	);
}
