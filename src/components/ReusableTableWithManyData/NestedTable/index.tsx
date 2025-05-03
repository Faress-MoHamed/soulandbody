// components/NestedTable.tsx
"use client";

import {
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	flexRender,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";
import TablePagination from "../pagination";

interface NestedTableProps<TData> {
	data: TData[];
	paginatedData: TData[];
	columns: any[];
	pageIndex: number;
	setPageIndex: (value: number | ((prev: number) => number)) => void;
	title?: string;
}

export function NestedTable<TData>({
  data,
  paginatedData,
	columns,
	pageIndex,
	setPageIndex,
	title,
}: NestedTableProps<TData>) {
	const table = useReactTable({
		data: paginatedData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel({ initialSync: true }),
		manualPagination: false, // Enable client-side pagination
	});

	console.log(paginatedData);

	return (
		<>
			<div className="rounded-md border">
				<div className="overflow-x-auto">
					<table className="w-full caption-bottom text-sm">
						<thead className="bg-[#D0F3E5] border-b-[1px] border-[#14250D66]">
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<th
											key={header.id}
											className={cn(
												"px-4 py-3 text-center font-bold text-[#14250D] text-[16px]"
											)}
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
							{table.getRowModel().rows.length ? (
								table.getRowModel().rows.map((row, index) => (
									<tr
										key={row.id}
										className={cn(
											"border-b hover:bg-[#98cbb7] transition-colors duration-300 text-center w-full",
											`${index % 2 !== 0 ? "bg-[#D0F3E5]" : ""}`
										)}
									>
										{row.getVisibleCells().map((cell) => (
											<td
												key={cell.id}
												className="p-3 text-[16px] border-y-[1px] border-[#14250D66]"
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</td>
										))}
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan={table.getAllColumns().length}
										className="h-24 text-center"
									>
										لا توجد بيانات
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
			<TablePagination
				filteredData={data}
				pageIndex={pageIndex}
				pageSize={10}
				setPageIndex={setPageIndex}
			/>
		</>
	);
}
