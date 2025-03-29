import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/database/db";

export interface Employee {
	id: string;
	date: string;
	employee: string;
	work_nature: string;
	net_salary: string;
	phone_number: string;
	address: string;
	birthDate: string;
	qualification: string;
	position: string;
	extras: string;
}

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");

	if (id) {
		const employee = db.prepare("SELECT * FROM employees WHERE id = ?").get(id);
		if (!employee) {
			return NextResponse.json(
				{ error: "Employee not found" },
				{ status: 404 }
			);
		}
		return NextResponse.json(employee);
	}

	const employees = db.prepare("SELECT * FROM employees").all();

	return NextResponse.json({
		employees,
	});
}

export async function POST(req: NextRequest) {
	try {
		const employee: Omit<Employee, "id"> = await req.json();
		console.log(employee);
		const stmt = db.prepare(
			`INSERT INTO employees (date, employee, work_nature, net_salary, phone_number, address, birthDate, qualification, position, extras)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
		);

		const result = stmt.run(
			employee.date,
			employee.employee,
			employee.work_nature,
			employee.net_salary,
			employee.phone_number,
			employee.address,
			employee.birthDate,
			employee.qualification,
			employee.position,
			employee.extras
		);

		if (result.changes > 0) {
			const newEmployee = db
				.prepare("SELECT * FROM employees WHERE id = ?")
				.get(result.lastInsertRowid);
			return NextResponse.json(newEmployee, { status: 201 });
		}

		return NextResponse.json(
			{ error: "Failed to create employee" },
			{ status: 400 }
		);
	} catch (error) {
		return NextResponse.json(
			{ error: error || "Invalid request" },
			{ status: 400 }
		);
	}
}

export async function PUT(req: NextRequest) {
	try {
		const { id, ...employee }: Partial<Employee> = await req.json();
		if (!id)
			return NextResponse.json({ error: "ID is required" }, { status: 400 });

		const fields = Object.keys(employee)
			.map((key) => `${key} = ?`)
			.join(", ");
		const values = Object.values(employee);
		values.push(id);

		const stmt = db.prepare(`UPDATE employees SET ${fields} WHERE id = ?`);
		const result = stmt.run(...values);

		if (result.changes > 0) {
			const updatedEmployee = db
				.prepare("SELECT * FROM employees WHERE id = ?")
				.get(id);
			return NextResponse.json(updatedEmployee);
		}

		return NextResponse.json(
			{ error: "Failed to update employee" },
			{ status: 400 }
		);
	} catch (error) {
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}
}

// DELETE - Remove an employee
export async function DELETE(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const id = Number(searchParams.get("id"));

		if (!id)
			return NextResponse.json({ error: "ID is required" }, { status: 400 });

		const stmt = db.prepare("DELETE FROM employees WHERE id = ?");
		const result = stmt.run(id);

		if (result.changes > 0) {
			return NextResponse.json({ success: true });
		}

		return NextResponse.json({ error: "Employee not found" }, { status: 404 });
	} catch (error) {
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}
}
