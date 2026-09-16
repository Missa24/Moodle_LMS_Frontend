import {
    useEffect,
} from "react";

import { useAuthStore } from "@/store/authStore";
import {
    getJwtExpiration,
    isJwtExpired,
} from "@/utils/auth/jwt";

export function AuthSessionManager() {
    const token =
        useAuthStore(
            (state) =>
                state.token,
        );

    const logout =
        useAuthStore(
            (state) =>
                state.logout,
        );

    useEffect(() => {
        if (!token) {
            return;
        }

        const expiration =
            getJwtExpiration(
                token,
            );

        if (
            !expiration ||
            isJwtExpired(token)
        ) {
            logout();
            return;
        }

        const checkExpiration =
            () => {
                if (
                    isJwtExpired(
                        token,
                    )
                ) {
                    logout();
                }
            };

        const remaining =
            expiration -
            Date.now();

        const timeout =
            window.setTimeout(
                checkExpiration,
                remaining,
            );

        window.addEventListener(
            "focus",
            checkExpiration,
        );

        const handleVisibilityChange =
            () => {
                if (
                    document.visibilityState ===
                    "visible"
                ) {
                    checkExpiration();
                }
            };

        document.addEventListener(
            "visibilitychange",
            handleVisibilityChange,
        );

        return () => {
            window.clearTimeout(
                timeout,
            );

            window.removeEventListener(
                "focus",
                checkExpiration,
            );

            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange,
            );
        };
    }, [
        token,
        logout,
    ]);

    return null;
}