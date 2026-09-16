import axios from "axios";

import { useAuthStore } from "@/store/authStore";
import { isJwtExpired } from "@/utils/auth/jwt";

declare module "axios" {
    interface AxiosRequestConfig {
        skipAuth?: boolean;
        skipAuthRedirect?: boolean;
    }
}

const apiService =
    axios.create({
        baseURL:
            import.meta.env
                .VITE_API_URL,
    });

apiService.interceptors.request.use(
    (config) => {
        const {
            token,
            logout,
        } =
            useAuthStore.getState();

        if (
            config.skipAuth
        ) {
            return config;
        }

        if (!token) {
            return config;
        }

        if (
            isJwtExpired(token)
        ) {
            logout();

            return config;
        }

        config.headers.Authorization =
            `Bearer ${token}`;

        return config;
    },
);

apiService.interceptors.response.use(
    (response) =>
        response,

    (error) => {
        const status =
            error.response?.status;

        const skipAuthRedirect =
            error.config
                ?.skipAuthRedirect ===
            true;

        if (
            status === 401 &&
            !skipAuthRedirect
        ) {
            useAuthStore
                .getState()
                .logout();
        }

        return Promise.reject(
            error,
        );
    },
);

export {
    apiService,
};