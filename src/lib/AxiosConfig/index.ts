import axios from "axios";

export const AxiosInstance = axios.create({
	baseURL: "http://192.168.1.15:8008/api/",
	timeout: 100000,
	headers: {
		Authorization: `Bearer 57|heUUj1h1qLhvoQTrpKOXp3zbL28dIoXKda9oFeJX85b77aef`,
	},
});
