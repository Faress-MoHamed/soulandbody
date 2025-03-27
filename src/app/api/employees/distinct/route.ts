import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/database/db";

export async function GET(req: NextRequest) {
	console.log(req);
	try {
		const employees = db
			.prepare("SELECT DISTINCT employee FROM employees")
			.all();
		return NextResponse.json({ employees });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch distinct employees" },
			{ status: 500 }
		);
	}
}
