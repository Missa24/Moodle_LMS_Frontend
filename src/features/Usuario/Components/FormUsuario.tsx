"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/common/form/FormField";
import {
    UserCreateSchema,
    UserCreateType,
    UserUpdateSchema,
    UserUpdateType,
    UsuarioDetailType,
} from "../Schema/UsuarioSchema";
import { useCreateUser, useUpdateUser } from "../Hook/UsuarioHook";
import { useGetRoles } from "@/features/Roles/Hook/RolHook";
import { paises } from "@/utils/constants";

type FormValues = UserCreateType | UserUpdateType;

type FormUsuarioProps = {
    initialData?: UsuarioDetailType;
    mode: "create" | "edit";
    onSuccess?: () => void;
};

const OPCIONES_ESTADO = [
    { value: "activo", label: "Activo" },
    { value: "pendiente", label: "Pendiente" },
    { value: "inactivo", label: "Inactivo" },
];

const OPCIONES_DOCUMENTO = [
    { value: "CI", label: "Cédula de identidad" },
    { value: "PASAPORTE", label: "Pasaporte" },
    { value: "DNI", label: "DNI" },
    { value: "OTRO", label: "Otro" },
];

const OPCIONES_GENERO = [
    { value: "masculino", label: "Masculino" },
    { value: "femenino", label: "Femenino" },
    { value: "otro", label: "Otro" },
];

const OPCIONES_PAISES = paises.map((pais) => ({
    value: pais.codigo,
    label: pais.nombre,
}));

