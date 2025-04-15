import { CustomDatePicker } from "@/components/customDatePicker";
import CustomInput from "@/components/customInput";
import CustomSelect from "@/components/customSelect";
import React from "react";
import { parseDate, type DateValue } from "@internationalized/date";
import { MonthPicker } from "@/components/monthPicker";
import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";

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
	const { t } = useTypedTranslation();
	console.log(t("filter.employee"));
	return (
		<div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
			<div className="flex flex-col lg:flex-row gap-5">
				<CustomSelect
					
					value={selectedEmployee}
					options={employees}
					label={t("filter.employee")}
					loading={loading}
					onValueChange={(e) => {
						setSelectedEmployee((prev) => (prev === e ? "" : e));
						setPageIndex(0);
					}}
				/>

				<MonthPicker label={t("filter.date")} wrapperClassName="min-w-[240px]" />
			</div>
		</div>
	);
}
