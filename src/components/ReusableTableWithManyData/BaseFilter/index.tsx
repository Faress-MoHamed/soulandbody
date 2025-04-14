import { CustomDatePicker } from "@/components/customDatePicker";
import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import React from "react";
import { parseDate, type DateValue } from "@internationalized/date";

export default function BaseFilter({
	selectedEmployee,
	employees,
	loading,
	setSelectedEmployee,
	setPageIndex,
	setSelectedMonth,
	selectedMonth,
}: {
	setSelectedEmployee: React.Dispatch<React.SetStateAction<string>>;
	selectedEmployee: string;
	employees: any[];
	loading?: boolean;
	setPageIndex: React.Dispatch<React.SetStateAction<number>>;
	setSelectedMonth: React.Dispatch<React.SetStateAction<string | undefined>>;
	selectedMonth?: string;
}) {
	// Convert string to DateValue
	const selectedDateValue: DateValue | undefined = selectedMonth
		? parseDate(selectedMonth)
		: undefined;

	return (
		<div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
			<div className="flex flex-col lg:flex-row gap-5">
				<CustomSelect
					value={selectedEmployee}
					options={employees}
					label="الموظف"
					loading={loading}
					onValueChange={(e) => {
						setSelectedEmployee((prev) => (prev === e ? "" : e));
						setPageIndex(0);
					}}
				/>

				<CustomDatePicker
					label="التاريخ"
					value={selectedDateValue}
					onChange={(e) => {
						// Convert to ISO string and set it
						const isoDate = e?.toString(); // "2025-04-14"
						setSelectedMonth((prev) =>
							prev === isoDate ? undefined : isoDate
						);
					}}
					wrapperClassName="min-w-[240px]"
				/>

				<CustomInput label="التاريخ" value={selectedMonth} />
			</div>
		</div>
	);
}
