import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// Database setup
const dataDir = path.join(process.cwd());
if (!fs.existsSync(dataDir)) {
	fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(path.join(process.cwd(), "employees.db"));
db.pragma("foreign_keys = ON");

// Create table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    employee TEXT NOT NULL,
    work_nature TEXT NOT NULL,
    net_salary TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    address TEXT NOT NULL
  )
`);

// Helper function to generate random dates
const getRandomDate = (start: Date, end: Date) => {
	const date = new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
	return date.toISOString().split("T")[0].split("-").reverse().join("/"); // Format: DD/MM/YYYY
};

// Sample employee names
const employees = [
	"أحمد محمود",
	"محمد علي",
	"خالد حسن",
	"ياسر عبد الله",
	"سعيد عمر",
];
const workNatureOptions = ["م٦:00", "م٨:00", "متنوع"];
const salaries = ["7000", "7200", "7500", "8000", "8500"];
const phoneNumbers = [
	"010261545",
	"010987654",
	"011234567",
	"012345678",
	"015678901",
];
const addresses = ["القاهرة", "الجيزة", "الإسكندرية", "أسيوط", "المنصورة"];

// Generate 100 random employees
const employeesData = Array.from({ length: 100 }, () => ({
	date: getRandomDate(new Date(2025, 8, 1), new Date(2025, 11, 1)), // Sep-Dec 2025
	employee: employees[Math.floor(Math.random() * employees.length)],
	work_nature:
		workNatureOptions[Math.floor(Math.random() * workNatureOptions.length)],
	net_salary: salaries[Math.floor(Math.random() * salaries.length)],
	phone_number: phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)],
	address: addresses[Math.floor(Math.random() * addresses.length)],
}));

// Check if data already exists
const rowCount = (
	db.prepare("SELECT COUNT(*) AS count FROM employees") as any
).get().count as number;
if (rowCount === 0) {
	const insert = db.prepare(`
		INSERT INTO employees (date, employee, work_nature, net_salary, phone_number, address) 
		VALUES (@date, @employee, @work_nature, @net_salary, @phone_number, @address)
	`);

	const insertMany = db.transaction((data) => {
		for (const emp of data) insert.run(emp);
	});

	insertMany(employeesData);
	console.log("✅ 100 random employee records inserted.");
} else {
	console.log("⚠️ Data already exists. Skipping insertion.");
}
export default db;
