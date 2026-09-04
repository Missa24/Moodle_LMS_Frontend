import { LockKeyhole } from "lucide-react";

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
    onOpenChange: (open: boolean) => void;
    leccionNombre: string | null;
    moduloNombre: string;
};

export const LessonPurchaseDialog = ({
    open,
    onOpenChange,
    leccionNombre,
    moduloNombre,
}: LessonPurchaseDialogProps) => {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="rounded-3xl sm:max-w-md">
                <DialogHeader>
                    <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <LockKeyhole className="size-5" />
                    </div>

                    <DialogTitle className="text-2xl leading-[1.1] tracking-[-0.035em]">
                        Accede al módulo completo
                    </DialogTitle>

                    <DialogDescription className="leading-[1.6]">
                        Este contenido forma parte de{" "}
                        <span className="font-medium text-foreground">
                            {moduloNombre}
                        </span>
                        .
                    </DialogDescription>
                </DialogHeader>

                {leccionNombre && (
                    <div className="rounded-xl border border-border bg-muted/40 p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                            Lección seleccionada
                        </p>

                        <p className="mt-1.5 text-sm font-semibold text-foreground">
                            {leccionNombre}
                        </p>
                    </div>
                )}

                <p className="text-sm leading-[1.65] text-muted-foreground">
                    Adquiere el módulo para acceder a todas sus lecciones,
                    recursos y contenidos desde nuestra plataforma educativa.
                </p>

                <Button
                    type="button"
                    size="lg"
                    className="w-full rounded-xl"
                >
                    Comprar módulo
                </Button>
            </DialogContent>
        </Dialog>
    );
};