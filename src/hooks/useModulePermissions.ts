import { usePermission } from "@/hooks/usePermission";

interface ModulePermissions {
    VER?: string;
    CREAR?: string;
    EDITAR?: string;
    ELIMINAR?: string;
}

export function useModulePermissions(
    permissions: ModulePermissions,
) {
    const { can } = usePermission();

    const puedeVer =
        permissions.VER
            ? can(permissions.VER)
            : false;

    const puedeCrear =
        permissions.CREAR
            ? can(permissions.CREAR)
            : false;

    const puedeEditar =
        permissions.EDITAR
            ? can(permissions.EDITAR)
            : false;

    const puedeEliminar =
        permissions.ELIMINAR
            ? can(permissions.ELIMINAR)
            : false;

    return {
        puedeVer,
        puedeCrear,
        puedeEditar,
        puedeEliminar,
    };
}