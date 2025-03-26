"use client";

import { useState, useEffect } from "react";
import {
	fetchWorkHours,
	updateWorkHours,
	triggerDay,
	updateBreakHours,
} from "./workHours.server";

interface WorkHours {
	id: number;
	day: string;
	start_time: string;
	end_time: string;
	is_active: number;
}

interface UseWorkHoursReturn {
	workHours: WorkHours[];
	loading: boolean;
	error: string | null;
	refreshWorkHours: () => Promise<void>;
	updateWorkHours: (
		day: string,
		startTime: string,
		endTime: string
	) => Promise<boolean>;
	updateBreakHours: (day: string, breakHours: number) => Promise<boolean>;
	toggleWorkDay: (day: string) => Promise<boolean>;
}

export function useWorkHours(): UseWorkHoursReturn {
	const [workHours, setWorkHours] = useState<WorkHours[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchWorkHoursData = async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await fetchWorkHours();
			setWorkHours(data.workHours);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	const updateWorkHoursEntry = async (
		day: string,
		startTime: string,
		endTime: string
	) => {
		setLoading(true);
		setError(null);
		try {
			const success = await updateWorkHours(day, startTime, endTime);
			if (success) await fetchWorkHoursData();
			return success;
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
			return false;
		} finally {
			setLoading(false);
		}
	};

	const toggleWorkDayStatus = async (day: string) => {
		setLoading(true);
		setError(null);
		try {
			const success = await triggerDay(day);
			if (success) await fetchWorkHoursData();
			return success;
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
			return false;
		} finally {
			setLoading(false);
		}
	};

	const updateBreakHoursEntry = async (day: string, breakHours: number) => {
		setLoading(true);
		setError(null);
		try {
			const success = await updateBreakHours(day, breakHours);
			if (success) await fetchWorkHoursData();
			return success;
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
			return false;
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchWorkHoursData();
	}, []);

	return {
		workHours,
		loading,
		error,
		updateBreakHours: updateBreakHoursEntry,
		refreshWorkHours: fetchWorkHoursData,
		updateWorkHours: updateWorkHoursEntry,
		toggleWorkDay: toggleWorkDayStatus,
	};
}
