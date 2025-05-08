import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("auth_token");
	console.log(token)
export const AxiosInstance = axios.create({
  baseURL: "http://192.168.1.15:8008/api/",
  timeout: 100000,
  headers: {
    Authorization: token ? `Bearer ${token}` : undefined,
  },
});
