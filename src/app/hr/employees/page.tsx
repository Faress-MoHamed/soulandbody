"use client";
import React, { useEffect, useState } from "react";
import ReusableManyTable from "@/components/ReusableTableWithManyData";
import AddButton from "@/components/AddButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
	useDeleteEmployee,
	useDistinctEmployees,
	useEmployees,
} from "./useEmployee";
import { useTypedTranslation } from "@/app/hooks/useTypedTranslation";

export default function Page() {
	const [page, setPage] = useState(1);
	const { t } = useTypedTranslation();
	const { data, isLoading, error } = useEmployees(page);

	const handlePageChange = (pageinationPage: number) => {
		setPage(pageinationPage);
	};

	const route = useRouter();
	const { mutate: DeleteEmployee, isPending: DeleteEmployeeLoading } =
		useDeleteEmployee();

	const handleNavigation = (id: string) => {
		route.push(`/hr/employees/${id}`);
	};

	const {
		data: distinctEmployeesName,
		isLoading: distinctEmployeesLoading,
		error: distinctEmployeesError,
	} = useDistinctEmployees();

	const columns = [
		{ accessorKey: "date", header: t("employees.date") },
		{ accessorKey: "employee", header: t("employees.employee") },
		{ accessorKey: "work_nature", header: t("employees.workNature") },
		{ accessorKey: "net_salary", header: t("employees.netSalary") },
		{ accessorKey: "phone_number", header: t("employees.phoneNumber") },
		{ accessorKey: "address", header: t("employees.address") },
	];

	return (
		<ReusableManyTable
			dataSets={[
				{
					columns,
					data: data?.employees ?? [],
					employees: distinctEmployeesName?.employees?.map(
						(el: any) => el?.employee
					),
					title: t("employees.title"),
					loading: isLoading || distinctEmployeesLoading,
					error: error?.message || distinctEmployeesError?.message,
					onDelete: DeleteEmployee,
					deleteLoading: DeleteEmployeeLoading,
					onEdit: handleNavigation,
					ButtonTrigger: () => (
						<Link href={"/hr/employees/add"}>
							<AddButton
								onClickAdd={() => {}}
								AddTitle={t("employees.newEmployee")}
							/>
						</Link>
					),
					withPrinter: true,
					containerClassName: "border-none mt-8",
				},
			]}
			withTopPrinter={false}
		/>
	);
}
