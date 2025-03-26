"use server";

import db from "@/lib/database/db";

export interface Employee {
	id: number;
	date: string;
	employee: string;
	leaveStart: string;
	leaveEnd: string;
	leaveDays: number;
	leaveType: string;
	deduction: number;
}

export async function fetchEmployees(page: number = 1, limit: number = 10) {
	const offset = (page - 1) * limit;
	const employees = db
		.prepare("SELECT * FROM employees LIMIT ? OFFSET ?")
		.all(limit, offset) as Employee[];

	const total = db.prepare("SELECT COUNT(*) as count FROM employees").get() as {
		count: number;
	};

	return {
		employees,
		pagination: {
			total: total.count,
			pages: Math.ceil(total.count / limit),
			current: page,
		},
	};
}

export async function getEmployee(id: number) {
	return db
		.prepare("SELECT * FROM employees WHERE id = ?")
		.get(id) as Employee | null;
}
export async function getDistinctEmployees() {
	const stmt = db.prepare(`
    SELECT DISTINCT employee FROM employees
    ORDER BY employee ASC
`);

	const employees = stmt.all();

	return {
		employees,
	};
}

export async function createEmployee(employee: Omit<Employee, "id">) {
	const stmt = db.prepare(
		`INSERT INTO employees (date, employee, leaveStart, leaveEnd, leaveDays, leaveType, deduction)
		 VALUES (?, ?, ?, ?, ?, ?, ?)`
	);
	const result = stmt.run(
		employee.date,
		employee.employee,
		employee.leaveStart,
		employee.leaveEnd,
		employee.leaveDays,
		employee.leaveType,
		employee.deduction
	);

	if (result.changes > 0) {
		return getEmployee(result.lastInsertRowid as number);
	}
	return null;
}

export async function updateEmployee(id: number, employee: Partial<Employee>) {
	const fields = Object.keys(employee)
		.map((key) => `${key} = ?`)
		.join(", ");

	const values = Object.values(employee);
	values.push(id);

	const stmt = db.prepare(`UPDATE employees SET ${fields} WHERE id = ?`);
	stmt.run(...values);

	return getEmployee(id);
}

export async function deleteEmployee(id: number) {
	const stmt = db.prepare("DELETE FROM employees WHERE id = ?");
	const result = stmt.run(id);
	return result.changes > 0;
}
