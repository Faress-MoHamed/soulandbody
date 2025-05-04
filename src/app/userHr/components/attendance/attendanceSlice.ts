import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AttendanceState {
	isCheckedIn: boolean;
	elapsedTime: number;
	secondaryTime: number;
	showSecondaryTimer: boolean;
	secondaryTimerColor: string;
	difference: number | null;
	baseTimerStopped: boolean;
	checkInTime: Date | null;
}

const initialState: AttendanceState = {
	isCheckedIn: false,
	elapsedTime: 0,
	secondaryTime: 0,
	showSecondaryTimer: false,
	secondaryTimerColor: "text-black",
	difference: null,
	baseTimerStopped: false,
	checkInTime: null,
};

export const attendanceSlice = createSlice({
	name: "attendance",
	initialState,
	reducers: {
		setCheckedIn: (state, action: PayloadAction<boolean>) => {
			state.isCheckedIn = action.payload;
		},
		setElapsedTime: (state, action: PayloadAction<number>) => {
			state.elapsedTime = action.payload;
		},
		setSecondaryTime: (state, action: PayloadAction<number>) => {
			state.secondaryTime = action.payload;
		},
		setShowSecondaryTimer: (state, action: PayloadAction<boolean>) => {
			state.showSecondaryTimer = action.payload;
		},
		setSecondaryTimerColor: (state, action: PayloadAction<string>) => {
			state.secondaryTimerColor = action.payload;
		},
		setDifference: (state, action: PayloadAction<number | null>) => {
			state.difference = action.payload;
		},
		setBaseTimerStopped: (state, action: PayloadAction<boolean>) => {
			state.baseTimerStopped = action.payload;
		},
		setCheckInTime: (state, action: PayloadAction<Date | null>) => {
			state.checkInTime = action.payload;
		},
		resetAttendance: (state) => {
			return initialState;
		},
	},
});

export const {
	setCheckedIn,
	setElapsedTime,
	setSecondaryTime,
	setShowSecondaryTimer,
	setSecondaryTimerColor,
	setDifference,
	setBaseTimerStopped,
	setCheckInTime,
	resetAttendance,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;
