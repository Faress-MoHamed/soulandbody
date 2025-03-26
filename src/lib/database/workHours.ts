import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// Database setup
const dataDir = path.join(process.cwd());
if (!fs.existsSync(dataDir)) {
	fs.mkdirSync(dataDir, { recursive: true });
}

const workHours = new Database(path.join(process.cwd(), "workHours.db"));
workHours.pragma("foreign_keys = ON");

// Create table if not exists
workHours.exec(`
CREATE TABLE IF NOT EXISTS workHours (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    day TEXT UNIQUE NOT NULL, 
    start_time TEXT NOT NULL DEFAULT '16:00',
    end_time TEXT NOT NULL DEFAULT '20:00',
    is_active INTEGER NOT NULL CHECK(is_active IN (0,1)) DEFAULT 1,
    break_hours DECIMAL(5,2) NOT NULL DEFAULT 0
);
`);

const days = [
	"السبت",
	"الأحد",
	"الإثنين",
	"الثلاثاء",
	"الأربعاء",
	"الخميس",
	"الجمعة",
];

// Check if days are already inserted
const count = workHours
	.prepare("SELECT COUNT(*) AS count FROM workHours")
	.get() as {
	count: number;
};

if (count.count === 0) {
	const insertStmt = workHours.prepare(
		"INSERT INTO workHours (day) VALUES (?)"
	);
	const insertMany = workHours.transaction((days: string[]) => {
		for (const day of days) insertStmt.run(day);
	});
	insertMany(days);
}
export default workHours;
