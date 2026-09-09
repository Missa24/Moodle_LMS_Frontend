import {
    useState,
} from "react";

import {
    useForm,
} from "react-hook-form";

import {
    zodResolver,
} from "@hookform/resolvers/zod";

import {
    AlertCircle,
    CheckCircle2,
    Loader2,
    Mail,
    Paperclip,
    Send,
} from "lucide-react";

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    FormField,
} from "@/components/common/form/FormField";

import {
    SupportSchema,
    SupportFormValues,
} from "../Schema/SupportSchema";

import {
    SupportFileUpload,
} from "./SupportFileUpload";

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

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [success, setSuccess] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const {
        control,
        handleSubmit,
        reset,
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
        setIsSubmitting(true);
        setSuccess(false);
        setError(null);

        try {
            const asunto =
                encodeURIComponent(
                    data.asunto ||
                    "Solicitud de soporte",
                );

            const mensajeArchivos =
                archivos.length > 0
                    ? `

------------------------------

Adjuntos:
Tengo ${archivos.length} imagen(es) como evidencia del problema.

IMPORTANTE:
Las imágenes deben adjuntarse manualmente a este correo, ya que el navegador no puede agregarlas automáticamente mediante mailto:.`
                    : "";

            const cuerpo =
                encodeURIComponent(
                    `Hola equipo de soporte,

Mi nombre es: ${nombre}
Mi correo: ${correo}

Asunto:
${data.asunto}

Descripción del problema:
${data.mensaje}${mensajeArchivos}

Saludos.`,
                );

            const mailto =
                `mailto:${CORREO_SOPORTE}?subject=${asunto}&body=${cuerpo}`;

            window.location.href =
                mailto;

            setSuccess(true);

            reset({
                asunto: "",
                mensaje: "",
            });

            setArchivos([]);
        } catch {
            setError(
                "No se pudo abrir la aplicación de correo. Intenta nuevamente.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="overflow-hidden border-border/60 shadow-sm">
            <CardHeader className="border-b bg-muted/20">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Send className="size-5 text-primary" />

                    Enviar una consulta
                </CardTitle>

                <CardDescription>
                    Completa el formulario y describe
                    detalladamente el problema.
                </CardDescription>
            </CardHeader>

            <CardContent className="p-5 sm:p-7">
                <div className="space-y-6">
                    {success && (
                        <Alert className="border-emerald-500/30 bg-emerald-500/5">
                            <CheckCircle2 className="text-emerald-600" />

                            <AlertTitle>
                                Correo preparado
                            </AlertTitle>

                            <AlertDescription>
                                Se abrió tu aplicación de
                                correo con la información de
                                soporte preparada.
                                {archivos.length > 0 && (
                                    <>
                                        {" "}
                                        Recuerda adjuntar
                                        manualmente las
                                        capturas antes de
                                        enviar el correo.
                                    </>
                                )}
                            </AlertDescription>
                        </Alert>
                    )}

                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle />

                            <AlertTitle>
                                No se pudo abrir el correo
                            </AlertTitle>

                            <AlertDescription>
                                {error}
                            </AlertDescription>
                        </Alert>
                    )}

                    <form
                        onSubmit={handleSubmit(
                            onSubmit,
                        )}
                        className="space-y-6"
                    >
                        {/* Información de contacto */}
                        <div className="rounded-xl border bg-muted/30 p-4">
                            <div className="flex gap-3">
                                <Mail className="mt-0.5 size-4 shrink-0 text-primary" />

                                <div className="min-w-0 space-y-1">
                                    <p className="text-sm font-medium">
                                        Datos de contacto
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        La consulta se enviará
                                        desde tu aplicación de
                                        correo.
                                    </p>

                                    <div className="pt-1 text-sm">
                                        <p className="truncate">
                                            <span className="text-muted-foreground">
                                                Nombre:
                                            </span>{" "}
                                            {nombre ||
                                                "No disponible"}
                                        </p>

                                        <p className="truncate">
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
                            onChange={
                                setArchivos
                            }
                        />

                        <div className="flex gap-3 rounded-xl border bg-muted/30 p-4">
                            <Paperclip className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                            <div className="space-y-1 text-xs text-muted-foreground">
                                <p className="font-medium text-foreground">
                                    Adjuntos opcionales
                                </p>

                                <p>
                                    Puedes pegar o
                                    seleccionar capturas
                                    para tenerlas como
                                    referencia. Al usar
                                    <span className="font-medium text-foreground">
                                        {" "}
                                        mailto:
                                    </span>
                                    , deberás agregarlas
                                    manualmente al correo
                                    antes de enviarlo.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end border-t pt-5">
                            <Button
                                type="submit"
                                disabled={
                                    isSubmitting
                                }
                                className="w-full sm:w-auto"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="size-4 animate-spin" />

                                        Abriendo correo...
                                    </>
                                ) : (
                                    <>
                                        <Send className="size-4" />

                                        Enviar consulta
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
}
