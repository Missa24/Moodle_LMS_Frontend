import { useMeProfile } from "../Hook/AuthHook";
import { AppTitle } from "@/components/common/Apptittle";
import { QueryState } from "@/components/common/QueryState";
import { InfoSection } from "@/components/common/info/InfoSection";
import { InfoField } from "@/components/common/info/InfoField";

export function ProfileView() {
    const { data: usuario, isLoading, isError, error } = useMeProfile();

    return (
        <QueryState
            isLoading={isLoading}
            isError={isError}
            error={error}
            fallbackMessage="No se pudieron cargar los datos de tu cuenta."
        >
            {usuario && (
                <div className="w-full space-y-8 dark:bg-black">
                    <div className="border-b border-neutral-200 pb-4 dark:border-neutral-800">
                        <AppTitle
                            title="Configuración de Cuenta"
                            subtitle="Administra tu información personal y preferencias en Elaces"
                        />
                    </div>

                    <InfoSection title="Fotografía de Perfil" subtitle="Imagen de identificación institucional.">
                        <div className="flex items-center gap-4 sm:col-span-2">
                            {usuario.fotografia_ruta ? (
                                <img
                                    src={usuario.fotografia_ruta}
                                    alt={usuario.nombre}
                                    className="h-16 w-16 rounded-full border border-neutral-200 object-cover dark:border-neutral-800"
                                />
                            ) : (
                                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-xl font-bold uppercase text-primary">
                                    {usuario.nombre.charAt(0)}
                                    {usuario.apellido_paterno.charAt(0)}
                                </div>
                            )}
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-neutral-900 dark:text-neutral-200">
                                    Estado de Cuenta
                                </p>
                                <p className="mt-0.5 text-sm font-semibold uppercase text-emerald-600 dark:text-emerald-500">
                                    {usuario.estado}
                                </p>
                            </div>
                        </div>
                    </InfoSection>

                    <InfoSection title="Datos Personales" subtitle="Tu nombre legal y validación de identidad.">
                        <InfoField
                            label="Nombre Completo"
                            value={`${usuario.nombre} ${usuario.apellido_paterno} ${usuario.apellido_materno || ""}`}
                        />

                        <InfoField
                            label="Documento de Identidad"
                            value={
                                <>
                                    <span className="mr-1.5 font-bold text-primary">
                                        {usuario.tipo_documento_identidad || "CI"}
                                    </span>
                                    {usuario.numero_documento || "No registrado"}
                                </>
                            }
                        />

                        <InfoField label="Fecha de Nacimiento" value={usuario.fecha_nacimiento || "No registrada"} />

                        <InfoField
                            label="Género"
                            value={usuario.genero === "M" ? "Masculino" : usuario.genero === "F" ? "Femenino" : "No especificado"}
                        />

                        <InfoField
                            label="Rol de Acceso"
                            value={usuario.ocupacion || "Usuario"}
                            valueClassName="mt-1 text-sm font-semibold uppercase tracking-wide text-primary"
                        />
                    </InfoSection>

                    <InfoSection title="Contacto y Ubicación" subtitle="Canales de comunicación y residencia actual.">
                        <InfoField
                            label="Correo Electrónico"
                            value={usuario.correo}
                            className="sm:col-span-2"
                            valueClassName="mt-1 break-all text-sm font-medium text-neutral-900 dark:text-neutral-200"
                        />

                        <InfoField label="Teléfono / Celular" value={usuario.telefono || "No registrado"} />

                        <InfoField
                            label="Ubicación"
                            value={usuario.ciudad && usuario.pais ? `${usuario.ciudad}, ${usuario.pais}` : "No registrada"}
                        />
                    </InfoSection>

                    <InfoSection title="Contacto de Emergencia" subtitle="Persona de respaldo ante eventualidades.">
                        <InfoField label="Nombre de Contacto" value={usuario.contacto_emergencia_nombre || "No registrado"} />
                        <InfoField label="Teléfono de Contacto" value={usuario.contacto_emergencia_telefono || "No registrado"} />
                    </InfoSection>

                    <InfoSection title="Seguridad del Sistema" subtitle="Fechas de registro y accesos a la cuenta." withDivider={false}>
                        <InfoField
                            label="Miembro desde"
                            value={new Date(usuario.created_at).toLocaleDateString()}
                            valueClassName="mt-1 text-sm font-medium text-neutral-600 dark:text-neutral-400"
                        />

                        <InfoField
                            label="Último Acceso Detectado"
                            value={usuario.ultimo_acceso_en ? new Date(usuario.ultimo_acceso_en).toLocaleString() : "Sesión actual"}
                            valueClassName="mt-1 text-sm font-medium text-neutral-600 dark:text-neutral-400"
                        />
                    </InfoSection>
                </div>
            )}
        </QueryState>
    );
}