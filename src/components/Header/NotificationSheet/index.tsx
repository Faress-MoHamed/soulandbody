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
import NotificationsIcon from "@/iconsSvg/NotificationsIcon";
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
		<div className="flex">
			<Sheet>
				<SheetTrigger>
					<NotificationsIcon />
				</SheetTrigger>
				<SheetContent
					side="left"
					className="w-full sm:max-w-md overflow-auto p-5"
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
