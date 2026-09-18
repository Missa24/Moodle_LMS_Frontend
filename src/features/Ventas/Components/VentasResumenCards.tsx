import {
    CircleDollarSign,
    CreditCard,
    QrCode,
    WalletCards,
} from "lucide-react";

import type { VentaResumenType } from "../Schema/VentaSchema";

interface VentasResumenCardsProps {
    resumen?: VentaResumenType;
    isLoading?: boolean;
    isError?: boolean;
}

const dinero = (valor: number) =>
    new Intl.NumberFormat("es-BO", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(valor);

export function VentasResumenCards({
    resumen,
    isLoading = false,
    isError = false,
}: VentasResumenCardsProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="h-[150px] animate-pulse rounded-2xl border bg-muted/40"
                    />
                ))}
            </div>
        );
    }

    if (isError || !resumen) {
        return (
            <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4">
                <p className="text-sm text-destructive">
                    No se pudo cargar el resumen financiero de las ventas.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <ResumenCard
                titulo="Ganancia neta"
                valor={`USD ${dinero(resumen.gananciaNeta)}`}
                descripcion={`${resumen.totalVentas} venta${resumen.totalVentas === 1 ? "" : "s"
                    } registrada${resumen.totalVentas === 1 ? "" : "s"}`}
                icono={<CircleDollarSign className="size-5" />}
                destacado
            />

            <ResumenCard
                titulo="PayPal"
                valor={`USD ${dinero(resumen.paypal.neto)}`}
                descripcion={`${resumen.paypal.ventas} venta${resumen.paypal.ventas === 1 ? "" : "s"
                    } · Cobrado USD ${dinero(resumen.paypal.cobrado)}`}
                icono={<CreditCard className="size-5" />}
            />

            <ResumenCard
                titulo="QR Bolivia"
                valor={`USD ${dinero(resumen.bolivia.neto)}`}
                descripcion={`${resumen.bolivia.ventas} venta${resumen.bolivia.ventas === 1 ? "" : "s"
                    } · Cobrado USD ${dinero(resumen.bolivia.cobrado)}`}
                icono={<QrCode className="size-5" />}
            />

            <ResumenCard
                titulo="Comisiones"
                valor={`USD ${dinero(resumen.totalComisiones)}`}
                descripcion={`Total cobrado USD ${dinero(
                    resumen.totalCobrado,
                )}`}
                icono={<WalletCards className="size-5" />}
            />
        </div>
    );
}

interface ResumenCardProps {
    titulo: string;
    valor: string;
    descripcion: string;
    icono: React.ReactNode;
    destacado?: boolean;
}

function ResumenCard({
    titulo,
    valor,
    descripcion,
    icono,
    destacado = false,
}: ResumenCardProps) {
    return (
        <div
            className={
                destacado
                    ? "rounded-2xl border border-primary/20 bg-primary/5 p-5"
                    : "rounded-2xl border bg-card p-5"
            }
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p
                        className={
                            destacado
                                ? "text-sm font-medium text-primary"
                                : "text-sm font-medium text-muted-foreground"
                        }
                    >
                        {titulo}
                    </p>

                    <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                        {valor}
                    </p>
                </div>

                <div
                    className={
                        destacado
                            ? "flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
                            : "flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground"
                    }
                >
                    {icono}
                </div>
            </div>

            <p className="mt-3 text-xs leading-5 text-muted-foreground">
                {descripcion}
            </p>
        </div>
    );
}