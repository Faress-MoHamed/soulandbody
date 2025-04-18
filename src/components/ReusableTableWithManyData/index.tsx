"use client";
import { useState, useMemo, useEffect, type JSX } from "react";
import {
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	flexRender,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import AddButton from "../AddButton";
import LoadingIndicator from "../loadingIndicator";
import SelectableComponent from "../selectableComponent";
import {
	TableProps,
	type MultipleTableProps,
} from "../ReusableTableWithManyData/table.types";
import React from "react";
import TablePagination from "./pagination";
import Printer from "./Printer";
import ColSpanTbody from "./ColSpanTBody";
import MainBody from "./MainBody";
import BaseFilter from "./BaseFilter";
import HorizontalTable from "../HorizontalTable";
import CustomInput from "../customInput";
import CustomSelect from "../customSelect";
import { Minus, Plus } from "lucide-react";

export function Table<TData>({
	columns,
	data,
	title,
	withActionButtons = true,
	FooterComponent,
	UserComponent,
	CardFooterClassName,
	containerClassName,
	withPrinter,
	withPagination = true,
	withFilter = true,
	AddTitle,
	onClickAdd,
	ButtonTrigger,
	pagination,
	handlePageChange,
	employees = [],
	loading,
	withColspan,
	error,
	deleteLoading,
	onDelete,
	onEdit,
	withInlineAdd = false,
	onSaveNewRow,
	expandableRow = false,
	expandedContent,
	columnGroups,
	withInlineAddContent,
}: TableProps<TData>) {
	const [selectedEmployee, setSelectedEmployee] = useState<string>("");
	const [selectedMonth, setSelectedMonth] = useState<string | undefined>();
	const [pageIndex, setPageIndex] = useState(0);
	const [isAddingRow, setIsAddingRow] = useState(false);
	const [newRowData, setNewRowData] = useState<any>({});
	const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

	const toggleRow = (rowId: string) => {
		setExpandedRows((prev) => ({
			...prev,
			[rowId]: !prev[rowId],
		}));
	};

	// زر التمديد الافتراضي
	const defaultExpandButton = (
		isExpanded: boolean,
		toggleExpand: () => void
	) => (
		<button
			onClick={(e) => {
				e.stopPropagation();
				toggleExpand();
			}}
			className="flex items-center justify-center w-6 h-6 rounded-full bg-[#16C47F] text-white hover:bg-[#13B374]"
			aria-label={isExpanded ? "Collapse row" : "Expand row"}
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
				className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
			>
				<path d="M6 9l6 6 6-6" />
			</svg>
		</button>
	);

	const filteredData = useMemo(() => {
		return data.filter((record: any) => {
			const matchesEmployee =
				!selectedEmployee || record.employee === selectedEmployee;

			const recordMonth = record.date?.split("-").slice(0, 2).join("-");
			const matchesMonth = !selectedMonth || recordMonth === selectedMonth;

			return matchesEmployee && matchesMonth;
		});
	}, [data, selectedEmployee, selectedMonth]);

	const pageSize = 10;
	const paginatedData = useMemo(() => {
		const start = pageIndex * pageSize;
		const end = start + pageSize;
		return data.slice(start, end);
	}, [data, pageIndex, pageSize]);

	const finalData = useMemo(() => {
		return withPagination
			? selectedEmployee
				? filteredData
				: paginatedData
			: data;
	}, [selectedEmployee, data, pageIndex, pageSize]);

	const handleNewRowInputChange = (key: string, value: any) => {
		setNewRowData((prev: any) => ({
			...prev,
			[key]: value,
		}));
	};

	const handleSaveNewRow = () => {
		if (onSaveNewRow) {
			onSaveNewRow(newRowData);
			setNewRowData({});
			setIsAddingRow(false);
		}
	};

	const cancelAddRow = () => {
		setIsAddingRow(false);
		setNewRowData({});
	};

	const dynamicColumns = useMemo(() => {
		let updatedColumns: any = [...columns];

		if (selectedEmployee) {
			updatedColumns = updatedColumns.filter(
				(col: any) => col.accessorKey !== "employee"
			);

			if (withActionButtons) {
				updatedColumns.push({
					accessorKey: "action",
					header: "الإجراء",
					cell: ({ row }: any) => (
						<div className="flex justify-center gap-1">
							<Button
								onClick={() => onDelete?.(row?.original?.id)}
								className="flex items-center gap-2 px-4 py-2 bg-white text-[#C41619] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#C41619]"
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
								onClick={() => onEdit?.(row?.original?.id)}
								className="flex items-center gap-2 px-4 py-2 bg-white text-[#16C47F] hover:bg-white hover:opacity-85 h-[32px] w-[83px] rounded-[8px] border border-[#16C47F]"
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

		if (expandableRow) {
			updatedColumns.unshift({
				id: "expandButton",
				header: "",
				cell: ({ row }: any) => {
					const isExpanded = expandedRows[row.id] || false;
					const toggleExpand = () => {
						toggleRow(row.id);
					};

					return expandedContent?.expandButton
						? expandedContent.expandButton(isExpanded, toggleExpand)
						: defaultExpandButton(isExpanded, toggleExpand);
				},
			});
		}

		if (withInlineAdd) {
			updatedColumns.unshift({
				id: "addRowButton",
				header: "",
				cell: ({ row, table }: any) => {
					const isLastRow = row.index === table.getRowModel().rows.length - 1;
					if (isLastRow) {
						return (
							<button
								onClick={() => setIsAddingRow((e) => !e)}
								className="flex items-center justify-center w-6 h-6 rounded-full bg-[#16C47F] text-white hover:bg-[#13B374]"
								aria-label="Add row"
							>
								{!isAddingRow ? <Plus /> : <Minus />}
							</button>
						);
					}
					return null;
				},
			});
		}

		return updatedColumns;
	}, [
		selectedEmployee,
		columns,
		withInlineAdd,
		isAddingRow,
		onDelete,
		onEdit,
		deleteLoading,
		expandableRow,
		expandedRows,
		expandedContent?.expandButton,
	]);

	const NewRowComponent = () => (
		<>
			<tr className={cn("border-b hover:bg-muted/50 text-center w-full")}>
				{withInlineAddContent?.map((element, i) => (
					<td
						key={i}
						className="p-3 text-[16px] border-y-[1px] border-[#14250D66] max-w-[120px]"
					>
						{(() => {
							switch (element?.type) {
								case "input":
									return (
										<CustomInput
											type={element.inputType || "text"}
											value={element.value}
											label={element.label}
											onChange={(e) =>
												element?.onChange && element?.onChange(e)
											}
											className="max-w-[240px] min-w-auto"
											wrapperClassName={cn(
												"md:w-auto md:max-w-full",
												element.wrapperClassName
											)}
											labelClassName={cn(element.labelClassName)}
										/>
									);
								case "select":
									return (
										<CustomSelect
											triggerClassName="!h-[48px] w-[302px] bg-white"
											{...element}
										/>
									);
								case "custom":
									return element.Component;
								case "null":
									return null;
								default:
									return null;
							}
						})()}
					</td>
				))}
			</tr>
		</>
	);
	const table = useReactTable({
		data: finalData,
		columns: dynamicColumns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel({ initialSync: true }),
		manualPagination: false, // Enable client-side pagination
	});
	const RenderedTbody = ColSpanTbody<TData>;
	const RenderedMainTbody = MainBody<TData>;

	return (
		<>
			<Card
				className={cn(
					"border shadow-none rounded-none bg-[#fafafa]",
					containerClassName
				)}
			>
				{(title || ButtonTrigger || (withFilter && employees.length !== 0)) && (
					<CardHeader className="flex flex-row items-center justify-between lg:px-0">
						<div className="flex flex-col w-full gap-4  mt-6">
							<div className="flex justify-between items-center">
								{title && (
									<CardTitle className="lg:text-[26px] text-[20px] font-bold w-full">
										{title}
									</CardTitle>
								)}

								{ButtonTrigger ? (
									<div className="w-full flex md:justify-end">
										<ButtonTrigger />
									</div>
								) : (
									<AddButton AddTitle={AddTitle} onClickAdd={onClickAdd} />
								)}
							</div>
							{withFilter && (
								<div className="flex md:flex-row flex-col  justify-between md:items-center w-full px-6">
									<BaseFilter
										employees={employees}
										selectedEmployee={selectedEmployee}
										selectedMonth={selectedMonth}
										setPageIndex={setPageIndex}
										setSelectedEmployee={setSelectedEmployee}
										setSelectedMonth={setSelectedMonth}
										loading={loading}
									/>
								</div>
							)}
						</div>
					</CardHeader>
				)}

				<CardContent>
					{loading ? (
						<LoadingIndicator withFullScreen />
					) : (
						<>
							<div className="">
								<div className="flex flex-col gap-9">
									{UserComponent && (
										<UserComponent selectedEmployee={selectedEmployee} />
									)}

									{withPrinter && <Printer data={data} />}
								</div>
								<div className="overflow-x-auto">
									<div className="min-w-full inline-block align-middle">
										<table className="min-w-full border-collapse">
											<thead className="bg-[#D0F3E5] border-b-[1px] border-[#14250D66]">
												{columnGroups && (
													<tr className="bg-[#fafafa] space-x-5">
														{columnGroups.map((group, index) => (
															<th
																key={`group-${index}`}
																colSpan={group.columns}
																className={cn(
																	"p-3 text-center text-nowrap border-[1px]  md:border-x-[49px] border-x-[14px] border-[#fafafa] mx-5",
																	group.className
																)}
															>
																{group.title}
															</th>
														))}
													</tr>
												)}
												{table.getHeaderGroups().map((headerGroup) => (
													<tr key={headerGroup.id} className="text-center">
														{headerGroup.headers.map((header) => (
															<th
																key={header.id}
																className="p-3 text-center border-b text-nowrap"
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
													<RenderedTbody
														expandedRows={expandedRows}
														table={table}
														expandableRow={expandableRow}
														expandedContent={expandedContent}
													/>
													{isAddingRow && <NewRowComponent />}
												</tbody>
											) : (
												<tbody>
													<RenderedMainTbody
														expandedRows={expandedRows}
														table={table}
														expandableRow={expandableRow}
														expandedContent={expandedContent}
													/>
													{isAddingRow && <NewRowComponent />}
												</tbody>
											)}
										</table>
									</div>{" "}
								</div>
							</div>
							{!selectedEmployee && withPagination && (
								<TablePagination
									filteredData={filteredData}
									pageIndex={pageIndex}
									pageSize={pageSize}
									setPageIndex={setPageIndex}
								/>
							)}
						</>
					)}
				</CardContent>
				{FooterComponent && (
					<CardFooter className={cn(CardFooterClassName)}>
						<FooterComponent />
					</CardFooter>
				)}
			</Card>
		</>
	);
}

export default function ReusableManyTable<TData>({
	dataSets,
	withTopPrinter,
}: MultipleTableProps<TData>) {
	return (
		<div className="flex flex-col gap-8">
			<SelectableComponent
				items={dataSets.map((set, index) => ({
					label: set.label || set.title || "title",
					component: set.horizontal ? (
						<HorizontalTable<TData>
							key={index}
							columns={set.columns}
							data={set.data}
							title={set.title}
							withActionButtons={set.withActionButtons}
							FooterComponent={set.FooterComponent}
							ActionComponent={set.ActionComponent}
							CardFooterClassName={set.CardFooterClassName}
							containerClassName={set.containerClassName}
							UserComponent={set.UserComponent}
						/>
					) : (
						<Table<TData>
							key={index}
							columns={set.columns}
							data={set.data}
							title={set.title}
							AddTitle={set.AddTitle}
							employees={set.employees}
							pagination={set.pagination}
							handlePageChange={set.handlePageChange}
							onClickAdd={set.onClickAdd}
							ButtonTrigger={set.ButtonTrigger}
							loading={set.loading}
							columnGroups={set.columnGroups}
							withColspan={set.withColspan}
							error={set.error}
							deleteLoading={set.deleteLoading}
							withPrinter={set.withPrinter}
							onDelete={set.onDelete}
							withInlineAdd={set.withInlineAdd}
							withInlineAddContent={set.withInlineAddContent}
							onEdit={set.onEdit}
							withActionButtons={set.withActionButtons}
							withFilter={set.withFilter}
							UserComponent={set.UserComponent}
							FooterComponent={set.FooterComponent}
							CardFooterClassName={set.CardFooterClassName}
							containerClassName={set.containerClassName}
							withPagination={set.withPagination}
							expandableRow={set.expandableRow}
							expandedContent={set.expandedContent}
						/>
					),
					data: set.data,
				}))}
				contentClassName="border-none"
				withTopPrinter={withTopPrinter}
				exportToExcel={true}
			/>
		</div>
	);
}
