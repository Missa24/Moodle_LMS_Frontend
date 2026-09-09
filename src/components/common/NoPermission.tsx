import { MascotSinPermiso } from "@/components/common/mascots";

interface NoPermissionProps {
    message?: string;
}

export function NoPermission({
    message = "No tienes permisos para acceder a esta sección",
}: NoPermissionProps) {
    return (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-3 rounded-xl border bg-muted/20 p-6 text-center">
            <MascotSinPermiso className="h-32 w-auto" />

            <div>
                <p className="text-sm font-medium">
                    {message}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                    Si crees que es un error,
                    contacta a un administrador.
                </p>
            </div>
        </div>
    );
}