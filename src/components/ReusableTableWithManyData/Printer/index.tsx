import { Button } from "@/components/ui/button";
import React from "react";
import { utils, writeFile } from "xlsx";

export default function Printer({ data }: { data: any[] }) {
	const exportToExcel = () => {
		const worksheet = utils.json_to_sheet(data);
		const workbook = utils.book_new();
		utils.book_append_sheet(workbook, worksheet, "Sheet1");
		writeFile(workbook, "table_data.xlsx");
	};
	return (
		<Button
			onClick={exportToExcel}
			className="bg-emerald-500 hover:bg-emerald-600 w-[148px] h-[44px] text-[16px] flex items-center gap-[10px] cursor-pointer rounded-none rounded-t-[8px]"
		>
			<img src="/print.svg" className="h-6 w-6 mr-2" />
			{"طباعة"}
		</Button>
	);
}
