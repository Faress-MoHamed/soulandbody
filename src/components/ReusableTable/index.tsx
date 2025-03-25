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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import PopUp from "../PopUp";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		padding: 0,
		border: "0",
	},
	overlay: {
		background: "rgb(241,241,241,0.5)",
	},
};

type TableProps<TData> = {
	columns: ColumnDef<TData>[];
	data: TData[];
	title: string;
};

export default function ReusableTable<TData>({
	columns,
	data,
	title,
}: TableProps<TData>) {
	const [selectedEmployee, setSelectedEmployee] = useState<
		string | undefined
	>();
	const [selectedMonth, setSelectedMonth] = useState<string | undefined>();
	const [currentPage, setCurrentPage] = useState(1);
	const [modalIsOpen, setIsOpen] = useState(false);

	const pageSize = 10;
	const totalPages = Math.ceil(data.length / pageSize);

	const filteredData = useMemo(() => {
		return data.filter((record: any) => {
			const matchesEmployee =
				!selectedEmployee || record.employee === selectedEmployee;
			const matchesMonth =
				!selectedMonth || record.date.includes(selectedMonth);
			return matchesEmployee && matchesMonth;
		});
	}, [selectedEmployee, selectedMonth, data]);

	const table = useReactTable({
		data: filteredData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel({ initialSync: true }),
		initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
	});

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	return (
		<>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-xl">{title}</CardTitle>
					<Button
						onClick={openModal}
						className="bg-emerald-500 hover:bg-emerald-600"
					>
						<span>إضافة</span>
					</Button>
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
									onValueChange={setSelectedEmployee}
								>
									<SelectTrigger className="min-w-[240px]">
										<SelectValue placeholder="الكل" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Ahmed Mahmoud">أحمد محمود</SelectItem>
										<SelectItem value="Mohamed Ali">محمد علي</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="flex flex-col gap-2">
								<label className="text-[16px] text-black font-[500]">
									التاريخ
								</label>
								<Input
									type="month"
									className="min-w-[240px]"
									value={selectedMonth}
									onChange={(e) => setSelectedMonth(e.target.value)}
								/>
							</div>
						</div>
					</div>

					{/* Table */}
					<div className="overflow-x-auto">
						<table className="w-full border-collapse">
							<thead className="bg-[#D0F3E5] border-b">
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
											<td key={cell.id} className="p-3 border-y">
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

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
			>
				<PopUp onClose={closeModal} />
			</Modal>
		</>
	);
}
