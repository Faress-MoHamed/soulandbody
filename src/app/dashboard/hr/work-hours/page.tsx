"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import SmallTable from "@/components/smallTable";
import {
	useToggleWorkDay,
	useUpdateBreakHours,
	useUpdateWorkHours,
	useWorkHours,
} from "./useWorkHours";
import EmployeeManagement from ".";

export default function EmployeeManagementPage() {
	return <EmployeeManagement />;
}
