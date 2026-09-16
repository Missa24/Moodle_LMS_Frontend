import {
    Award,
    GraduationCap,
    Trophy,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface CompletionDialogProps {
    open: boolean;
    onOpenChange: (
        open: boolean,
    ) => void;
    type: "modulo" | "curso";
    onViewCertificate: () => void;
}

export function CompletionDialog({
    open,
    onOpenChange,
    type,
    onViewCertificate,
}: CompletionDialogProps) {
    const esCurso =
        type === "curso";

    return (
        <Dialog
            open={open}
            onOpenChange={
                onOpenChange
            }
        >
            <DialogContent className="bg-background text-foreground sm:max-w-md">
                <DialogHeader className="items-center text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        {esCurso ? (
                            <GraduationCap className="h-8 w-8 text-primary" />
                        ) : (
                            <Trophy className="h-8 w-8 text-primary" />
                        )}
                    </div>

                    <DialogTitle className="text-xl">
                        {esCurso
                            ? "¡Curso completado!"
                            : "¡Módulo completado!"}
                    </DialogTitle>

                    <DialogDescription>
                        {esCurso
                            ? "Has completado todas las formaciones requeridas del curso. Tu certificado ya está disponible."
                            : "Has completado todas las lecciones del módulo. Tu certificado ya está disponible."}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex-col gap-2 sm:flex-row">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                            onOpenChange(
                                false,
                            )
                        }
                    >
                        Cerrar
                    </Button>

                    <Button
                        type="button"
                        className="gap-2"
                        onClick={
                            onViewCertificate
                        }
                    >
                        <Award className="h-4 w-4" />
                        Ver certificado
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}