"use client";
import React, { useEffect, useRef } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import CustomPopUp from "@/components/popups";
import AdditionalTimeRequest from "../additionalTimeRequest";
import { useAttendanceAction } from "./hooks/useAttendance";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import {
	setCheckedIn,
	setElapsedTime,
	setSecondaryTime,
	setShowSecondaryTimer,
	setSecondaryTimerColor,
	setDifference,
	setBaseTimerStopped,
	setCheckInTime,
} from "./attendanceSlice";
import { toast } from "react-hot-toast";

export default function Attendance() {
	// Constants for time tracking
	const requiredWorkHours = 8 * 60 * 60; // 8 hours in seconds
	const workdayEndTime = 18 * 60 * 60; // 6:00 PM in seconds (18:00)

	// Redux state and dispatch
	const dispatch = useDispatch();
	const {
		isCheckedIn,
		elapsedTime,
		secondaryTime,
		showSecondaryTimer,
		secondaryTimerColor,
		difference,
		baseTimerStopped,
		checkInTime,
	} = useTypedSelector((state) => state.attendance);

	const baseIntervalRef = useRef<NodeJS.Timeout | null>(null);
	const secondaryIntervalRef = useRef<NodeJS.Timeout | null>(null);

	// Get user's location
	const getLocation = () => {
		return new Promise<{ latitude: number; longitude: number }>(
			(resolve, reject) => {
				if (!navigator.geolocation) {
					reject(new Error("Geolocation is not supported by your browser"));
					return;
				}

				navigator.geolocation.getCurrentPosition(
					(position) => {
						resolve({
							latitude: position.coords.latitude,
							longitude: position.coords.longitude,
						});
					},
					(error) => {
						reject(error);
					}
				);
			}
		);
	};

	// Attendance mutation hook
	const { handleAttendanceAction, isPending } = useAttendanceAction();

	// Format seconds to HH:MM:SS
	const formatTime = (seconds: number) => {
		const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
		const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
		const s = String(seconds % 60).padStart(2, "0");
		return `${h}:${m}:${s}`;
	};

	// Get current time in seconds (since midnight)
	const getCurrentTimeInSeconds = () => {
		const now = new Date();
		return now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
	};

	// Base timer effect
	useEffect(() => {
		if (isCheckedIn && !baseTimerStopped) {
			// Start the base timer when checked in
			baseIntervalRef.current = setInterval(() => {
				dispatch(setElapsedTime(elapsedTime + 1));

				// Check if we've exceeded the required work hours
				if (elapsedTime + 1 >= requiredWorkHours) {
					// Stop base timer and start secondary timer (overtime)
					dispatch(setBaseTimerStopped(true));
					dispatch(setShowSecondaryTimer(true));
					dispatch(setSecondaryTimerColor("text-green-500"));
					dispatch(setElapsedTime(requiredWorkHours)); // Keep base timer at exactly 8 hours
				}

				// Check if it's past end time but haven't completed required hours
				const currentTimeSeconds = getCurrentTimeInSeconds();
				if (
					currentTimeSeconds >= workdayEndTime &&
					elapsedTime + 1 < requiredWorkHours
				) {
					// Stop base timer and start secondary timer (incomplete hours)
					dispatch(setBaseTimerStopped(true));
					dispatch(setShowSecondaryTimer(true));
					dispatch(setSecondaryTimerColor("text-red-500"));
				}
			}, 1000);
		} else {
			// Clear the timer when checked out or when base timer is stopped
			if (baseIntervalRef.current) {
				clearInterval(baseIntervalRef.current);
				baseIntervalRef.current = null;
			}
		}

		// Cleanup function
		return () => {
			if (baseIntervalRef.current) {
				clearInterval(baseIntervalRef.current);
			}
		};
	}, [isCheckedIn, baseTimerStopped, elapsedTime, dispatch]);

	// Secondary timer effect
	useEffect(() => {
		if (showSecondaryTimer && isCheckedIn) {
			secondaryIntervalRef.current = setInterval(() => {
				dispatch(setSecondaryTime(secondaryTime + 1));
			}, 1000);
		} else {
			if (secondaryIntervalRef.current) {
				clearInterval(secondaryIntervalRef.current);
				secondaryIntervalRef.current = null;
			}
		}

		return () => {
			if (secondaryIntervalRef.current) {
				clearInterval(secondaryIntervalRef.current);
			}
		};
	}, [showSecondaryTimer, isCheckedIn, secondaryTime, dispatch]);

	// Handle check-in/check-out button click
	const handleToggle = async () => {
		try {
			const location = await getLocation();

			if (!isCheckedIn) {
				// Checking in
				handleAttendanceAction(
					{
						action: "check-in",
						latitude: location.latitude,
						longitude: location.longitude,
					},
					{
						onSuccess: () => {
							dispatch(setCheckInTime(new Date()));
							dispatch(setElapsedTime(0));
							dispatch(setSecondaryTime(0));
							dispatch(setDifference(null));
							dispatch(setBaseTimerStopped(false));
							dispatch(setShowSecondaryTimer(false));
							dispatch(setCheckedIn(true));
						},
					}
				);
			} else {
				// Checking out
				handleAttendanceAction(
					{
						action: "check-out",
						latitude: location.latitude,
						longitude: location.longitude,
					},
					{
						onSuccess: () => {
							let timeDiff = 0;

							if (secondaryTimerColor === "text-green-500") {
								// Positive difference (overtime)
								timeDiff = secondaryTime;
							} else if (secondaryTimerColor === "text-red-500") {
								// Negative difference (incomplete hours)
								timeDiff = -(requiredWorkHours - elapsedTime);
							} else {
								// Normal case
								timeDiff = elapsedTime - requiredWorkHours;
							}

							dispatch(setDifference(timeDiff));
							dispatch(setCheckedIn(false));
						},
					}
				);
			}
		} catch (error) {
			console.error("Error getting location:", error);
			toast.error("حدث خطأ في الحصول على الموقع. يرجى المحاولة مرة أخرى.");
		}
	};

	// Render the time difference
	const renderDifference = () => {
		if (difference === null) return null;

		const absDiff = Math.abs(difference);
		const formatted = formatTime(absDiff);

		return (
			<p
				className={`place-self-end font-bold ${
					difference >= 0 ? "text-green-500" : "text-red-500"
				}`}
			>
				{difference >= 0 ? "+" : "-"}
				{formatted}
			</p>
		);
	};

	// Get current date formatted for Arabic locale
	const getCurrentDate = () => {
		try {
			return new Date().toLocaleDateString("ar-EG");
		} catch (e) {
			return new Date().toLocaleDateString();
		}
	};

	return (
		<Card className="flex flex-col px-6 py-9 gap-6  md:w-fit md:h-fit">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-center flex-1 lg:text-[18px] font-[600] text-black">
					حضور / أنصراف
				</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-cols-2 gap-6 place-items-end">
				<p className="place-self-start">
					<span>تاريخ اليوم:</span>
					<span> {getCurrentDate()}</span>
				</p>
				<div className="place-self-end flex items-center gap-2">
					<Clock size={20} />
					<span className="font-semibold">{formatTime(elapsedTime)}</span>
				</div>
				<p className="place-self-start">
					<span>ساعه الأنصراف:</span>
					<span> 6:00 م</span>
				</p>
				<div className="flex justify-between items-center">
					{/* Secondary Timer */}
					{showSecondaryTimer && isCheckedIn && (
						<div className="place-self-end col-span-2 flex items-center gap-2">
							<span className={`font-semibold ${secondaryTimerColor}`}>
								{formatTime(secondaryTime)}
								{secondaryTimerColor === "text-green-500" ? "+" : "-"}
							</span>
						</div>
					)}
					{renderDifference()}
				</div>
			</CardContent>
			<CardFooter className="flex flex-col items-center justify-center">
				<Button
					onClick={handleToggle}
					disabled={isPending}
					className={`${"bg-[#16C47F] hover:bg-emerald-600"} text-white px-6 py-2 rounded-md w-[355px] h-[57px] md:mt-8`}
				>
					{isPending
						? "جاري المعالجة..."
						: isCheckedIn
						? "تسجيل أنصراف"
						: "تسجيل حضور"}
				</Button>
				<CustomPopUp
					DialogTriggerComponent={() => {
						return (
							<p className="text-[#16C47F] border-b border-[#16C47F]">
								+ وقت اضافي
							</p>
						);
					}}
					DialogContentComponent={({ closePopup }) => (
						<AdditionalTimeRequest closePopUp={closePopup} />
					)}
				/>
			</CardFooter>
		</Card>
	);
}
