export type VacationBalance = "داخل رصيد الإجازات" | "خارج رصيد الإجازات";

export type VacationType = "مرضية" | "سنوية" | "عارضة" | "زواج" | "أمومة"; // You can expand this list

export type WorkRecord = {
	date: string; // التاريخ
	from: string; // من
	to: string; // الى
	vacationType?: VacationType; // نوع الإجازة (e.g., "مرضية")
	balanceType?: VacationBalance; // داخل/خارج رصيد الإجازات
	reason: string; // السبب
	deduction: string; // الخصم
	status: "pending" | "accepted" | "done" | "denied"; // الحالة
};
