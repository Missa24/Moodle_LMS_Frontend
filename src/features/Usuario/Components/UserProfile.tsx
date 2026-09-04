import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Camera, UserRound } from "lucide-react";

import type { MiPerfilType } from "../Schema/UsuarioSchema";
import { InfoField } from "@/components/common/info/InfoField";
import { InfoSection } from "@/components/common/info/InfoSection";

interface UserProfileProps {
    usuario: MiPerfilType;
    onChangePhoto: () => void;
}

export default function UserProfile({
    usuario,
    onChangePhoto,
}: UserProfileProps) {
    const perfil = usuario.perfil;
    const rol = usuario.roles?.[0]?.rol;

    const nombreCompleto = [
        perfil?.nombre,
        perfil?.apellidoPaterno,
        perfil?.apellidoMaterno,
    ]
        .filter(Boolean)
        .join(" ");

    const iniciales = [
        perfil?.nombre?.charAt(0),
        perfil?.apellidoPaterno?.charAt(0),
    ]
        .filter(Boolean)
        .join("")
        .toUpperCase();

    const fechaNacimiento = perfil?.fechaNacimiento
        ? new Date(perfil.fechaNacimiento).toLocaleDateString("es-BO")
        : "No especificado";

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="relative h-24 w-24 shrink-0">
                    <div className="h-24 w-24 overflow-hidden rounded-full bg-primary">
                        {perfil?.fotografiaRuta ? (
                            <img
                                src={perfil.fotografiaRuta}
                                alt={nombreCompleto || usuario.username}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-primary-foreground">
                                {iniciales || (
                                    <UserRound className="h-10 w-10" />
                                )}
                            </div>
                        )}
                    </div>

                    <Button
                        type="button"
                        size="icon"
                        variant="secondary"
                        className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full shadow"
                        onClick={onChangePhoto}
                    >
                        <Camera className="h-4 w-4" />
                    </Button>
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            {nombreCompleto || usuario.username}
                        </h1>

                        {rol && (
                            <Badge variant="secondary">
                                {rol.nombre}
                            </Badge>
                        )}
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                        @{usuario.username}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {usuario.correo}
                    </p>
                </div>

                <Badge
                    variant={
                        usuario.estado === "activo"
                            ? "default"
                            : "secondary"
                    }
                    className="self-start"
                >
                    {usuario.estado}
                </Badge>
            </div>

            <Separator />

            <InfoSection
                title="Información personal"
                subtitle="Datos personales de tu perfil."
            >
                <InfoField
                    label="Nombre"
                    value={perfil?.nombre || "No especificado"}
                />

                <InfoField
                    label="Apellido paterno"
                    value={perfil?.apellidoPaterno || "No especificado"}
                />

                <InfoField
                    label="Apellido materno"
                    value={perfil?.apellidoMaterno || "No especificado"}
                />

                <InfoField
                    label="Fecha de nacimiento"
                    value={fechaNacimiento}
                />

                <InfoField
                    label="Género"
                    value={perfil?.genero || "No especificado"}
                />

                <InfoField
                    label="Tipo de documento"
                    value={
                        perfil?.tipoDocumentoIdentidad ||
                        "No especificado"
                    }
                />

                <InfoField
                    label="Número de documento"
                    value={
                        perfil?.numeroDocumento ||
                        "No especificado"
                    }
                />

                <InfoField
                    label="Teléfono"
                    value={perfil?.telefono || "No especificado"}
                />
            </InfoSection>

            <InfoSection
                title="Ubicación y ocupación"
                subtitle="Información sobre tu ubicación y actividad actual."
            >
                <InfoField
                    label="Ciudad"
                    value={perfil?.ciudad || "No especificado"}
                />

                <InfoField
                    label="País"
                    value={perfil?.pais || "No especificado"}
                />

                <InfoField
                    label="Ocupación"
                    value={perfil?.ocupacion || "No especificado"}
                />
            </InfoSection>

            <InfoSection
                title="Contacto"
                subtitle="Información utilizada para comunicarse contigo."
            >
                <InfoField
                    label="Correo electrónico"
                    value={usuario.correo}
                />

                <InfoField
                    label="Teléfono"
                    value={perfil?.telefono || "No especificado"}
                />
            </InfoSection>

            <InfoSection
                title="Contacto de emergencia"
                subtitle="Persona a contactar en caso de emergencia."
                withDivider={false}
            >
                <InfoField
                    label="Nombre"
                    value={
                        perfil?.contactoEmergenciaNombre ||
                        "No especificado"
                    }
                />

                <InfoField
                    label="Teléfono"
                    value={
                        perfil?.contactoEmergenciaTelefono ||
                        "No especificado"
                    }
                />
            </InfoSection>
        </div>
    );
}