export function FormUsuario({
    initialData,
    mode,
    onSuccess,
}: FormUsuarioProps) {
    const { mutate: createUser, isPending: creating } = useCreateUser();
    const { mutate: updateUser, isPending: updating } = useUpdateUser();
    const { data: roles, isLoading: loadingRoles } = useGetRoles();

    const isPending = creating || updating;

    const opcionesRoles =
        roles?.map((rol) => ({
            value: rol.id,
            label: rol.nombre,
        })) ?? [];

    const form = useForm<FormValues>({
        resolver: zodResolver(
            mode === "edit" ? UserUpdateSchema : UserCreateSchema
        ),

        defaultValues:
            mode === "edit"
                ? {
                      username: initialData?.username ?? "",
                      correo: initialData?.correo ?? "",
                      estado: initialData?.estado ?? "activo",

                      nombre: initialData?.perfil?.nombre ?? "",
                      apellidoPaterno:
                          initialData?.perfil?.apellidoPaterno ?? "",
                      apellidoMaterno:
                          initialData?.perfil?.apellidoMaterno ?? "",

                      telefono: initialData?.perfil?.telefono ?? "",
                      tipoDocumentoIdentidad:
                          initialData?.perfil?.tipoDocumentoIdentidad ?? "",
                      numeroDocumento:
                          initialData?.perfil?.numeroDocumento ?? "",
                      fechaNacimiento:
                          initialData?.perfil?.fechaNacimiento ?? "",
                      genero: initialData?.perfil?.genero ?? "",
                      ciudad: initialData?.perfil?.ciudad ?? "",
                      pais: initialData?.perfil?.pais ?? "",
                      ocupacion: initialData?.perfil?.ocupacion ?? "",

                      contactoEmergenciaNombre:
                          initialData?.perfil?.contactoEmergenciaNombre ?? "",
                      contactoEmergenciaTelefono:
                          initialData?.perfil?.contactoEmergenciaTelefono ?? "",

                      fotografiaRuta:
                          initialData?.perfil?.fotografiaRuta ?? "",

                      rolId: initialData?.roles?.[0]?.rolId ?? "",
                  }
                : {
                      nombre: "",
                      apellidoPaterno: "",
                      apellidoMaterno: "",
                      correo: "",
                      numeroDocumento: "",
                      rolId: "",
                  },
    });

    const onSubmit = (values: FormValues) => {
        if (mode === "edit") {
            const data = Object.fromEntries(
                Object.entries(values).filter(
                    ([, value]) => value !== undefined && value !== ""
                )
            ) as UserUpdateType;

            updateUser(
                {
                    id: initialData!.id,
                    data,
                },
                {
                    onSuccess: () => {
                        onSuccess?.();
                    },
                }
            );

            return;
        }

        createUser(values as UserCreateType, {
            onSuccess: () => {
                form.reset();
                onSuccess?.();
            },
        });
    };

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
        >
            <FieldGroup>
                {/* Nombre y apellido paterno */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="nombre"
                        label="Nombre"
                        placeholder="Ej: Juan"
                    />

                    <FormField
                        control={form.control}
                        name="apellidoPaterno"
                        label="Apellido paterno"
                        placeholder="Ej: Pérez"
                    />
                </div>

                {/* Apellido materno y correo */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="apellidoMaterno"
                        label="Apellido materno"
                        placeholder="Ej: García"
                    />

                    <FormField
                        type="email"
                        control={form.control}
                        name="correo"
                        label="Correo"
                        placeholder="correo@ejemplo.com"
                    />
                </div>

                {/* Número de documento */}
                <FormField
                    control={form.control}
                    name="numeroDocumento"
                    label="Número de documento"
                    placeholder="Ej: 12345678"
                />

                {/* Rol */}
                <FormField
                    type="select"
                    control={form.control}
                    name="rolId"
                    label="Rol"
                    placeholder={
                        loadingRoles
                            ? "Cargando roles..."
                            : "Seleccionar rol"
                    }
                    options={opcionesRoles}
                    disabled={loadingRoles}
                />

                {mode === "edit" && (
                    <>
                        {/* Username y estado */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="username"
                                label="Username"
                                placeholder="Ej: juan.perez"
                            />

                            <FormField
                                type="select"
                                control={form.control}
                                name="estado"
                                label="Estado"
                                placeholder="Seleccionar estado"
                                options={OPCIONES_ESTADO}
                            />
                        </div>

                        {/* Tipo documento y teléfono */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <FormField
                                type="select"
                                control={form.control}
                                name="tipoDocumentoIdentidad"
                                label="Tipo de documento"
                                placeholder="Seleccionar tipo de documento"
                                options={OPCIONES_DOCUMENTO}
                            />

                            <FormField
                                control={form.control}
                                name="telefono"
                                label="Teléfono"
                                placeholder="Ej: 70000000"
                            />
                        </div>

                        {/* Ocupación y ciudad */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="ocupacion"
                                label="Ocupación"
                                placeholder="Ej: Docente"
                            />

                            <FormField
                                control={form.control}
                                name="ciudad"
                                label="Ciudad"
                                placeholder="Ej: La Paz"
                            />
                        </div>

                        {/* País y fecha de nacimiento */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <FormField
                                type="select"
                                control={form.control}
                                name="pais"
                                label="País"
                                placeholder="Seleccionar país"
                                options={OPCIONES_PAISES}
                            />

                            <FormField
                                type="date"
                                control={form.control}
                                name="fechaNacimiento"
                                label="Fecha de nacimiento"
                            />
                        </div>

                        {/* Género */}
                        <FormField
                            type="select"
                            control={form.control}
                            name="genero"
                            label="Género"
                            placeholder="Seleccionar género"
                            options={OPCIONES_GENERO}
                        />

                        {/* Contacto de emergencia */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="contactoEmergenciaNombre"
                                label="Contacto de emergencia"
                                placeholder="Nombre completo"
                            />

                            <FormField
                                control={form.control}
                                name="contactoEmergenciaTelefono"
                                label="Teléfono de emergencia"
                                placeholder="Ej: 70000000"
                            />
                        </div>
                    </>
                )}
            </FieldGroup>

            <Button
                type="submit"
                className="w-full"
                disabled={isPending}
            >
                {isPending
                    ? mode === "edit"
                        ? "Guardando..."
                        : "Creando..."
                    : mode === "edit"
                        ? "Guardar cambios"
                        : "Crear usuario"}
            </Button>
        </form>
    );
}
