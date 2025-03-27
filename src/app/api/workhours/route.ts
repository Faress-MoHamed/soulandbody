import { NextResponse } from "next/server";
import workHours from "@/lib/database/workHours";

export async function GET() {
	try {
		const workHoursData = workHours.prepare("SELECT * FROM workHours").all();
		return NextResponse.json(workHoursData);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch work hours" },
			{ status: 500 }
		);
	}
}

export async function POST(req: Request) {
	try {
		const { day, startTime, endTime } = await req.json();
		const existing = workHours
			.prepare(`SELECT * FROM workHours WHERE day = ?`)
			.get(day);

		if (!existing) {
			return NextResponse.json(
				{ error: `Day ${day} not found` },
				{ status: 404 }
			);
		}

		const stmt = workHours.prepare(
			`UPDATE workHours SET start_time = ?, end_time = ? WHERE day = ?`
		);
		stmt.run(startTime, endTime, day);

		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to update work hours" },
			{ status: 500 }
		);
	}
}

export async function PUT(req: Request) {
	try {
		const { day } = await req.json();
		const existing: any = workHours
			.prepare(`SELECT is_active FROM workHours WHERE day = ?`)
			.get(day);

		if (!existing) {
			return NextResponse.json(
				{ error: `Day ${day} not found` },
				{ status: 404 }
			);
		}

		const newStatus = existing.is_active ? 0 : 1;
		workHours
			.prepare(`UPDATE workHours SET is_active = ? WHERE day = ?`)
			.run(newStatus, day);

		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to toggle work day" },
			{ status: 500 }
		);
	}
}
export async function PATCH(req: Request) {
	try {
		const { day, breakHours } = await req.json();
		const existing = workHours
			.prepare(`SELECT * FROM workHours WHERE day = ?`)
			.get(day);

		if (!existing) {
			return NextResponse.json(
				{ error: `Day ${day} not found` },
				{ status: 404 }
			);
		}

		const stmt = workHours.prepare(
			`UPDATE workHours SET break_hours = ? WHERE day = ?`
		);
		stmt.run(breakHours, day);

		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to update work hours" },
			{ status: 500 }
		);
	}
}
