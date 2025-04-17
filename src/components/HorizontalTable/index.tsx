import React from "react";
import {
	useReactTable,
	getCoreRowModel,
	flexRender,
	ColumnDef,
} from "@tanstack/react-table";
import { Card, CardTitle, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";


interface HorizontalTableProps<TData> {
	data: TData[];
	title?: string;
	withActionButtons?: boolean;
	FooterComponent?: React.FC;
	UserComponent?: React.FC;
	ActionComponent?: React.FC<{ row: TData }>;
	CardFooterClassName?: string;
	containerClassName?: string;
	columns?: ColumnDef<TData>[]; // Make columns optional
}

export default function HorizontalTable<TData>({
	data,
	title,
	withActionButtons = false,
	FooterComponent,
	ActionComponent,
	CardFooterClassName = "",
	containerClassName = "w-full max-w-2xl mx-auto ",
	columns, // Now columns is optional
	UserComponent,
}: HorizontalTableProps<TData>) {
	// Default columns if not provided
	const defaultColumns: ColumnDef<TData>[] = [
		{
			accessorKey: "value",
			header: "الإجمالي",
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: "name",
			header: "الحساب",
			cell: (info) => info.getValue(),
		},
	];

	const table = useReactTable({
		data,
		columns: columns || defaultColumns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Card
			className={cn(
				" shadow-none rounded-none bg-[#fafafa] md:min-w-[791px] py-10"
				// containerClassName
			)}
		>
			{" "}
			<div className="px-4 space-y-4">
				{title && (
					<CardHeader className="flex flex-row items-center justify-between lg:px-0">
						<div className="flex flex-col w-full gap-4 ">
							<CardTitle className="lg:text-[26px] text-[20px] font-bold w-full">
								{title}
							</CardTitle>
						</div>
					</CardHeader>
				)}
				{UserComponent && <UserComponent />}
			</div>
			<div className={containerClassName}>
				<div className="overflow-x-auto">
					<table className="w-full -collapse">
						<thead className="bg-[#D0F3E5]">
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id} className="flex justify-between">
									{headerGroup.headers.map((header) => (
										<th
											key={header.id}
											className="py-[10px] h-[52px] px-4  text-start font-bold "
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
										</th>
									))}
									{withActionButtons && (
										<th className="py-2 px-4  text-start font-bold">
											الإجراءات
										</th>
									)}
								</tr>
							))}
						</thead>
						<tbody>
							{table.getRowModel().rows.map((row, index) => (
								<tr
									key={row.id}
									className={
										index % 2 === 0
											? "bg-[#F0FFF7] flex justify-between w-full"
											: "bg-white flex justify-between"
									}
								>
									{row.getVisibleCells().map((cell) => {
										console.log(cell.column.columnDef.cell, cell.getContext());
										return (
											<td key={cell.id} className="py-2 px-4  h-[52px]">
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</td>
										);
									})}
									{withActionButtons && ActionComponent && (
										<td className="py-2 px-4  text-start">
											<ActionComponent row={row.original} />
										</td>
									)}
								</tr>
							))}
						</tbody>
						{FooterComponent && (
							<tfoot className={CardFooterClassName}>
								{<FooterComponent />}
							</tfoot>
						)}
					</table>
				</div>
			</div>
		</Card>
	);
}

