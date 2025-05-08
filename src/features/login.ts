import { AxiosInstance } from "@/lib/AxiosConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "js-cookie"; // Import js-cookie to work with cookies

export function useLogin() {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: async ({
			email,
			password,
		}: {
			email: string;
			password: string;
		}) => {
			// Make the login request to the API
			const { data } = await AxiosInstance.post("/auth/login", {
				email,
				password,
			});

			return data; // Return the received data (including the token)
		},
		onSuccess: (data) => {
			// Save the token in cookies after a successful login
			Cookies.set("auth_token", data.token, { expires: 7 }); // Token will expire in 7 days

			// Optionally store user data or other relevant information
			Cookies.set("user_data", JSON.stringify(data.data), { expires: 7 });

			// Trigger a successful login toast
			toast.success("Login successful!");

			// Redirect to a protected route, e.g., dashboard or home page
			router.push("/");
		},
		onError: (error:any) => {
			// console.log(error)
			toast.error(error?.response?.data?.message);

		},
	});
}
