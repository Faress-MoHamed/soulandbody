import React from "react";
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
import { MultiSelect } from "@/components/multiSelector";
export default function SendToSupplier() {
	return (
		<Card className="flex flex-col px-6 py-9 pt-0 gap-6  w-[100%] h-fit">
			<CardHeader className="flex flex-row items-center justify-between p-0">
				<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
					ارسال الي مورد
				</CardTitle>
			</CardHeader>
			<CardContent className="flex justify-between gap-5">
				<CustomSelect label={"نوع المورد"} options={[]} />
				<MultiSelect
					label={"أسم المنتج"}
					options={[
						{ label: "ncaklca", value: "nladclackn" },
						{ label: "ncaklca22", value: "nladclackn22" },
						{ label: "ncaklca33", value: "ncaklca33" },
						{ label: "ncaklca44", value: "ncaklca44" },
						{ label: "ncaklca55", value: "ncaklca55" },
						{ label: "ncaklca66", value: "ncaklca44" },
					]}
				/>
			</CardContent>
			<CardFooter className="flex gap-3 justify-end">
				<Button
					type="submit"
					className="text-[16px] font-[500] text-[#FFFFFF] bg-[#16C47F] p-0 py-[10px] px-3 w-[148px] h-[48px]  hover:bg-[#16C47F]/70 shadow-none cursor-pointer rounded-lg"
				>
					حفظ
				</Button>
			</CardFooter>
		</Card>
	);
}
