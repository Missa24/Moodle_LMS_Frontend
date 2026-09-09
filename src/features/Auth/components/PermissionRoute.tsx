import type { ReactNode } from "react";

import { NoPermission } from "@/components/common/NoPermission";
import { usePermission } from "@/hooks/usePermission";

interface PermissionRouteProps {
    permission: string;
    children: ReactNode;
    message?: string;
}

export function PermissionRoute({
    permission,
    children,
    message = "No tienes permisos para acceder a esta sección",
}: PermissionRouteProps) {
    const { can } = usePermission();

    if (!can(permission)) {
        return <NoPermission message={message} />;
    }

    return <>{children}</>;
}