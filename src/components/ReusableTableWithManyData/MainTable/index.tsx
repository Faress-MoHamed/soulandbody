import { cn } from "@/lib/utils";
import { flexRender, type Cell } from "@tanstack/react-table";
import React from "react";
import TablePagination from "../pagination";
import CustomSelect from "@/components/customSelect";
import CustomInput from "@/components/customInput";
import ColSpanTbody from "../ColSpanTBody";
import MainBody from "../MainBody";
import { type JSX } from "react";
import type { ClassArray, ClassDictionary } from "clsx";

export default function MainTable<TData>({
	columnGroups,
	withColspan,
	withInlineAddContent,
	table,
	filteredData,
	pageIndex,
	pageSize,
	setPageIndex,
	selectedEmployee,
	isAddingRow,
	expandedRows,
	expandedContent,
	expandableRow,
	withPagination,
	onCellClick,
}: {
	table: any;
	columnGroups: any;
	withColspan: any;
	withInlineAddContent: any;
	filteredData?: any;
	pageIndex: any;
	pageSize: any;
	setPageIndex: any;
	selectedEmployee: any;
	isAddingRow: any;
	expandedRows: any;
	expandedContent: any;
	expandableRow: any;
	withPagination: any;
	onCellClick?: (cell: Cell<TData, unknown>) => JSX.Element | null;
}) {
	const RenderedTbody = ColSpanTbody<TData>;
	const RenderedMainTbody = MainBody<TData>;
	const NewRowComponent = () => (
		<>
			<tr className={cn("border-b hover:bg-muted/50 text-center w-full")}>
				{withInlineAddContent?.map(
					(element: any, i: React.Key | null | undefined) => (
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
					)
				)}
			</tr>
		</>
	);
	return (
		<>
			<div className="">
				<div className="overflow-x-auto">
					<div className="min-w-full inline-block align-middle">
						<table className="min-w-full border-collapse">
							<thead className="bg-[#D0F3E5] border-b-[1px] border-[#14250D66]">
								{columnGroups && (
									<tr className="bg-[#fafafa] space-x-5">
										{columnGroups.map((group: any, index: any) => (
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
								{table
									.getHeaderGroups()
									.map(
										(headerGroup: {
											id: React.Key | null | undefined;
											headers: any[];
										}) => (
											<tr key={headerGroup.id} className="text-center">
												{headerGroup.headers.map(
													(header: {
														id: React.Key | null | undefined;
														column: any;
														getContext: () => any;
													}) => (
														<th
															key={header.id}
															className="p-3 text-center border-b text-nowrap"
														>
															{flexRender(
																header.column.columnDef.header,
																header.getContext()
															)}
														</th>
													)
												)}
											</tr>
										)
									)}
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
										onCellClick={onCellClick}
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
	);
}
