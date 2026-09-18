import { Check, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type DescuentoModulo = {
    nombre: string;
    tipo: string;
    valor: number;
};

type ModulePriceCardProps = {
    cantidadLecciones: number;
    onBuy: () => void;
    costo?: number | null;
    precioFinal?: number | null;
    montoDescuento?: number | null;
    descuento?: DescuentoModulo | null;
};

const formatearCosto = (costo: number) =>
    new Intl.NumberFormat("es-BO", {
        style: "currency",
        currency: "Usd",
        minimumFractionDigits: 2,
    }).format(costo);

export const ModulePriceCard = ({
    cantidadLecciones,
    onBuy,
    costo,
    precioFinal,
    montoDescuento,
    descuento,
}: ModulePriceCardProps) => {
    const esGratis = !costo || costo <= 0;
    const tieneDescuento =
        !esGratis &&
        Boolean(descuento) &&
        precioFinal !== null &&
        precioFinal !== undefined &&
        precioFinal < costo;

    return (
        <Card className="rounded-2xl border-primary/30 sm:rounded-3xl">
            <CardHeader className="pb-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs">
                    Acceso al módulo
                </p>

                <p className="mt-2 text-xs leading-[1.6] text-muted-foreground sm:text-sm">
                    Accede al contenido completo de este módulo desde nuestra plataforma educativa.
                </p>

                {esGratis ? (
                    <p className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        Gratis
                    </p>
                ) : tieneDescuento ? (
                    <div className="mt-3">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                {descuento?.tipo === "PORCENTAJE"
                                    ? `${descuento.valor}% de descuento`
                                    : "Descuento"}
                            </span>

                            {descuento?.nombre && (
                                <span className="text-xs text-muted-foreground">
                                    {descuento.nombre}
                                </span>
                            )}
                        </div>

                        <p className="mt-3 text-sm text-muted-foreground line-through">
                            {formatearCosto(costo)}
                        </p>

                        <p className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                            {formatearCosto(precioFinal!)}
                        </p>

                        {montoDescuento !== null &&
                            montoDescuento !== undefined &&
                            montoDescuento > 0 && (
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Ahorras {formatearCosto(montoDescuento)}
                                </p>
                            )}
                    </div>
                ) : (
                    <p className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                        {formatearCosto(costo)}
                    </p>
                )}
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
                        <span>Acceso desde nuestra plataforma</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-foreground">
                        <Check className="size-4 shrink-0 text-primary" />
                        <span>Recursos disponibles en las lecciones</span>
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
                    Acceder al módulo
                    <ChevronRight className="ml-1 size-4" />
                </Button>

                <p className="mt-3 text-center text-[10px] leading-relaxed text-muted-foreground sm:text-xs">
                    Inicia sesión para continuar con el acceso al módulo.
                </p>
            </CardFooter>
        </Card>
    );
};