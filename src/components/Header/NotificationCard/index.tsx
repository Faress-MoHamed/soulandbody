"use client";

import type { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface PermissionCardProps {
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

const NotificationCard: FC<PermissionCardProps> = ({
	title,
	requesterName,
	department,
	timeRange,
	timeElapsed,
	onAccept,
	onReject,
	acceptLabel = "Accept",
	rejectLabel = "Reject",
	isRtl = false,
}) => {
	return (
		<>
			<Card className={`w-full h-[200px]  text-end border-none shadow-none`}>
				<CardContent className="p-0">
					<div className="relative">
						{/* Header with icon */}
						<div className="flex items-center justify-end p-4 pb-2">
							<div
								className={`text-lg text-end font-medium ${
									isRtl ? "order-2" : "order-1"
								}`}
							>
								{title}
							</div>
							<div className={`${isRtl ? "right-0" : "left-0"} absolute top-0`}>
								<svg
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g clip-path="url(#clip0_2278_2402)">
										<path
											d="M8 0C3.58125 0 0 3.58125 0 8C0 12.4187 3.58125 16 8 16C12.4187 16 16 12.4187 16 8C16 3.58125 12.4187 0 8 0ZM2 8C2 4.68437 4.6875 2 8 2C9.31563 2 10.5312 2.42812 11.5188 3.14687L3.14687 11.5188C2.42812 10.5312 2 9.31563 2 8ZM8 14C6.68437 14 5.46875 13.5719 4.48125 12.8531L12.8531 4.48125C13.5719 5.47187 14 6.68437 14 8C14 11.3156 11.3125 14 8 14Z"
											fill="#C41619"
										/>
									</g>
									<defs>
										<clipPath id="clip0_2278_2402">
											<rect width="16" height="16" fill="white" />
										</clipPath>
									</defs>
								</svg>
							</div>
						</div>

						{/* Content */}
						<div className="px-4 pb-2">
							<p className="text-sm text-gray-700">
								{requesterName} {isRtl ? "من" : "from"} {department}{" "}
								{isRtl ? "طلب" : "requested"} {timeRange}
							</p>

							{timeElapsed && (
								<div className="flex items-center mt-2 text-xs text-gray-500 justify-end">
									<span>{timeElapsed}</span>
									<Clock className="h-3 w-3 mr-1" />
								</div>
							)}
						</div>

						{/* Actions */}
						<div
							className={`flex gap-2 justify-end ${
								isRtl ? "flex-row-reverse" : "flex-row"
							}`}
						>
							<Button
								className="w-[115px] bg-[#16C47F] hover:bg-emerald-600"
								onClick={onAccept}
							>
								{acceptLabel}
							</Button>
							<Button
								variant="outline"
								className="w-[115px] border-[#16C47F] text-[#16C47F]"
								onClick={onReject}
							>
								{rejectLabel}
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
			<Separator />
		</>
	);
};

export default NotificationCard;
