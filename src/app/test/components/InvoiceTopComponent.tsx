"use client";

function InvoiceTopComponent() {
	return (
		<div className="flex gap-5 justify-between items-start  p-6">
			<div className="flex flex-col gap-5  flex-1">
				<h2 className="text-[26px] font-bold">بيان بضاعة</h2>
				<div className="flex flex-col gap-4.5">
					<div className="flex justify-between items-center">
						<p>السيد: احمد محمد السيد</p>
						<p>التاريخ:15/10/2025</p>
					</div>
					<div className="flex justify-between items-center">
						<p>رقم الحساب:4512415421</p>
					</div>
				</div>
			</div>
			<h2 className="text-[36px] font-[600]">S00026</h2>
		</div>
	);
}

export default InvoiceTopComponent;
