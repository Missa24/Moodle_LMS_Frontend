import axios from "axios";
import { useAuthStore } from "@/store/authStore";

declare module "axios" {
    interface AxiosRequestConfig {
        skipAuth?: boolean;
        skipAuthRedirect?: boolean;
    }
}

const apiService = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

apiService.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;

    // Solo enviar token cuando la petición lo necesita
    if (token && !config.skipAuth) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

apiService.interceptors.response.use(
    (response) => response,
    (error) => {
        if (
            error.response?.status === 401 &&
            !error.config?.skipAuthRedirect
        ) {
            useAuthStore.getState().logout();

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export { apiService };
