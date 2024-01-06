import axios from "axios";
import { URL_API } from "./index.js";

const axiosInstance = axios.create({
    baseURL: URL_API,
    // Otros ajustes de configuración de Axios
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token && !config.url.includes("/auth/login")) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
