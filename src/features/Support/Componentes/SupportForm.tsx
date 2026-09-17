import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    AlertCircle,
    Mail,
    Paperclip,
} from "lucide-react";

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { FormField } from "@/components/common/form/FormField";

import {
    SupportSchema,
    SupportFormValues,
} from "../Schema/SupportSchema";
import { SupportFileUpload } from "./SupportFileUpload";

interface SupportFormProps {
    nombre: string;
    correo: string;
}

const CORREO_SOPORTE =
    "soporte@eliteacademy.com";

export function SupportForm({
    nombre,
    correo,
}: SupportFormProps) {
    const [archivos, setArchivos] =
        useState<File[]>([]);

    const [error, setError] =
        useState<string | null>(null);

    const {
        control,
        handleSubmit,
    } = useForm<SupportFormValues>({
        resolver: zodResolver(
            SupportSchema,
        ),
        defaultValues: {
            asunto: "",
            mensaje: "",
        },
    });

    const onSubmit = (
        data: SupportFormValues,
    ) => {
        setError(null);

        try {
            const asunto =
                encodeURIComponent(
                    data.asunto ||
                    "Solicitud de soporte",
                );

            const detalleAdjuntos =
                archivos.length > 0
                    ? `

--------------------------------

ARCHIVOS ADJUNTOS

Tengo ${archivos.length} archivo(s) o captura(s) como evidencia.

IMPORTANTE:
Los archivos deben adjuntarse manualmente antes de enviar este correo.`
                    : "";

            const cuerpo =
                encodeURIComponent(
                    `Hola equipo de soporte,

Mi nombre es: ${nombre || "No disponible"}
Mi correo es: ${correo || "No disponible"}

ASUNTO
${data.asunto}

DESCRIPCIÓN DEL PROBLEMA
${data.mensaje}${detalleAdjuntos}

Saludos.`,
                );

            const mailto =
                `mailto:${CORREO_SOPORTE}?subject=${asunto}&body=${cuerpo}`;

            window.location.assign(
                mailto,
            );
        } catch {
            setError(
                "No se pudo abrir tu aplicación de correo. Verifica que tengas una aplicación de correo configurada en tu dispositivo.",
            );
        }
    };

    return (
        <Card className="w-full overflow-hidden border-border/60 shadow-sm">
            <CardContent className="p-4 sm:p-5 md:p-7">
                <form
                    onSubmit={handleSubmit(
                        onSubmit,
                    )}
                    className="space-y-6"
                >
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="size-4" />

                            <AlertTitle>
                                No se pudo abrir el correo
                            </AlertTitle>

                            <AlertDescription>
                                {error}
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="rounded-xl border bg-muted/30 p-4">
                        <div className="flex min-w-0 gap-3">
                            <Mail className="mt-0.5 size-4 shrink-0 text-primary" />

                            <div className="min-w-0 flex-1 space-y-1">
                                <p className="text-sm font-medium">
                                    Datos de contacto
                                </p>

                                <p className="text-xs leading-relaxed text-muted-foreground">
                                    Estos datos se
                                    incluirán
                                    automáticamente en
                                    el correo de soporte.
                                </p>

                                <div className="space-y-1 pt-2 text-sm">
                                    <p className="break-words">
                                        <span className="text-muted-foreground">
                                            Nombre:
                                        </span>{" "}
                                        {nombre ||
                                            "No disponible"}
                                    </p>

                                    <p className="break-all">
                                        <span className="text-muted-foreground">
                                            Correo:
                                        </span>{" "}
                                        {correo ||
                                            "No disponible"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <FormField
                        control={control}
                        name="asunto"
                        label="Asunto"
                        type="text"
                        placeholder="Ej. No puedo acceder a un curso"
                    />

                    <FormField
                        control={control}
                        name="mensaje"
                        label="Describe el problema"
                        type="textarea"
                        rows={7}
                        placeholder="Cuéntanos qué ocurrió, qué estabas intentando hacer y cualquier detalle que pueda ayudarnos..."
                        hint="Mientras más detalles proporciones, más fácil será ayudarte."
                    />

                    <SupportFileUpload
                        value={archivos}
                        onChange={setArchivos}
                    />

                    <div className="flex gap-3 rounded-xl border bg-muted/30 p-4">
                        <Paperclip className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                        <div className="min-w-0 space-y-1 text-xs leading-relaxed text-muted-foreground">
                            <p className="font-medium text-foreground">
                                Adjuntos opcionales
                            </p>

                            <p>
                                Puedes seleccionar
                                capturas como
                                referencia. Por
                                seguridad del navegador,
                                tendrás que adjuntarlas
                                manualmente en tu correo
                                antes de enviarlo.
                            </p>

                            {archivos.length > 0 && (
                                <p className="pt-1 font-medium text-foreground">
                                    {archivos.length}{" "}
                                    {archivos.length ===
                                        1
                                        ? "archivo seleccionado"
                                        : "archivos seleccionados"}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="border-t pt-5">
                        <Button
                            type="submit"
                            className="w-full sm:w-auto"
                        >
                            <Mail className="size-4" />

                            Enviar correo
                        </Button>

                        <p className="mt-3 max-w-xl text-xs leading-relaxed text-muted-foreground">
                            Al continuar se abrirá
                            la aplicación de correo
                            configurada en tu
                            dispositivo. Revisa el
                            mensaje, adjunta las
                            capturas si corresponde
                            y pulsa Enviar desde tu
                            correo.
                        </p>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}