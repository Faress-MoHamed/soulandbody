import React from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/customInput";
import { MultiSelect } from "@/components/multiSelector";
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

export default function SalesRecord() {
	const table = useReactTable({
		data: [{ units: 100, totalOfUnits: 50, total: 100 }],
		columns: [
			{
				accessorKey: "units",
				header: "الوحدات",
			},
			{
				accessorKey: "totalOfUnits",
				header: "اجمالي الوحدة",
			},
			{
				accessorKey: "total",
				header: "الأجمالي",
			},
		],
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Card className="flex flex-col bg-white p-4 gap-6">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
					سجل البيع
				</CardTitle>
			</CardHeader>
			<CardContent className="flex md:flex-row flex-wrap flex-col items-start gap-6">
				<CustomInput label=" من فترة" type="date" />
				<CustomInput label="الى فترة" type="date" />
				<Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md w-[182px] h-[47px] md:mt-8">
					حفظ
				</Button>
			</CardContent>
			<CardFooter className="px-0">
				<table className="w-full caption-bottom text-sm border border-[#B9EDD9] rounded-[4px]">
					<thead className="">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="text-[16px]  font-[600] px-3 py-[10px]  bg-[#00000014] border-t  border-l border-[#B9EDD9]"
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows?.length
							? table.getRowModel().rows.map((row) => (
									<tr
										key={row.id}
										className=" transition-colors hover:bg-muted/50"
									>
										{row.getVisibleCells().map((cell) => (
											<td
												key={cell.id}
												className="px-3 py-[10px] align-middle text-[12px] border-t border-l border-[#B9EDD9]"
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</td>
										))}
									</tr>
							  ))
							: null}
					</tbody>
				</table>
			</CardFooter>
		</Card>
	);
}
