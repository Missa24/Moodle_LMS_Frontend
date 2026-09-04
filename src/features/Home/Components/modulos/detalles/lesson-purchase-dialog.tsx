import {
    LockKeyhole,
    LogIn,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

type LessonPurchaseDialogProps = {
    open: boolean;

    onOpenChange: (
        open: boolean
    ) => void;

    leccionNombre:
    | string
    | null;

    moduloNombre: string;

    onBuy: () => void;
};

export const LessonPurchaseDialog = ({
    open,
    onOpenChange,
    leccionNombre,
    moduloNombre,
    onBuy,
}: LessonPurchaseDialogProps) => {
    return (
        <Dialog
            open={open}
            onOpenChange={
                onOpenChange
            }
        >
            <DialogContent className="rounded-3xl sm:max-w-md">
                <DialogHeader>
                    <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <LockKeyhole className="size-5" />
                    </div>

                    <DialogTitle className="text-2xl leading-[1.1] tracking-[-0.035em]">
                        Accede al módulo
                        completo
                    </DialogTitle>

                    <DialogDescription className="leading-[1.6]">
                        Este contenido
                        forma parte de{" "}
                        <span className="font-medium text-foreground">
                            {
                                moduloNombre
                            }
                        </span>
                        .
                    </DialogDescription>
                </DialogHeader>

                {leccionNombre && (
                    <div className="rounded-xl border border-border bg-muted/40 p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                            Lección
                            seleccionada
                        </p>

                        <p className="mt-1.5 text-sm font-semibold text-foreground">
                            {
                                leccionNombre
                            }
                        </p>
                    </div>
                )}

                <p className="text-sm leading-[1.65] text-muted-foreground">
                    Para continuar,
                    inicia sesión o crea
                    una cuenta en Élite
                    Academy. Después
                    podrás continuar con
                    el acceso a este
                    módulo.
                </p>

                <Button
                    type="button"
                    size="lg"
                    onClick={onBuy}
                    className="w-full rounded-xl"
                >
                    <LogIn className="mr-2 size-4" />

                    Continuar
                </Button>
            </DialogContent>
        </Dialog>
    );
}; 