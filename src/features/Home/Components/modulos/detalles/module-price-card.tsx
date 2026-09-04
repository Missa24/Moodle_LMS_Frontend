import {
    Check,
    ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type ModulePriceCardProps = {
    precio: number;
    cantidadLecciones: number;
    onBuy: () => void;
};

export const ModulePriceCard = ({
    precio,
    cantidadLecciones,
    onBuy,
}: ModulePriceCardProps) => {
    return (
        <Card className="rounded-2xl border-primary/30 sm:rounded-3xl">
            <CardHeader className="pb-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs">
                    Acceso al módulo
                </p>

                <div className="mt-2 flex items-end gap-2">
                    <span className="text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl">
                        Bs {precio}
                    </span>
                </div>

                <p className="mt-2 text-xs leading-[1.6] text-muted-foreground sm:text-sm">
                    Accede al contenido completo de este módulo desde nuestra
                    plataforma educativa.
                </p>
            </CardHeader>

            <CardContent>
                <Separator />

                <div className="mt-5 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-foreground">
                        <Check className="size-4 shrink-0 text-primary" />

                        <span>
                            {cantidadLecciones}{" "}
                            {cantidadLecciones === 1
                                ? "lección incluida"
                                : "lecciones incluidas"}
                        </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-foreground">
                        <Check className="size-4 shrink-0 text-primary" />

                        <span>
                            Acceso desde nuestra plataforma
                        </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-foreground">
                        <Check className="size-4 shrink-0 text-primary" />

                        <span>
                            Recursos disponibles en las lecciones
                        </span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex-col">
                <Button
                    type="button"
                    size="lg"
                    onClick={onBuy}
                    className="w-full rounded-xl"
                >
                    Comprar módulo

                    <ChevronRight className="ml-1 size-4" />
                </Button>

                <p className="mt-3 text-center text-[10px] leading-relaxed text-muted-foreground sm:text-xs">
                    Nuestro equipo te brindará información para completar tu
                    inscripción.
                </p>
            </CardFooter>
        </Card>
    );
};