"use client";
import { useState, useMemo, useEffect } from "react";
import {
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	flexRender,
	ColumnDef,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Modal from "react-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import PopUp from "../PopUp";
import AddButton from "../AddButton";

type TableProps<TData> = {
	columns: ColumnDef<TData>[];
	data: TData[];
	title: string;
	AddTitle?: string;
	onClickAdd?: any;
	ButtonTrigger?: any;
	employees?: any;
};

export default function ReusableTable<TData>({
	columns,
	data,
	title,
	AddTitle,
	onClickAdd,
	ButtonTrigger,
	employees,
}: TableProps<TData>) {
	// Export to Excel
	const exportToExcel = () => {
		const worksheet = utils.json_to_sheet(data);
		const workbook = utils.book_new();
		utils.book_append_sheet(workbook, worksheet, "Sheet1");
		writeFile(workbook, "table_data.xlsx");
	};

	// Export to PDF
	const exportToPDF = () => {
		const doc = new jsPDF();
		doc.text("Employee Leave Report", 14, 10);
		autoTable(doc, {
			startY: 20,
			head: [columns?.map((el) => el?.header) as any[]],
			body: data.map((item: any) => Object.values(item)),
		});
		doc.save("table_data.pdf");
	};

	const [selectedEmployee, setSelectedEmployee] = useState<
		string | undefined
	>();
	const [selectedMonth, setSelectedMonth] = useState<string | undefined>();
	const [currentPage, setCurrentPage] = useState(1);

	const pageSize = 10;
	const totalPages = Math.ceil(data.length / pageSize);
	const filteredData = useMemo(() => {
		return data.filter((record: any) => {
			const matchesEmployee =
				!selectedEmployee || record.employee === selectedEmployee;

			const recordMonth = record.date
				.split("/")
				.reverse()
				.slice(0, 2)
				.join("-"); // Convert "DD/MM/YYYY" → "YYYY-MM"
			const matchesMonth = !selectedMonth || recordMonth === selectedMonth;

			return matchesEmployee && matchesMonth;
		});
	}, [selectedEmployee, selectedMonth, data]);
	const dynamicColumns = useMemo(() => {
		let updatedColumns: any = [...columns];

		if (selectedEmployee) {
			// Remove "الموظف" (Employee) column
			updatedColumns = updatedColumns.filter(
				(col: any) => col.accessorKey !== "employee"
			);

			// Add "الإجراء" (Action) column
			updatedColumns.push({
				accessorKey: "action",
				header: "الإجراء",
				cell: () => (
					<div className="flex justify-center gap-1 ">
						<Button className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619]   hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#C41619]">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="lucide lucide-trash-2"
							>
								<path d="M3 6h18" />
								<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
								<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
								<line x1="10" x2="10" y1="11" y2="17" />
								<line x1="14" x2="14" y1="11" y2="17" />
							</svg>
							حذف
						</Button>
						<Button className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F]   hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#16C47F]">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="lucide lucide-pencil"
							>
								<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
								<path d="m15 5 4 4" />
							</svg>
							تعديل
						</Button>
					</div>
				),
			});
		}

		return updatedColumns;
	}, [selectedEmployee, columns]);

	const table = useReactTable({
		data: filteredData,
		columns: dynamicColumns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel({ initialSync: true }),
		initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
	});

	useEffect(() => {
		console.log(selectedEmployee);
	}, [selectedEmployee]);

	return (
		<>
			<Card className="border-none shadow-none ">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-[26px]">{title}</CardTitle>
					{ButtonTrigger ? (
						<ButtonTrigger />
					) : (
						<AddButton AddTitle={AddTitle} onClickAdd={onClickAdd} />
					)}
				</CardHeader>
				<CardContent>
					{/* Filters */}
					<div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
						<div className="flex flex-col md:flex-row gap-5">
							<div className="flex flex-col gap-2">
								<label className="text-[16px] text-black font-[500]">
									الموظف
								</label>
								<Select
									value={selectedEmployee}
								 dir="rtl"
									onValueChange={(e) => {
										setSelectedEmployee((prev) => (prev === e ? "" : e));
									}}
								>
									<SelectTrigger className="min-w-[240px]">
										<SelectValue placeholder="الكل" />
									</SelectTrigger>
									<SelectContent>
										{employees?.map((el: any) => (
											<SelectItem value={el}>{el}</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="flex flex-col gap-2">
								<label className="text-[16px] text-black font-[500]">
									التاريخ
								</label>
								<Input
									type="month"
									className="min-w-[240px] bg-white border-[#D9D9D9] placeholder:text-black text-right flex justify-end"
									value={selectedMonth}
									onChange={(e) => {
										console.log(e?.target.value);
										setSelectedMonth((prev) =>
											prev === e.target.value ? undefined : e.target.value
										);
									}}
								/>
							</div>
						</div>
					</div>

					{/* Table */}
					<div className="overflow-x-auto">
						<Button
							onClick={exportToExcel}
							className="bg-emerald-500 hover:bg-emerald-600 w-[148px] h-[44px] text-[16px] flex items-center gap-[10px] cursor-pointer rounded-none rounded-t-[8px]"
						>
							<img src="./print.svg" className="h-6 w-6 mr-2" />
							{"طباعة"}
						</Button>{" "}
						<table className="w-full border-collapse">
							<thead className="bg-[#D0F3E5] border-b-[1px] border-[#14250D66]">
								{table.getHeaderGroups().map((headerGroup) => (
									<tr key={headerGroup.id} className="text-center">
										{headerGroup.headers.map((header) => (
											<th key={header.id} className="p-3 text-center border-b">
												{flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
											</th>
										))}
									</tr>
								))}
							</thead>
							<tbody>
								{table.getRowModel().rows.map((row) => (
									<tr
										key={row.id}
										className="border-b hover:bg-muted/50 text-center"
									>
										{row.getVisibleCells().map((cell) => (
											<td
												key={cell.id}
												className={cn(
													`p-3 text-[16px] tec border-y-[1px] border-[#14250D66]`,
													`${
														(cell.getContext().row.id as unknown as number) %
															2 !==
														0
															? "bg-[#D0F3E5]"
															: ""
													}`
												)}
											>
												{" "}
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Pagination */}
					<div className="flex items-center justify-between mt-6">
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							<ChevronRight className="h-4 w-4 ml-1" />
							<span>السابق</span>
						</Button>
						<div className="flex flex-row-reverse items-center justify-center space-x-2">
							{Array.from({ length: totalPages }, (_, i) => i + 1).map(
								(page) => (
									<Button
										key={page}
										variant={page === currentPage ? "default" : "ghost"}
										className={cn(
											"w-10 h-10 p-0",
											page === currentPage && "bg-black text-white"
										)}
										onClick={() => setCurrentPage(page)}
									>
										{page}
									</Button>
								)
							)}
						</div>
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							<span>التالي</span>
							<ChevronLeft className="h-4 w-4 mr-1" />
						</Button>
					</div>
				</CardContent>
			</Card>
		</>
	);
}
