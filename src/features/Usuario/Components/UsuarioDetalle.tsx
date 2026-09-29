"use client";

import { useState } from "react";
import {
    ArrowLeft,
    Check,
    Copy,
    KeyRound,
    Loader2,
    Pencil,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { UsuarioDetailType } from "../Schema/UsuarioSchema";
import { FormUsuario } from "./FormUsuario";
import { AppTitle } from "@/components/common/Apptittle";
import { InfoSection } from "@/components/common/info/InfoSection";
import { InfoField } from "@/components/common/info/InfoField";
import { useResetUserPassword } from "../Hook/UsuarioHook";

interface UsuarioDetalleProps {
    usuario: UsuarioDetailType;
    onBack: () => void;
}

export function UsuarioDetalle({
    usuario,
    onBack,
}: UsuarioDetalleProps) {
    const [openEdit, setOpenEdit] = useState(false);
    const [openPassword, setOpenPassword] = useState(false);
    const [passwordTemporal, setPasswordTemporal] = useState("");
    const [copiado, setCopiado] = useState(false);

    const resetPassword = useResetUserPassword();
    const perfil = usuario.perfil;

    const nombreCompleto = [
        perfil?.nombre,
        perfil?.apellidoPaterno,
        perfil?.apellidoMaterno,
    ]
        .filter(Boolean)
        .join(" ");

    const rol = usuario.roles?.[0]?.rol?.nombre ?? "-";

    const abrirPassword = () => {
        setPasswordTemporal("");
        setCopiado(false);
        setOpenPassword(true);
    };

    const cerrarPassword = () => {
        if (resetPassword.isPending) return;

        setOpenPassword(false);
        setPasswordTemporal("");
        setCopiado(false);
    };

    const restablecerPassword = () => {
        resetPassword.mutate(usuario.id, {
            onSuccess: (response) => {
                setPasswordTemporal(response.passwordTemporal);
            },
        });
    };

    const copiarPassword = async () => {
        if (!passwordTemporal) return;

        await navigator.clipboard.writeText(passwordTemporal);

        setCopiado(true);
        toast.success("Contraseña copiada");

        window.setTimeout(() => {
            setCopiado(false);
        }, 2000);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={onBack}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>

                    <AppTitle
                        title="Detalle del usuario"
                        subtitle="Información completa del usuario"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={abrirPassword}
                    >
                        <KeyRound className="mr-2 h-4 w-4" />
                        Restablecer contraseña
                    </Button>

                    <Button
                        onClick={() => setOpenEdit(true)}
                    >
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>
                            {nombreCompleto || usuario.username}
                        </CardTitle>

                        <p className="mt-1 text-sm text-muted-foreground">
                            {usuario.correo}
                        </p>
                    </div>

                    <Badge
                        variant={
                            usuario.estado.toLowerCase() === "activo"
                                ? "default"
                                : "secondary"
                        }
                    >
                        {usuario.estado}
                    </Badge>
                </CardHeader>

                <CardContent>
                    <InfoSection
                        title="Información personal"
                        subtitle="Datos personales y de contacto del usuario"
                        withDivider={false}
                    >
                        <InfoField
                            label="Nombre completo"
                            value={nombreCompleto || "-"}
                        />

                        <InfoField
                            label="Usuario"
                            value={usuario.username}
                        />

                        <InfoField
                            label="Correo"
                            value={usuario.correo}
                        />

                        <InfoField
                            label="Teléfono"
                            value={perfil?.telefono || "-"}
                        />

                        <InfoField
                            label="Documento"
                            value={
                                [
                                    perfil?.tipoDocumentoIdentidad,
                                    perfil?.numeroDocumento,
                                ]
                                    .filter(Boolean)
                                    .join(" ") || "-"
                            }
                        />

                        <InfoField
                            label="Ciudad"
                            value={perfil?.ciudad || "-"}
                        />

                        <InfoField
                            label="País"
                            value={perfil?.pais || "-"}
                        />

                        <InfoField
                            label="Ocupación"
                            value={perfil?.ocupacion || "-"}
                        />

                        <InfoField
                            label="Rol"
                            value={rol}
                        />

                        <InfoField
                            label="Contacto de emergencia"
                            value={
                                <div>
                                    <p>
                                        {perfil?.contactoEmergenciaNombre || "-"}
                                    </p>

                                    {perfil?.contactoEmergenciaTelefono && (
                                        <p className="text-sm text-muted-foreground">
                                            {perfil.contactoEmergenciaTelefono}
                                        </p>
                                    )}
                                </div>
                            }
                        />
                    </InfoSection>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <InfoSection
                        title="Información adicional"
                        subtitle="Información técnica y de registro del usuario"
                        withDivider={false}
                    >
                        <InfoField
                            label="ID de usuario"
                            value={usuario.id}
                            valueClassName="mt-1 break-all font-mono text-sm text-neutral-900 dark:text-neutral-200"
                        />

                        <InfoField
                            label="Fecha de creación"
                            value={
                                usuario.createdAt
                                    ? new Date(
                                        usuario.createdAt,
                                    ).toLocaleDateString()
                                    : "-"
                            }
                        />

                        <InfoField
                            label="Última actualización"
                            value={
                                usuario.updatedAt
                                    ? new Date(
                                        usuario.updatedAt,
                                    ).toLocaleDateString()
                                    : "-"
                            }
                        />
                    </InfoSection>
                </CardContent>
            </Card>

            <Dialog
                open={openEdit}
                onOpenChange={setOpenEdit}
            >
                <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            Editar usuario
                        </DialogTitle>
                    </DialogHeader>

                    <FormUsuario
                        mode="edit"
                        initialData={usuario}
                        onSuccess={() => {
                            setOpenEdit(false);
                        }}
                    />
                </DialogContent>
            </Dialog>

            <Dialog
                open={openPassword}
                onOpenChange={(value) => {
                    if (!value) {
                        cerrarPassword();
                        return;
                    }

                    setOpenPassword(true);
                }}
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <KeyRound className="size-6" />
                        </div>

                        <DialogTitle>
                            Restablecer contraseña
                        </DialogTitle>

                        <DialogDescription>
                            Genera una nueva contraseña temporal para este usuario.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="rounded-xl border bg-muted/20 p-4">
                            <p className="text-xs text-muted-foreground">
                                Usuario
                            </p>

                            <p className="font-medium">
                                {nombreCompleto || usuario.username}
                            </p>

                            <p className="mt-3 text-xs text-muted-foreground">
                                Correo
                            </p>

                            <p className="text-sm">
                                {usuario.correo}
                            </p>
                        </div>

                        {!passwordTemporal ? (
                            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                                <p className="text-sm leading-6">
                                    Al continuar se reemplazará la contraseña
                                    actual por una nueva contraseña temporal.
                                    Compártela con el usuario para que pueda
                                    iniciar sesión y posteriormente cambiarla
                                    desde su perfil.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <p className="text-sm font-medium">
                                    Nueva contraseña temporal
                                </p>

                                <div className="flex items-center gap-2 rounded-xl border bg-muted/20 p-2">
                                    <code className="min-w-0 flex-1 break-all px-2 text-base font-semibold">
                                        {passwordTemporal}
                                    </code>

                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="outline"
                                        onClick={copiarPassword}
                                    >
                                        {copiado ? (
                                            <Check className="size-4" />
                                        ) : (
                                            <Copy className="size-4" />
                                        )}
                                    </Button>
                                </div>

                                <p className="text-xs leading-5 text-muted-foreground">
                                    Guarda o copia esta contraseña ahora. Al
                                    cerrar esta ventana no podrá recuperarse.
                                </p>
                            </div>
                        )}
                    </div>

                    <DialogFooter className="gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={resetPassword.isPending}
                            onClick={cerrarPassword}
                        >
                            {passwordTemporal
                                ? "Cerrar"
                                : "Cancelar"}
                        </Button>

                        {!passwordTemporal && (
                            <Button
                                type="button"
                                disabled={resetPassword.isPending}
                                onClick={restablecerPassword}
                            >
                                {resetPassword.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 size-4 animate-spin" />
                                        Generando...
                                    </>
                                ) : (
                                    <>
                                        <KeyRound className="mr-2 size-4" />
                                        Generar contraseña
                                    </>
                                )}
                            </Button>
                        )}

                        {passwordTemporal && (
                            <Button
                                type="button"
                                onClick={copiarPassword}
                            >
                                {copiado ? (
                                    <>
                                        <Check className="mr-2 size-4" />
                                        Copiada
                                    </>
                                ) : (
                                    <>
                                        <Copy className="mr-2 size-4" />
                                        Copiar contraseña
                                    </>
                                )}
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}