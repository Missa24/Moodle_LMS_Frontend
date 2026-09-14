"use client";

import { GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
    useGetNotificacionesPendientes,
    useMarcarComoLeida,
} from "../Hook/NotificacionHook";

export function InscripcionNotificationDialog() {
    const navigate = useNavigate();
    const { data: notificaciones = [] } =
        useGetNotificacionesPendientes();

    const marcarComoLeida = useMarcarComoLeida();

    const notificacion = notificaciones.find(
        (item) => item.tipo === "INSCRIPCION",
    );

    if (!notificacion) return null;

    const verCurso = () => {
        marcarComoLeida.mutate(notificacion.id, {
            onSuccess: () => {
                navigate(
                    notificacion.urlAccion ||
                    "/panel/mis-cursos",
                );
            },
        });
    };

    return (
        <Dialog open>
            <DialogContent
                className="w-[calc(100%-2rem)] max-w-md rounded-2xl"
                onInteractOutside={(event) =>
                    event.preventDefault()
                }
                onEscapeKeyDown={(event) =>
                    event.preventDefault()
                }
            >
                <DialogHeader>
                    <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <GraduationCap className="size-6" />
                    </div>

                    <DialogTitle>
                        {notificacion.titulo}
                    </DialogTitle>

                    <DialogDescription className="leading-6">
                        {notificacion.contenido}
                    </DialogDescription>
                </DialogHeader>

                <div className="rounded-xl bg-muted/50 p-4">
                    <p className="text-sm text-muted-foreground">
                        Tu acceso ya está habilitado. Puedes comenzar tu formación desde Mis cursos.
                    </p>
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        className="w-full sm:w-auto"
                        onClick={verCurso}
                        disabled={marcarComoLeida.isPending}
                    >
                        {marcarComoLeida.isPending
                            ? "Abriendo..."
                            : "Ver curso"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}