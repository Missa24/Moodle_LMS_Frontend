import { useState } from "react";
import { CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TrendingUp } from "lucide-react";
import { useGetVentasEstadisticas } from "../Hook/VentaHook";
import type { AgrupacionVentasType } from "../Schema/VentaSchema";

interface VentasChartProps {
    desde?: string;
    hasta?: string;
}

const dinero = (valor: number) =>
    new Intl.NumberFormat("es-BO", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(valor);

const dineroCompacto = (valor: number) =>
    new Intl.NumberFormat("es-BO", {
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(valor);

const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

function formatearPeriodo(periodo: string, agrupacion: AgrupacionVentasType) {
    if (agrupacion === "ANIO") return periodo;

    const [anio, mes, dia] = periodo.split("-");

    if (agrupacion === "DIA") return `${dia}/${mes}`;

    return `${meses[Number(mes) - 1] ?? mes} ${anio.slice(-2)}`;
}

const opciones: { value: AgrupacionVentasType; label: string }[] = [
    { value: "DIA", label: "Día" },
    { value: "MES", label: "Mes" },
    { value: "ANIO", label: "Año" },
];

export function VentasChart({ desde, hasta }: VentasChartProps) {
    const [agrupacion, setAgrupacion] = useState<AgrupacionVentasType>("MES");

    const { data, isLoading, isError } = useGetVentasEstadisticas({
        desde,
        hasta,
        agrupacion,
    });

    if (isLoading) {
        return <div className="h-[430px] animate-pulse rounded-2xl border bg-muted/40" />;
    }

    if (isError || !data) {
        return (
            <div className="rounded-2xl border bg-card p-5">
                <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                        <TrendingUp className="size-5 text-muted-foreground" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground">No se pudieron cargar las estadísticas</p>
                        <p className="mt-1 text-xs text-muted-foreground">Intenta actualizar la página nuevamente.</p>
                    </div>
                </div>
            </div>
        );
    }

    const estadisticas = data.data;

    const totalVentas = estadisticas.reduce((total, item) => total + item.ventas, 0);
    const totalPaypal = estadisticas.reduce((total, item) => total + item.paypal, 0);
    const totalBolivia = estadisticas.reduce((total, item) => total + item.bolivia, 0);

    return (
        <div className="overflow-hidden rounded-2xl border bg-card">
            <div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
                <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <TrendingUp className="size-5" />
                    </div>
                    <div>
                        <h2 className="font-semibold tracking-tight text-foreground">Evolución de ingresos</h2>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                            Comportamiento de las ventas por método de pago.
                        </p>
                    </div>
                </div>

                <div className="flex w-full rounded-xl bg-muted/60 p-1 sm:w-auto">
                    {opciones.map((opcion) => (
                        <button
                            key={opcion.value}
                            type="button"
                            onClick={() => setAgrupacion(opcion.value)}
                            className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors sm:flex-none ${agrupacion === opcion.value
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {opcion.label}
                        </button>
                    ))}
                </div>
            </div>

            {estadisticas.length === 0 ? (
                <div className="flex min-h-[360px] items-center justify-center p-6">
                    <div className="text-center">
                        <TrendingUp className="mx-auto size-8 text-muted-foreground/40" />
                        <p className="mt-3 text-sm font-medium text-foreground">Aún no hay datos para mostrar</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Las estadísticas aparecerán cuando existan ventas registradas.
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 border-b sm:grid-cols-3">
                        <div className="border-r p-4 sm:p-5">
                            <p className="text-xs text-muted-foreground">PayPal</p>
                            <p className="mt-1 text-lg font-semibold tracking-tight text-foreground">
                                USD {dinero(totalPaypal)}
                            </p>
                        </div>

                        <div className="border-r p-4 sm:p-5">
                            <p className="text-xs text-muted-foreground">QR Bolivia</p>
                            <p className="mt-1 text-lg font-semibold tracking-tight text-foreground">
                                BOB {dinero(totalBolivia)}
                            </p>
                        </div>

                        <div className="col-span-2 p-4 sm:col-span-1 sm:p-5">
                            <p className="text-xs text-muted-foreground">Ventas</p>
                            <p className="mt-1 text-lg font-semibold tracking-tight text-foreground">
                                {totalVentas}
                            </p>
                        </div>
                    </div>

                    <div className="h-[360px] w-full p-3 sm:h-[420px] sm:p-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart
                                data={estadisticas}
                                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                            >
                                <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.25} />

                                <XAxis
                                    dataKey="periodo"
                                    axisLine={false}
                                    tickLine={false}
                                    minTickGap={agrupacion === "DIA" ? 15 : 30}
                                    tickFormatter={(value: string) => formatearPeriodo(value, agrupacion)}
                                    fontSize={11}
                                    tick={{ fill: "var(--muted-foreground)" }}
                                />

                                <YAxis
                                    yAxisId="usd"
                                    axisLine={false}
                                    tickLine={false}
                                    width={62}
                                    tickFormatter={(value: number) => `USD ${dineroCompacto(value)}`}
                                    fontSize={10}
                                    tick={{ fill: "var(--chart-1)" }}
                                />

                                <YAxis
                                    yAxisId="bob"
                                    orientation="right"
                                    axisLine={false}
                                    tickLine={false}
                                    width={62}
                                    tickFormatter={(value: number) => `BOB ${dineroCompacto(value)}`}
                                    fontSize={10}
                                    tick={{ fill: "var(--chart-3)" }}
                                />

                                <Tooltip
                                    labelFormatter={(label) => formatearPeriodo(String(label), agrupacion)}
                                    formatter={(value, name) => {
                                        const numero = Number(value ?? 0);

                                        return name === "PayPal"
                                            ? [`USD ${dinero(numero)}`, "PayPal"]
                                            : [`BOB ${dinero(numero)}`, "QR Bolivia"];
                                    }}
                                    contentStyle={{
                                        borderRadius: "12px",
                                        border: "1px solid var(--border)",
                                        background: "var(--background)",
                                        color: "var(--foreground)",
                                        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
                                    }}
                                    labelStyle={{
                                        color: "var(--foreground)",
                                        fontWeight: 600,
                                        marginBottom: "6px",
                                    }}
                                />

                                <Legend
                                    wrapperStyle={{
                                        fontSize: "12px",
                                        paddingTop: "16px",
                                    }}
                                />

                                <Line
                                    yAxisId="usd"
                                    type="monotone"
                                    dataKey="paypal"
                                    name="PayPal"
                                    stroke="var(--chart-1)"
                                    strokeWidth={3}
                                    dot={{ r: 3, fill: "var(--chart-1)", strokeWidth: 0 }}
                                    activeDot={{
                                        r: 5,
                                        fill: "var(--chart-1)",
                                        stroke: "var(--background)",
                                        strokeWidth: 2,
                                    }}
                                    connectNulls
                                />

                                <Line
                                    yAxisId="bob"
                                    type="monotone"
                                    dataKey="bolivia"
                                    name="QR Bolivia"
                                    stroke="var(--chart-3)"
                                    strokeWidth={3}
                                    dot={{ r: 3, fill: "var(--chart-3)", strokeWidth: 0 }}
                                    activeDot={{
                                        r: 5,
                                        fill: "var(--chart-3)",
                                        stroke: "var(--background)",
                                        strokeWidth: 2,
                                    }}
                                    connectNulls
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}
        </div>
    );
}
