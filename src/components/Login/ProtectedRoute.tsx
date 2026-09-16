import {
    Navigate,
    Outlet,
    useLocation,
} from "react-router-dom";

import {
    useEffect,
} from "react";

import { useAuthStore } from "@/store/authStore";
import { useAuthDialogStore } from "@/store/authDialogStore";
import { isJwtExpired } from "@/utils/auth/jwt";

interface ProtectedRouteProps {
    allowedRoles?: string[];
}

export function ProtectedRoute({
    allowedRoles,
}: ProtectedRouteProps) {
    const {
        token,
        rol,
        usuario,
        logout,
    } =
        useAuthStore();

    const location =
        useLocation();

    const openLoginDialog =
        useAuthDialogStore(
            (state) =>
                state.open,
        );

    const tokenExpirado =
        token
            ? isJwtExpired(
                token,
            )
            : false;

    const sesionValida =
        Boolean(token) &&
        !tokenExpirado;

    useEffect(() => {
        if (
            tokenExpirado
        ) {
            logout();
        }

        if (
            !sesionValida
        ) {
            openLoginDialog(
                location.pathname,
            );
        }
    }, [
        tokenExpirado,
        sesionValida,
        logout,
        location.pathname,
        openLoginDialog,
    ]);

    if (
        !sesionValida
    ) {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }

    const estaCambiandoPassword =
        location.pathname ===
        "/panel/cambiar-password";

    if (
        usuario?.estado ===
        "pendiente" &&
        !estaCambiandoPassword
    ) {
        return (
            <Navigate
                to="/panel/cambiar-password"
                replace
            />
        );
    }

    if (
        allowedRoles &&
        !rol.some((role) =>
            allowedRoles.includes(
                role,
            ),
        )
    ) {
        return (
            <Navigate
                to="/panel/inicio"
                replace
            />
        );
    }

    return <Outlet />;
}