import axios from "axios";
import { URL_API } from "./index.js";
import Home from "../components/home/Home.jsx";

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

// Interceptar respuestas de error
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 403) {
        // Limpiar el almacenamiento local
            localStorage.clear();
  
            // Redirigir al usuario a la página de inicio de sesión o a la página principal
            window.location.href = Home; // Ejemplo de redirección a la página de inicio de sesión
        }
  
        return Promise.reject(error);
    }
);

export default axiosInstance;
