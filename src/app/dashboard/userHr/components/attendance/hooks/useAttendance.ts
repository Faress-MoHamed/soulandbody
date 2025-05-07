import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "@/lib/AxiosConfig";
import { toast } from "react-hot-toast";

interface AttendanceRequest {
	action: "check-in" | "check-out";
	latitude: number;
	longitude: number;
}

export function useAttendanceAction() {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: async (attendanceReq: AttendanceRequest) => {
			const { data } = await AxiosInstance.post(
				"user/auth/check-in",
				attendanceReq
			);
			return data;
		},
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["attendance"] });
			toast.success(
				variables.action === "check-in"
					? "تم تسجيل الحضور بنجاح"
					: "تم تسجيل الانصراف بنجاح"
			);
		},
		onError: (error: any) => {
			const errorMessages = error?.response?.data?.message;

			if (errorMessages && typeof errorMessages === "object") {
				Object.keys(errorMessages).forEach((field) => {
					const messages = errorMessages[field];
					messages.forEach((message: any) => {
						toast.error(`${message}`);
					});
				});
			} else {
				toast.error("حدث خطأ. يرجى المحاولة مرة أخرى.");
			}
		},
	});

	return { handleAttendanceAction: mutate, isPending };
}
