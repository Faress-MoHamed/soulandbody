"use client";

import { useState } from "react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bell } from "lucide-react";
import NotificationCard from "../NotificationCard";
export interface PermissionCardProps {
	title: string;
	requesterName: string;
	department: string;
	timeRange: string;
	timeElapsed?: string;
	onAccept?: () => void;
	onReject?: () => void;
	acceptLabel?: string;
	rejectLabel?: string;
	isRtl?: boolean;
}
export default function NotificationsSheet() {
	const [open, setOpen] = useState(false);
	const mockPermissionCards: PermissionCardProps[] = [
		// Arabic RTL examples
		{
			title: "طلب الإذن",
			requesterName: "محمد اسماعيل",
			department: "قسم الموارد البشرية",
			timeRange: "ساعة بداية من 2:00 حتى 3:00",
			timeElapsed: "منذ ساعة واحدة",
			acceptLabel: "قبول",
			rejectLabel: "رفض",
			isRtl: true,
			onAccept: () => console.log("Accepted request from محمد اسماعيل"),
			onReject: () => console.log("Rejected request from محمد اسماعيل"),
		},
		{
			title: "طلب إجازة",
			requesterName: "أحمد محمود",
			department: "قسم تكنولوجيا المعلومات",
			timeRange: "3 أيام من 20 أبريل إلى 22 أبريل",
			timeElapsed: "منذ 3 ساعات",
			acceptLabel: "قبول",
			rejectLabel: "رفض",
			isRtl: true,
			onAccept: () => console.log("Accepted request from أحمد محمود"),
			onReject: () => console.log("Rejected request from أحمد محمود"),
		},
		{
			title: "طلب العمل عن بعد",
			requesterName: "فاطمة علي",
			department: "قسم التسويق",
			timeRange: "يوم الخميس 18 أبريل",
			timeElapsed: "منذ 30 دقيقة",
			acceptLabel: "قبول",
			rejectLabel: "رفض",
			isRtl: true,
			onAccept: () => console.log("Accepted request from فاطمة علي"),
			onReject: () => console.log("Rejected request from فاطمة علي"),
		},
		{
			title: "طلب وصول",
			requesterName: "عمر خالد",
			department: "قسم الأمن",
			timeRange: "وصول إلى الطابق الثالث",
			timeElapsed: "منذ 15 دقيقة",
			acceptLabel: "قبول",
			rejectLabel: "رفض",
			isRtl: true,
			onAccept: () => console.log("Accepted request from عمر خالد"),
			onReject: () => console.log("Rejected request from عمر خالد"),
		},

		// English LTR examples
		{
			title: "Permission Request",
			requesterName: "John Smith",
			department: "HR Department",
			timeRange: "1 hour from 2:00 to 3:00 PM",
			timeElapsed: "1 hour ago",
			acceptLabel: "Accept",
			rejectLabel: "Reject",
			isRtl: false,
			onAccept: () => console.log("Accepted request from John Smith"),
			onReject: () => console.log("Rejected request from John Smith"),
		},
		{
			title: "Vacation Request",
			requesterName: "Sarah Johnson",
			department: "Marketing Department",
			timeRange: "5 days from May 10 to May 14",
			timeElapsed: "2 hours ago",
			acceptLabel: "Accept",
			rejectLabel: "Reject",
			isRtl: false,
			onAccept: () => console.log("Accepted request from Sarah Johnson"),
			onReject: () => console.log("Rejected request from Sarah Johnson"),
		},
		{
			title: "Overtime Request",
			requesterName: "Michael Chen",
			department: "Engineering Department",
			timeRange: "3 hours on April 16",
			timeElapsed: "45 minutes ago",
			acceptLabel: "Accept",
			rejectLabel: "Reject",
			isRtl: false,
			onAccept: () => console.log("Accepted request from Michael Chen"),
			onReject: () => console.log("Rejected request from Michael Chen"),
		},
		{
			title: "Remote Work Request",
			requesterName: "Emily Davis",
			department: "Design Department",
			timeRange: "Thursday, April 18",
			timeElapsed: "30 minutes ago",
			acceptLabel: "Accept",
			rejectLabel: "Reject",
			isRtl: false,
			onAccept: () => console.log("Accepted request from Emily Davis"),
			onReject: () => console.log("Rejected request from Emily Davis"),
		},
	];
	return (
		<div className="flex justify-center p-4">
			<Sheet>
				<SheetTrigger>
					<svg
						width="28"
						height="28"
						viewBox="0 0 28 28"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M4.66675 22.1668V19.8335H7.00008V11.6668C7.00008 10.0529 7.48619 8.62377 8.45842 7.37933C9.43064 6.11544 10.6945 5.28905 12.2501 4.90016V4.0835C12.2501 3.59738 12.4154 3.18905 12.7459 2.85849C13.0959 2.5085 13.514 2.3335 14.0001 2.3335C14.4862 2.3335 14.8945 2.5085 15.2251 2.85849C15.5751 3.18905 15.7501 3.59738 15.7501 4.0835V4.90016C17.3056 5.28905 18.5695 6.11544 19.5417 7.37933C20.514 8.62377 21.0001 10.0529 21.0001 11.6668V19.8335H23.3334V22.1668H4.66675ZM14.0001 25.6668C13.3584 25.6668 12.8042 25.4432 12.3376 24.996C11.8904 24.5293 11.6667 23.9752 11.6667 23.3335H16.3334C16.3334 23.9752 16.1001 24.5293 15.6334 24.996C15.1862 25.4432 14.6417 25.6668 14.0001 25.6668ZM9.33342 19.8335H18.6667V11.6668C18.6667 10.3835 18.2098 9.28488 17.2959 8.371C16.382 7.45711 15.2834 7.00016 14.0001 7.00016C12.7167 7.00016 11.6181 7.45711 10.7042 8.371C9.79036 9.28488 9.33342 10.3835 9.33342 11.6668V19.8335Z"
							fill="#1D1B20"
						/>
					</svg>
				</SheetTrigger>
				<SheetContent
					side="left"
					className="w-full sm:max-w-md overflow-auto rtl p-5"
				>
					<SheetHeader className="text-right">
						<SheetTitle className="text-2xl font-bold">الإشعارات</SheetTitle>
					</SheetHeader>

					{mockPermissionCards?.map((el) => (
            <NotificationCard {...el} />
            
					))}
				</SheetContent>
			</Sheet>
		</div>
	);
}
