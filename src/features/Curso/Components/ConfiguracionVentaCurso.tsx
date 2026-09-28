"use client";

import { useState } from "react";
import { Loader2, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    useConfiguracionVentaCurso,
    useCursoPrecio,
} from "../Hook/CursoHook";

import { FormConfiguracionVentaCurso } from "./FormConfiguracionVentaCurso";

interface Props {
    cursoId: string;
}

export function ConfiguracionVentaCurso({ cursoId }: Props) {
    const [open, setOpen] = useState(false);

    const {
        data: configuracion,
        isLoading: cargandoConfiguracion,
    } = useConfiguracionVentaCurso(cursoId, open);

    const {
        data: precio,
        isLoading: cargandoPrecio,
    } = useCursoPrecio(cursoId, open);

    const cargando =
        cargandoConfiguracion ||
        cargandoPrecio;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button type="button" variant="outline" className="gap-2">
                    <Settings2 className="size-4" />
                    Configurar venta
                </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>
                        Configuración de venta del curso
                    </DialogTitle>

                    <DialogDescription>
                        El precio base se calcula con la suma de los módulos publicados.
                    </DialogDescription>
                </DialogHeader>

                {cargando ? (
                    <div className="flex min-h-60 items-center justify-center">
                        <Loader2 className="size-6 animate-spin" />
                    </div>
                ) : (
                    <FormConfiguracionVentaCurso
                        key={configuracion?.actualizadoEn ?? "nueva"}
                        cursoId={cursoId}
                        configuracion={configuracion ?? null}
                        precio={precio}
                        onSuccess={() => setOpen(false)}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}