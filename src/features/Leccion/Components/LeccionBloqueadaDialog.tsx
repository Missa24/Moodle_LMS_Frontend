import { useNavigate } from "react-router-dom";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import {
    MascotSinPermiso,
    MascotError,
} from "@/components/common/mascots";

import BuyModuleButton from "@/features/Lead/Components/BuyModuleButton";

interface LeccionBloqueadaDialogProps {
    open: boolean;
    motivo:
    | "no_inscrito"
    | "leccion_anterior_pendiente"
    | null;

    cursoId: string;
    moduloId: string;
    linkPago?: string | null;
}

export function LeccionBloqueadaDialog({
    open,
    motivo,
    cursoId,
    moduloId,
    linkPago,
}: LeccionBloqueadaDialogProps) {
    const navigate =
        useNavigate();

    const esNoInscrito =
        motivo ===
        "no_inscrito";

    return (
        <AlertDialog
            open={open}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="mx-auto">
                        {esNoInscrito ? (
                            <MascotSinPermiso className="h-28 w-auto" />
                        ) : (
                            <MascotError className="h-28 w-auto" />
                        )}
                    </div>

                    <AlertDialogTitle className="text-center">
                        {esNoInscrito
                            ? "Necesitas acceso a este módulo"
                            : "Todavía no puedes ver esta lección"}
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-center">
                        {esNoInscrito
                            ? "Esta lección forma parte del contenido completo del módulo. Adquiere el acceso para continuar con tu formación."
                            : "Completa la lección anterior para desbloquear esta."}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="gap-2 sm:justify-center">
                    <AlertDialogCancel
                        onClick={() =>
                            navigate(
                                `/panel/cursos/${cursoId}/modulos/${moduloId}`,
                            )
                        }
                    >
                        Volver al módulo
                    </AlertDialogCancel>

                    {esNoInscrito &&
                        linkPago && (
                            <BuyModuleButton
                                moduloId={
                                    moduloId
                                }
                                linkPago={
                                    linkPago
                                }
                            />
                        )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}