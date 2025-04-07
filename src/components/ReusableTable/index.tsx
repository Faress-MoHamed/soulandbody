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
import LoadingIndicator from "../loadingIndicator";

type TableProps<TData> = {
	columns: ColumnDef<TData>[];
	data: TData[];
	title?: string;
	AddTitle?: string;
	onClickAdd?: any;
	ButtonTrigger?: any;
	employees?: any;
	pagination?: any;
	handlePageChange?: any;
	loading?: boolean;
	withFilter?: boolean;
	error?: unknown;
	onDelete?: any;
	deleteLoading?: any;
	onEdit?: any;
	UserComponent?: any;
	withActionButtons?: boolean;
	withColspan?: boolean;
	withPrinter?: boolean;
};

export default function ReusableTable<TData>({
	columns,
	data,
	title,
	AddTitle,
	onClickAdd,
	ButtonTrigger,
	pagination,
	handlePageChange,
	employees,
	loading,
	withColspan,
	error,
	deleteLoading,
	onDelete,
	onEdit,
	withActionButtons = true,
	withFilter = true,
	withPrinter = true,
	UserComponent,
}: TableProps<TData>) {
	const [pageIndex, setPageIndex] = useState(0);
	const [pageSize, setPageSize] = useState(10); // Default to 10 rows per page

	// Export to Excel
	const exportToExcel = () => {
		const worksheet = utils.json_to_sheet(data);
		const workbook = utils.book_new();
		utils.book_append_sheet(workbook, worksheet, "Sheet1");
		writeFile(workbook, "table_data.xlsx");
	};

	const [selectedEmployee, setSelectedEmployee] = useState<
		string | undefined
	>();
	const [selectedMonth, setSelectedMonth] = useState<string | undefined>();

	const filteredData = useMemo(() => {
		return data.filter((record: any) => {
			const matchesEmployee =
				!selectedEmployee || record.employee === selectedEmployee;

			const recordMonth = record.date.split("-").slice(0, 2).join("-"); // Convert "DD/MM/YYYY" → "YYYY-MM"
			console.log("recordMonth", recordMonth);
			const matchesMonth = !selectedMonth || recordMonth === selectedMonth;
			console.log("selectedMonth", selectedMonth);

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
			if (withActionButtons) {
				updatedColumns.push({
					accessorKey: "action",
					header: "الإجراء",
					cell: ({ row }: any) => (
						<div className="flex justify-center gap-1 ">
							<Button
								onClick={() => onDelete(row?.original?.id)}
								className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619]   hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#C41619]"
							>
								{deleteLoading ? (
									<LoadingIndicator />
								) : (
									<>
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
									</>
								)}
							</Button>
							<Button
								onClick={() => onEdit(row?.original?.id)}
								className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F]   hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#16C47F]"
							>
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
		}

		return updatedColumns;
	}, [selectedEmployee, columns]);

	const paginatedData = useMemo(() => {
		const start = pageIndex * pageSize;
		const end = start + pageSize;
		return filteredData.slice(start, end);
	}, [filteredData, pageIndex, pageSize]);
	const table = useReactTable({
		data: paginatedData,
		columns: dynamicColumns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel({ initialSync: true }),
		manualPagination: false, // Enable client-side pagination
	});

	console.log(pageIndex, data.length, pageSize);

	return (
		<>
			<Card className="border-none shadow-none ">
				{title ||
					(ButtonTrigger && (
						<CardHeader className="flex flex-row items-center justify-between">
							{title && (
								<CardTitle className="lg:text-[26px] text-[20px] w-full">
									{title}
								</CardTitle>
							)}
							{ButtonTrigger ? (
								<div className="w-full flex justify-end">
									<ButtonTrigger />
								</div>
							) : (
								<AddButton AddTitle={AddTitle} onClickAdd={onClickAdd} />
							)}
						</CardHeader>
					))}
				{
					<CardContent>
						{/* Filters */}
						{withFilter && (
							<div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
								<div className="flex flex-col lg:flex-row gap-5">
									<div className="flex flex-col gap-2">
										<label className="text-[16px] text-black font-[500]">
											الموظف
										</label>
										<Select
											value={selectedEmployee}
											dir="rtl"
											onValueChange={(e) => {
												setSelectedEmployee((prev) => (prev === e ? "" : e));
												setPageIndex(0);
											}}
										>
											<SelectTrigger className="min-w-[240px]">
												<SelectValue placeholder="الكل" />
											</SelectTrigger>
											<SelectContent>
												{loading ? (
													<SelectItem
														className="justify-center"
														disabled
														value="loading"
													>
														<LoadingIndicator />
													</SelectItem>
												) : (
													employees?.map((el: any) => (
														<SelectItem value={el}>{el}</SelectItem>
													))
												)}
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
						)}

						{/* Table */}
						{loading ? (
							<LoadingIndicator />
						) : (
							<>
								<div className="overflow-x-auto">
									{withPrinter && (
										<Button
											onClick={exportToExcel}
											className="bg-emerald-500 hover:bg-emerald-600 w-[148px] h-[44px] text-[16px] flex items-center gap-[10px] cursor-pointer rounded-none rounded-t-[8px]"
										>
											<img src="/print.svg" className="h-6 w-6 mr-2" />
											{"طباعة"}
										</Button>
									)}{" "}
									{UserComponent && (
										<UserComponent selectedEmployee={selectedEmployee} />
									)}
									<table className="w-full border-collapse">
										<thead className="bg-[#D0F3E5] border-b-[1px] border-[#14250D66]">
											{table.getHeaderGroups().map((headerGroup) => (
												<tr key={headerGroup.id} className="text-center">
													{headerGroup.headers.map((header) => (
														<th
															key={header.id}
															className="p-3 text-center border-b"
														>
															{flexRender(
																header.column.columnDef.header,
																header.getContext()
															)}
														</th>
													))}
												</tr>
											))}
										</thead>
										{withColspan ? (
											<tbody>
												{table.getRowModel().rows.map((row, index) => {
													const cells = row.getVisibleCells();
													let lastValueIndex = -1;

													// Find the last cell with a value in this row
													for (let i = cells.length - 1; i >= 0; i--) {
														if (cells[i].getValue()) {
															lastValueIndex = i;
															break;
														}
													}

													return (
														<tr
															key={row.id}
															className={cn(
																"border-b hover:bg-muted/50 text-center w-full",
																`${index % 2 !== 0 ? "bg-[#D0F3E5]" : ""}`
															)}
														>
															{cells.map((cell, cellIndex) => {
																const cellValue = cell.getValue();

																// Skip rendering cells after the last valued cell
																if (cellIndex > lastValueIndex) return null;

																// Calculate colspan for the last valued cell
																const colspan =
																	cellIndex === lastValueIndex
																		? cells.length - lastValueIndex
																		: undefined;

																return (
																	<td
																		key={cell.id}
																		colSpan={colspan}
																		className={cn(
																			"p-3 text-[16px] tec border-y-[1px] border-[#14250D66]"
																		)}
																	>
																		{flexRender(
																			cell.column.columnDef.cell,
																			cell.getContext()
																		)}
																	</td>
																);
															})}
														</tr>
													);
												})}
											</tbody>
										) : (
											<tbody>
												{table.getRowModel().rows.map((row, index) => (
													<tr
														key={row.id}
														className={cn(
															"border-b hover:bg-muted/50 text-center w-full",
															`${index % 2 !== 0 ? "bg-[#D0F3E5]" : ""}`
														)}
													>
														{row.getVisibleCells().map((cell) => (
															<td
																key={cell.id}
																className={cn(
																	`p-3 text-[16px] tec border-y-[1px] border-[#14250D66]`
																)}
															>
																{flexRender(
																	cell.column.columnDef.cell,
																	cell.getContext()
																)}
															</td>
														))}
													</tr>
												))}
											</tbody>
										)}
									</table>
								</div>
								{/* Pagination */}
								<div className="flex items-start justify-between mt-4 w-full">
									{" "}
									<button
										className="cursor-pointer"
										onClick={() =>
											setPageIndex((prev) =>
												prev + 1 < Math.ceil(filteredData?.length / pageSize)
													? prev + 1
													: prev
											)
										}
										disabled={
											filteredData.length <= pageSize ||
											(pageIndex + 1) * pageSize >= filteredData.length
										}
									>
										{/* <ChevronRight className="h-4 w-4 mr-1" /> */}
										التالي
									</button>
									<div className="flex flex-col items-center justify-center gap-4">
										<div className="xl:flex flex-row-reverse hidden items-center justify-center space-x-2 w-full">
											{Array.from(
												{
													length:
														Math.ceil(filteredData.length / pageSize) || 0,
												},
												(_, i) => i + 1
											).map((page) => (
												<Button
													key={page}
													variant={page === pageIndex + 1 ? "default" : "ghost"}
													className={cn(
														"w-10 h-10 p-0",
														page === pageIndex + 1 && "bg-black text-white"
													)}
													onClick={() => setPageIndex(page - 1)}
												>
													{page}
												</Button>
											))}
										</div>
										<span>
											الصفحة {pageIndex + 1} من{" "}
											{Math.ceil(filteredData.length / pageSize)}
										</span>
									</div>
									<button
										className="cursor-pointer"
										onClick={() =>
											setPageIndex((prev) => Math.max(prev - 1, 0))
										}
										disabled={
											pageIndex === 0 || filteredData.length <= pageSize
										}
									>
										السابق
										{/* <ChevronLeft className="h-4 w-4 ml-1" /> */}
									</button>
								</div>
								{/* <div className="flex items-center justify-between mt-6">
									<Button
										variant="outline"
										size="sm"
										onClick={() => handlePageChange(pagination.current - 1)}
										disabled={pagination?.current === 1}
									>
										<ChevronRight className="h-4 w-4 ml-1" />
										<span>السابق</span>
									</Button>
									<div className="lg:flex flex-row-reverse hidden items-center justify-center space-x-2">
										{Array.from(
											{ length: pagination?.pages || 0 },
											(_, i) => i + 1
										).map((page) => (
											<Button
												key={page}
												variant={
													page === pagination.current ? "default" : "ghost"
												}
												className={cn(
													"w-10 h-10 p-0",
													page === pagination.current && "bg-black text-white"
												)}
												onClick={() => handlePageChange(page)}
											>
												{page}
											</Button>
										))}
									</div>
									<Button
										variant="outline"
										size="sm"
										onClick={() => handlePageChange(pagination.current + 1)}
										disabled={pagination?.current === pagination?.pages}
									>
										<span>التالي</span>
										<ChevronLeft className="h-4 w-4 mr-1" />
									</Button>
								</div>{" "} */}
							</>
						)}
					</CardContent>
				}
			</Card>
		</>
	);
}
