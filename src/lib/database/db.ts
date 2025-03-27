import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dataDir = path.join(process.cwd());
if (!fs.existsSync(dataDir)) {
	fs.mkdirSync(dataDir, { recursive: true });
}

const db: any = new Database(path.join(dataDir, "employees.db"));
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    employee TEXT NOT NULL,
    birthDate TEXT NOT NULL,
    qualification TEXT NOT NULL,
    position TEXT NOT NULL,
    work_nature TEXT,
    net_salary TEXT NOT NULL,
    extras TEXT,
    phone_number TEXT,
    address TEXT
  )
`);

const getRandomDate = (start: Date, end: Date) => {
	const date = new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
	return date.toISOString().split("T")[0]; 
};

const employees = [
	"أحمد محمود",
	"محمد علي",
	"خالد حسن",
	"ياسر عبد الله",
	"سعيد عمر",
];
const qualifications = ["بكالوريوس", "دبلوم", "ماجستير", "دكتوراه"];
const positions = ["مهندس", "محاسب", "إداري", "مدير"];
const workNatureOptions = ["م٦:00", "م٨:00", "متنوع"];
const salaries = ["7000", "7200", "7500", "8000", "8500"];
const extras = ["100", "200", "300", "400"];
const phoneNumbers = [
	"010261545",
	"010987654",
	"011234567",
	"012345678",
	"015678901",
];
const addresses = ["القاهرة", "الجيزة", "الإسكندرية", "أسيوط", "المنصورة"];

const employeesData = Array.from({ length: 100 }, () => ({
	date: getRandomDate(new Date(2025, 8, 1), new Date(2025, 11, 1)), 
	employee: employees[Math.floor(Math.random() * employees.length)],
	birthDate: getRandomDate(new Date(1985, 0, 1), new Date(2000, 11, 31)), 
	qualification:
		qualifications[Math.floor(Math.random() * qualifications.length)],
	position: positions[Math.floor(Math.random() * positions.length)],
	work_nature:
		workNatureOptions[Math.floor(Math.random() * workNatureOptions.length)],
	net_salary: salaries[Math.floor(Math.random() * salaries.length)],
	extras: extras[Math.floor(Math.random() * extras.length)],
	phone_number: phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)],
	address: addresses[Math.floor(Math.random() * addresses.length)],
}));

const rowCount = db.prepare("SELECT COUNT(*) AS count FROM employees").get()
	.count as number;
if (rowCount === 0) {
	const insert = db.prepare(`
		INSERT INTO employees (date, employee, birthDate, qualification, position, work_nature, net_salary, extras, phone_number, address) 
		VALUES (@date, @employee, @birthDate, @qualification, @position, @work_nature, @net_salary, @extras, @phone_number, @address)
	`);

	const insertMany = db.transaction((data: any) => {
		for (const emp of data) insert.run(emp);
	});

	insertMany(employeesData);
	console.log("✅ 100 random employee records inserted.");
} else {
	console.log("⚠️ Data already exists. Skipping insertion.");
}

export default db;
