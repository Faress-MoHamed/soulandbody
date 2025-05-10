"use client";

import React, { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/customInput";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { useAddCustomer } from "../../hooks/useCustomers";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export default function AddNewClient() {
	const { t } = useTypedTranslation();
	const { mutate: addCustomer, isPending } = useAddCustomer();
	
const [formData, setFormData] = useState({
	name: "",
	phone: "",
	address: "",
	facility_id: "",
  });
  
  // ✅ جلب facility_id من الكوكيز بعد تحميل الكومبوننت
  useEffect(() => {
	const user = Cookies.get("user_data");
	if (user) {
	  const parsedUser = JSON.parse(user);
	  setFormData((prev) => ({
		...prev,
		facility_id: parsedUser.facility_id || "",
	  }));
	  console.log("aaaa",parsedUser.facility_id)

	}
  }, []);
  
	const handleChange = (field: string, value: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

// ✅ handle submit
const handleSubmit = (e: React.FormEvent) => {
	e.preventDefault();
	addCustomer(formData, {
		onSuccess: () => {
			console.log("تمت الإضافة");
			toast.success("✅ تمت إضافة العميل بنجاح");
		},
		onError: (err: any) => {
			console.error("خطأ في الإضافة", err);
			const errorMessage =
				err?.response?.data?.message || "❌ حدث خطأ أثناء إضافة العميل";
			toast.error(errorMessage);
		},
	});
};

	return (
		<form onSubmit={handleSubmit}>
			<Card className="flex flex-col px-6 py-9 pt-0 gap-6 w-full h-fit">
				<CardHeader className="flex flex-row items-center justify-between p-0">
					<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
						{t("clients.addNewClient")}
					</CardTitle>
				</CardHeader>

				<CardContent className="grid md:grid-cols-3 items-end grid-cols-1 gap-5">
					<CustomInput
						label={t("clients.customerName")}
						value={formData.name}
						onChange={(e: any) => handleChange("name", e.target.value)}
					/>

					<CustomInput
						label={t("clients.phone")}
						value={formData.phone}
						onChange={(e: any) => handleChange("phone", e.target.value)}
					/>

					<div></div>

					<CustomInput
						label={t("clients.address")}
						value={formData.address}
						onChange={(e: any) => handleChange("address", e.target.value)}
					/>

					<Button
						type="submit"
						disabled={isPending}
						className="text-[16px] font-[500] text-white bg-[#16C47F] p-0 py-[10px] px-3 w-[148px] h-[48px] hover:bg-[#16C47F]/70 shadow-none cursor-pointer rounded-lg"
					>
						{isPending ? "جارٍ الحفظ..." : t("clients.save")}
					</Button>
				</CardContent>
			</Card>
		</form>
	);
}
