"use server";

import workHours from "@/lib/database/workHours";

interface workHoursTypes {
	id: number;
	day: string;
	start_time: string;
	end_time: string;
	is_active: number;
}

export async function fetchWorkHours() {
	const workHoursData = workHours
		.prepare("SELECT * FROM workHours")
		.all() as workHoursTypes[];

	return {
		workHours: workHoursData,
	};
}

export async function triggerDay(day: string) {
	// Ensure the day exists before toggling
	const existing: any = workHours
		.prepare(`SELECT is_active FROM workHours WHERE day = ?`)
		.get(day);

	if (!existing) {
		throw new Error(`Day ${day} not found in workHours table.`);
	}

	// Toggle is_active (if 1 → set to 0, if 0 → set to 1)
	const newStatus = existing?.is_active ? 0 : 1;

	const stmt = workHours.prepare(
		`UPDATE workHours SET is_active = ? WHERE day = ?`
	);

	const result = stmt.run(newStatus, day);

	return result.changes > 0;
}
export async function updateWorkHours(
	day: string,
	startTime: string,
	endTime: string
) {
	// Ensure the day exists before updating
	const existing = workHours
		.prepare(`SELECT * FROM workHours WHERE day = ?`)
		.get(day);

	if (!existing) {
		throw new Error(`Day ${day} not found in workHours table.`);
	}

	// Update start_time and end_time
	const stmt = workHours.prepare(
		`UPDATE workHours SET start_time = ?, end_time = ? WHERE day = ?`
	);

	const result = stmt.run(startTime, endTime, day);

	return result.changes > 0;
}

export async function updateBreakHours(day: string, breakHours: number) {
	// Ensure the day exists before updating
	const existing = workHours
		.prepare(`SELECT * FROM workHours WHERE day = ?`)
		.get(day);

	if (!existing) {
		throw new Error(`Day ${day} not found in workHours table.`);
	}

	// Update break_hours
	const stmt = workHours.prepare(
		`UPDATE workHours SET break_hours = ? WHERE day = ?`
	);

	const result = stmt.run(breakHours, day);

	return result.changes > 0;
}
