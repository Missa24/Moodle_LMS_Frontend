import {
    useState,
} from "react";

import {
    Bar,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import {
    TrendingUp,
} from "lucide-react";

import {
    useGetVentasEstadisticas,
} from "../Hook/VentaHook";

import type {
    AgrupacionVentasType,
} from "../Schema/VentaSchema";

interface VentasChartProps {
    desde?: string;
    hasta?: string;
}

const dinero = (
    valor: number,
) =>
    new Intl.NumberFormat(
        "es-BO",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        },
    ).format(valor);

const dineroCompacto = (
    valor: number,
) =>
    new Intl.NumberFormat(
        "es-BO",
        {
            notation:
                "compact",
            maximumFractionDigits: 1,
        },
    ).format(valor);

const meses = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
];

function formatearPeriodo(
    periodo: string,
    agrupacion: AgrupacionVentasType,
) {
    if (
        agrupacion ===
        "ANIO"
    ) {
        return periodo;
    }

    const [
        anio,
        mes,
        dia,
    ] =
        periodo.split("-");

    if (
        agrupacion ===
        "DIA"
    ) {
        return `${dia}/${mes}`;
    }

    const indiceMes =
        Number(mes) - 1;

    return `${meses[indiceMes] ?? mes} ${anio.slice(-2)}`;
}

const opciones: {
    value: AgrupacionVentasType;
    label: string;
}[] = [
        {
            value: "DIA",
            label: "Día",
        },
        {
            value: "MES",
            label: "Mes",
        },
        {
            value: "ANIO",
            label: "Año",
        },
    ];

export function VentasChart({
    desde,
    hasta,
}: VentasChartProps) {
    const [
        agrupacion,
        setAgrupacion,
    ] =
        useState<AgrupacionVentasType>(
            "MES",
        );

    const {
        data,
        isLoading,
        isError,
    } =
        useGetVentasEstadisticas({
            desde,
            hasta,
            agrupacion,
        });

    if (isLoading) {
        return (
            <div className="h-[430px] animate-pulse rounded-2xl border bg-muted/40" />
        );
    }

    if (
        isError ||
        !data
    ) {
        return (
            <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-5">
                <p className="text-sm text-destructive">
                    No se pudieron cargar las estadísticas de ventas.
                </p>
            </div>
        );
    }

    const estadisticas =
        data.data;

    const totalVentas =
        estadisticas.reduce(
            (
                total,
                item,
            ) =>
                total +
                item.ventas,
            0,
        );

    const totalNeto =
        estadisticas.reduce(
            (
                total,
                item,
            ) =>
                total +
                item.neto,
            0,
        );

    return (
        <div className="overflow-hidden rounded-2xl border bg-card">
            <div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <TrendingUp className="size-4" />
                        </div>

                        <div>
                            <h2 className="font-semibold tracking-tight text-foreground">
                                Evolución de ingresos
                            </h2>

                            <p className="mt-0.5 text-xs text-muted-foreground">
                                Comportamiento de las ventas y ganancias registradas.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex w-full rounded-xl bg-muted/60 p-1 sm:w-auto">
                    {opciones.map(
                        (
                            opcion,
                        ) => (
                            <button
                                key={
                                    opcion.value
                                }
                                type="button"
                                onClick={() =>
                                    setAgrupacion(
                                        opcion.value,
                                    )
                                }
                                className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors sm:flex-none ${agrupacion ===
                                        opcion.value
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {
                                    opcion.label
                                }
                            </button>
                        ),
                    )}
                </div>
            </div>

            {estadisticas.length ===
                0 ? (
                <div className="flex min-h-[360px] items-center justify-center p-6">
                    <div className="text-center">
                        <TrendingUp className="mx-auto size-8 text-muted-foreground/40" />

                        <p className="mt-3 text-sm font-medium">
                            Aún no hay datos para mostrar
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Las estadísticas aparecerán cuando existan ventas registradas.
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 border-b sm:flex">
                        <div className="border-r p-4 sm:min-w-[170px] sm:p-5">
                            <p className="text-xs text-muted-foreground">
                                Ganancia neta
                            </p>

                            <p className="mt-1 text-lg font-semibold tracking-tight">
                                USD{" "}
                                {dinero(
                                    totalNeto,
                                )}
                            </p>
                        </div>

                        <div className="p-4 sm:min-w-[150px] sm:border-r sm:p-5">
                            <p className="text-xs text-muted-foreground">
                                Ventas
                            </p>

                            <p className="mt-1 text-lg font-semibold tracking-tight">
                                {
                                    totalVentas
                                }
                            </p>
                        </div>
                    </div>

                    <div className="h-[360px] w-full p-3 sm:h-[420px] sm:p-6">
                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >
                            <ComposedChart
                                data={
                                    estadisticas
                                }
                                margin={{
                                    top: 10,
                                    right: 10,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid
                                    vertical={
                                        false
                                    }
                                    strokeDasharray="3 3"
                                    opacity={
                                        0.25
                                    }
                                />

                                <XAxis
                                    dataKey="periodo"
                                    axisLine={
                                        false
                                    }
                                    tickLine={
                                        false
                                    }
                                    minTickGap={
                                        20
                                    }
                                    tickFormatter={(
                                        value: string,
                                    ) =>
                                        formatearPeriodo(
                                            value,
                                            agrupacion,
                                        )
                                    }
                                    fontSize={
                                        11
                                    }
                                />

                                <YAxis
                                    axisLine={
                                        false
                                    }
                                    tickLine={
                                        false
                                    }
                                    width={
                                        55
                                    }
                                    tickFormatter={(
                                        value: number,
                                    ) =>
                                        `USD ${dineroCompacto(
                                            value,
                                        )}`
                                    }
                                    fontSize={
                                        10
                                    }
                                />

                                <Tooltip
                                    labelFormatter={(
                                        label,
                                    ) =>
                                        formatearPeriodo(
                                            String(
                                                label,
                                            ),
                                            agrupacion,
                                        )
                                    }
                                    formatter={(
                                        value,
                                    ) =>
                                        `USD ${dinero(
                                            Number(
                                                value ??
                                                0,
                                            ),
                                        )}`
                                    }
                                    contentStyle={{
                                        borderRadius:
                                            "12px",
                                        border:
                                            "1px solid var(--border)",
                                        background:
                                            "var(--background)",
                                        color:
                                            "var(--foreground)",
                                    }}
                                />

                                <Legend
                                    wrapperStyle={{
                                        fontSize:
                                            "12px",
                                        paddingTop:
                                            "12px",
                                    }}
                                />

                                <Bar
                                    dataKey="paypal"
                                    name="PayPal"
                                    stackId="ingresos"
                                    fill="var(--chart-1)"
                                    maxBarSize={
                                        45
                                    }
                                />

                                <Bar
                                    dataKey="bolivia"
                                    name="QR Bolivia"
                                    stackId="ingresos"
                                    fill="var(--chart-2)"
                                    maxBarSize={
                                        45
                                    }
                                />

                                <Line
                                    type="monotone"
                                    dataKey="neto"
                                    name="Ganancia neta"
                                    stroke="var(--primary)"
                                    strokeWidth={
                                        3
                                    }
                                    dot={
                                        false
                                    }
                                    activeDot={{
                                        r: 5,
                                    }}
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}
        </div>
    );
}