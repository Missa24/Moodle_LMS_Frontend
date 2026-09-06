import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useAuthDialogStore } from "@/store/authDialogStore";

interface ProtectedRouteProps {
    allowedRoles?: string[];
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const { token, rol, usuario } = useAuthStore();
    const location = useLocation();
    const openLoginDialog = useAuthDialogStore((s) => s.open);

    useEffect(() => {
        if (!token) {
            openLoginDialog(location.pathname);
        }
    }, [token, location.pathname, openLoginDialog]);

    if (!token) {
        return <Navigate to="/" replace />;
    }

    const estaCambiandoPassword = location.pathname === "/panel/cambiar-password";

    if (usuario?.estado === "pendiente" && !estaCambiandoPassword) {
        return <Navigate to="/panel/cambiar-password" replace />;
    }

    if (allowedRoles && !rol.some((r) => allowedRoles.includes(r))) {
        return <Navigate to="/panel/inicio" replace />;
    }

    return <Outlet />;
}