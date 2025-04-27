import axios from "axios";

export const AxiosInstance = axios.create({
	baseURL: "http://192.168.1.15:8000/api/",
	timeout: 100000,
	headers: {
		Authorization: `Bearer 30|Ae7cvzQ70aoR17B2nLEH4UthkqMSJqB8wNf6kh7redbc5fb0`,
	},
});
