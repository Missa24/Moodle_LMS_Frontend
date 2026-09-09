import { useState } from "react";

import { Button } from "@/components/ui/button";
import { QueryState } from "@/components/common/QueryState";

import { useGetMiPerfil } from "@/features/Usuario/Hook/UsuarioHook";

import UserProfile from "@/features/Usuario/Components/UserProfile";
import EditProfileDialog from "@/features/Usuario/Components/EditProfileDialog";
import ChangePasswordDialog from "@/features/Usuario/Components/ChangePasswordDialog";
import ProfilePhotoDialog from "@/features/Usuario/Components/ProfilePhotoDialog";

export default function Profile() {
    const [editOpen, setEditOpen] = useState(false);
    const [passwordOpen, setPasswordOpen] = useState(false);
    const [photoOpen, setPhotoOpen] = useState(false);

    const {
        data: usuario,
        isLoading,
        isError,
        error,
    } = useGetMiPerfil();

    return (
        <QueryState
            isLoading={isLoading}
            isError={isError}
            error={error}
            fallbackMessage="No se pudo cargar tu perfil."
        >
            {usuario && (
                <div className="space-y-6 p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Mi perfil
                            </h1>

                            <p className="text-sm text-muted-foreground">
                                Administra tu información personal y seguridad.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Button
                                onClick={() => setEditOpen(true)}
                            >
                                Editar perfil
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => setPasswordOpen(true)}
                            >
                                Cambiar contraseña
                            </Button>
                        </div>
                    </div>

                    <UserProfile
                        usuario={usuario}
                        onChangePhoto={() => setPhotoOpen(true)}
                    />

                    <EditProfileDialog
                        open={editOpen}
                        onOpenChange={setEditOpen}
                        usuario={usuario}
                    />

                    <ChangePasswordDialog
                        open={passwordOpen}
                        onOpenChange={setPasswordOpen}
                    />

                    <ProfilePhotoDialog
                        open={photoOpen}
                        onOpenChange={setPhotoOpen}
                    />
                </div>
            )}
        </QueryState>
    );
}
