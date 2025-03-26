"use client";

import { useState, useEffect } from "react";
import {
	Employee,
	fetchEmployees,
	getEmployee,
	createEmployee,
	updateEmployee,
	getDistinctEmployees,
	deleteEmployee,
} from "./employees.server";

interface Pagination {
	total: number;
	pages: number;
	current: number;
}

interface UseEmployeesReturn {
	employees: Employee[];
	pagination: Pagination;
	loading: boolean;
	error: string | null;
	distinctEmployeesName: any[];
	fetchEmployees: (page?: number) => Promise<void>;
	distinctEmployees: () => Promise<null | undefined>;
	getEmployee: (id: number) => Promise<Employee | null>;
	createEmployee: (employee: Omit<Employee, "id">) => Promise<Employee | null>;
	updateEmployee: (
		id: number,
		employee: Partial<Employee>
	) => Promise<Employee | null>;
	deleteEmployee: (id: number) => Promise<boolean>;
}

export function useEmployees(): UseEmployeesReturn {
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [distinctEmployeesName, setdistinctEmployeesName] = useState<any[]>([]);
	const [pagination, setPagination] = useState<Pagination>({
		total: 0,
		pages: 0,
		current: 1,
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchEmployeesData = async (page = 1) => {
		setLoading(true);
		setError(null);
		console.log(page, pagination);
		try {
			const data = await fetchEmployees(page);
			setEmployees(data.employees);
			setPagination(data.pagination);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	const getEmployeeById = async (id: number) => {
		setLoading(true);
		setError(null);
		try {
			return await getEmployee(id);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
			return null;
		} finally {
			setLoading(false);
		}
	};
	const distinctEmployees = async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await getDistinctEmployees();
			setdistinctEmployeesName(data?.employees?.map((el: any) => el?.employee));
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
			return null;
		} finally {
			setLoading(false);
		}
	};

	const createNewEmployee = async (employee: Omit<Employee, "id">) => {
		setLoading(true);
		setError(null);
		try {
			const newEmployee = await createEmployee(employee);
			if (newEmployee) await fetchEmployeesData(pagination.current);
			return newEmployee;
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
			return null;
		} finally {
			setLoading(false);
		}
	};

	const updateExistingEmployee = async (
		id: number,
		employee: Partial<Employee>
	) => {
		setLoading(true);
		setError(null);
		try {
			const updatedEmployee = await updateEmployee(id, employee);
			if (updatedEmployee) await fetchEmployeesData(pagination.current);
			return updatedEmployee;
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
			return null;
		} finally {
			setLoading(false);
		}
	};

	const removeEmployee = async (id: number) => {
		setLoading(true);
		setError(null);
		try {
			const success = await deleteEmployee(id);
			if (success) await fetchEmployeesData(pagination.current);
			return success;
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
			return false;
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchEmployeesData();
	}, []);

	return {
		employees,
		pagination,
		loading,
		error,
		distinctEmployeesName,
		distinctEmployees,
		fetchEmployees: fetchEmployeesData,
		getEmployee: getEmployeeById,
		createEmployee: createNewEmployee,
		updateEmployee: updateExistingEmployee,
		deleteEmployee: removeEmployee,
	};
}
