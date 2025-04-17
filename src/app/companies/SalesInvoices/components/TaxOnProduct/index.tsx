import CustomSelect from "@/components/customSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";

const TaxOnProduct = () => {
	return (
		<Card className="flex flex-col  p-4 gap-6">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
					اضافة ضريبة على المنتج
				</CardTitle>
			</CardHeader>
			<CardContent className="flex  flex-col justify-center items-center gap-4">
				<div className="flex gap-5 md:flex-row flex-col self-stretch content-start items-start justify-center">
					<CustomSelect
						label="ضريبة مبيعات "
						options={["لا يوجد", "يوجد"]}
						triggerClassName="md:w-[256px]"
					/>
					<CustomSelect
						label="ضريبة الدخل "
						options={["لا يوجد", "يوجد"]}
						triggerClassName="md:w-[256px]"
					/>
				</div>
				<Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[182px] h-[47px]">
					حفظ
				</Button>
			</CardContent>
		</Card>
	);
};

export default TaxOnProduct;
