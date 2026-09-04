"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    UpdateMiPerfilSchema,
    UpdateMiPerfilType,
    type MiPerfilType,
} from "../Schema/UsuarioSchema";

import { useUpdateMiPerfil } from "../Hook/UsuarioHook";
import { EntityDialog } from "@/components/common/form/EntityDialog";
import { FormField } from "@/components/common/form/FormField";

import { paises } from "@/utils/constants";

interface EditProfileDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    usuario: MiPerfilType;
}

export default function EditProfileDialog({
    open,
    onOpenChange,
    usuario,
}: EditProfileDialogProps) {
    const actualizarPerfil = useUpdateMiPerfil();

    const form = useForm<UpdateMiPerfilType>({
        resolver: zodResolver(UpdateMiPerfilSchema),
        defaultValues: {
            correo: "",
            nombre: "",
            apellidoPaterno: "",
            apellidoMaterno: "",
            tipoDocumentoIdentidad: "",
            numeroDocumento: "",
            fechaNacimiento: "",
            genero: "",
            telefono: "",
            ciudad: "",
            pais: "",
            paisCodigo: "",
            ocupacion: "",
            contactoEmergenciaNombre: "",
            contactoEmergenciaTelefono: "",
        },
    });

    useEffect(() => {
        if (!usuario || !open) {
            return;
        }

        form.reset({
            correo: usuario.correo ?? "",
            nombre: usuario.perfil?.nombre ?? "",
            apellidoPaterno:
                usuario.perfil?.apellidoPaterno ?? "",
            apellidoMaterno:
                usuario.perfil?.apellidoMaterno ?? "",
            tipoDocumentoIdentidad:
                usuario.perfil?.tipoDocumentoIdentidad ?? "",
            numeroDocumento:
                usuario.perfil?.numeroDocumento ?? "",
            fechaNacimiento:
                usuario.perfil?.fechaNacimiento
                    ? usuario.perfil.fechaNacimiento.substring(
                        0,
                        10,
                    )
                    : "",
            genero:
                usuario.perfil?.genero ?? "",
            telefono:
                usuario.perfil?.telefono ?? "",
            ciudad:
                usuario.perfil?.ciudad ?? "",
            pais:
                usuario.perfil?.pais ?? "",
            paisCodigo:
                usuario.perfil?.paisCodigo ?? "",
            ocupacion:
                usuario.perfil?.ocupacion ?? "",
            contactoEmergenciaNombre:
                usuario.perfil
                    ?.contactoEmergenciaNombre ?? "",
            contactoEmergenciaTelefono:
                usuario.perfil
                    ?.contactoEmergenciaTelefono ?? "",
        });
    }, [usuario, open, form]);

    const onSubmit = (
        data: UpdateMiPerfilType,
    ) => {
        const payload = Object.fromEntries(
            Object.entries(data).filter(
                ([, value]) =>
                    value !== "",
            ),
        );

        actualizarPerfil.mutate(
            payload,
            {
                onSuccess: () => {
                    onOpenChange(false);
                },
            },
        );
    };

    const paisCodigo =
        form.watch("paisCodigo") || "";

    const handlePaisChange = (
        codigo: string,
    ) => {
        const paisSeleccionado =
            paises.find(
                (pais) =>
                    pais.codigo === codigo,
            );

        if (!paisSeleccionado) {
            return;
        }

        form.setValue(
            "paisCodigo",
            paisSeleccionado.codigo,
            {
                shouldDirty: true,
                shouldValidate: true,
            },
        );

        form.setValue(
            "pais",
            paisSeleccionado.nombre,
            {
                shouldDirty: true,
                shouldValidate: true,
            },
        );
    };

    return (
        <EntityDialog
            open={open}
            onOpenChange={onOpenChange}
            mode="edit"
            titleCreate=""
            titleEdit="Editar perfil"
            descriptionCreate=""
            descriptionEdit="Actualiza tu información personal."
            isLoading={
                actualizarPerfil.isPending
            }
            maxWidth="max-w-3xl"
        >
            <form
                onSubmit={form.handleSubmit(
                    onSubmit,
                )}
                className="space-y-6"
            >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="nombre"
                        label="Nombre"
                    />

                    <FormField
                        control={form.control}
                        name="apellidoPaterno"
                        label="Apellido paterno"
                    />

                    <FormField
                        control={form.control}
                        name="apellidoMaterno"
                        label="Apellido materno"
                    />

                    <FormField
                        control={form.control}
                        name="correo"
                        label="Correo electrónico"
                        type="email"
                    />

                    <FormField
                        control={form.control}
                        name="telefono"
                        label="Teléfono"
                    />

                    <FormField
                        control={form.control}
                        name="fechaNacimiento"
                        label="Fecha de nacimiento"
                        type="date"
                    />

                    <FormField
                        control={form.control}
                        name="tipoDocumentoIdentidad"
                        label="Tipo de documento"
                    />

                    <FormField
                        control={form.control}
                        name="numeroDocumento"
                        label="Número de documento"
                    />

                    <FormField
                        control={form.control}
                        name="genero"
                        label="Género"
                    />

                    <FormField
                        control={form.control}
                        name="ciudad"
                        label="Ciudad"
                    />

                    <div className="space-y-2">
                        <Label>
                            País
                        </Label>

                        <Select
                            value={
                                paisCodigo
                            }
                            onValueChange={
                                handlePaisChange
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecciona tu país" />
                            </SelectTrigger>

                            <SelectContent>
                                {paises.map(
                                    (pais) => (
                                        <SelectItem
                                            key={
                                                pais.codigo
                                            }
                                            value={
                                                pais.codigo
                                            }
                                        >
                                            {
                                                pais.nombre
                                            }
                                        </SelectItem>
                                    ),
                                )}
                            </SelectContent>
                        </Select>

                        {form.formState
                            .errors
                            .paisCodigo
                            ?.message && (
                                <p className="text-sm text-destructive">
                                    {
                                        form
                                            .formState
                                            .errors
                                            .paisCodigo
                                            .message
                                    }
                                </p>
                            )}
                    </div>

                    <FormField
                        control={form.control}
                        name="ocupacion"
                        label="Ocupación"
                    />

                    <FormField
                        control={form.control}
                        name="contactoEmergenciaNombre"
                        label="Nombre de contacto de emergencia"
                    />

                    <FormField
                        control={form.control}
                        name="contactoEmergenciaTelefono"
                        label="Teléfono de contacto de emergencia"
                    />
                </div>

                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                            onOpenChange(
                                false,
                            )
                        }
                        disabled={
                            actualizarPerfil.isPending
                        }
                    >
                        Cancelar
                    </Button>

                    <Button
                        type="submit"
                        disabled={
                            actualizarPerfil.isPending
                        }
                    >
                        {actualizarPerfil.isPending
                            ? "Guardando..."
                            : "Guardar cambios"}
                    </Button>
                </div>
            </form>
        </EntityDialog>
    );
}