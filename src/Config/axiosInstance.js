import axios from "axios";

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = import.meta.env.BASE_URL;
axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.timeout = import.meta.env.API_TIME_OUT;

export default axiosInstance;