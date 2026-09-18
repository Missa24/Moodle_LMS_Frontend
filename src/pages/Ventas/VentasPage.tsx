import { useMemo, useState } from "react";
import {
    CircleDollarSign,
    FileDown,
    ReceiptText,
    WalletCards,
} from "lucide-react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { PageHeader } from "@/components/common/PageHeader";
import { QueryState } from "@/components/common/QueryState";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";

import { useGetVentas } from "@/features/Ventas/Hook/VentaHook";
import { VentaColumns } from "@/features/Ventas/Components/VentaColumns";

import { useModulePermissions } from "@/hooks/useModulePermissions";
import { PERMISSIONS } from "@/utils/constants";

const dinero = (valor: number) =>
    new Intl.NumberFormat("es-BO", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(valor);

export default function VentasPage() {
    const [page] = useState(1);
    const [limit] = useState(100);

    const { puedeEditar } = useModulePermissions(PERMISSIONS.VENTAS);

    const {
        data,
        isLoading,
        isError,
        error,
    } = useGetVentas({
        page,
        limit,
    });

    const ventas = data?.data ?? [];

    const columns = useMemo(
        () =>
            VentaColumns({
                puedeEditar,
            }),
        [puedeEditar],
    );

    const resumen = useMemo(() => {
        return ventas.reduce(
            (acumulado, venta) => {
                acumulado.totalCobrado += venta.montoCobrado;
                acumulado.totalComisiones += venta.comision;
                acumulado.gananciaNeta += venta.totalRecibido;

                return acumulado;
            },
            {
                totalCobrado: 0,
                totalComisiones: 0,
                gananciaNeta: 0,
            },
        );
    }, [ventas]);

    const generarPdf = () => {
        if (ventas.length === 0) return;

        const doc = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a4",
        });

        const fechaGeneracion = new Date().toLocaleString("es-BO", {
            dateStyle: "long",
            timeStyle: "short",
        });

        doc.setFontSize(18);
        doc.text("Reporte de ventas", 14, 18);

        doc.setFontSize(10);
        doc.text(`Generado: ${fechaGeneracion}`, 14, 25);

        doc.setFontSize(11);
        doc.text(`Ventas registradas: ${ventas.length}`, 14, 35);
        doc.text(
            `Total cobrado: USD ${dinero(resumen.totalCobrado)}`,
            14,
            42,
        );
        doc.text(
            `Total comisiones: USD ${dinero(resumen.totalComisiones)}`,
            14,
            49,
        );

        doc.setFontSize(13);
        doc.text(
            `Ganancia neta: USD ${dinero(resumen.gananciaNeta)}`,
            14,
            58,
        );

        autoTable(doc, {
            startY: 68,
            head: [
                [
                    "Fecha",
                    "Estudiante",
                    "Correo",
                    "Curso",
                    "Módulo",
                    "Medio",
                    "Precio",
                    "Descuento",
                    "Cobrado",
                    "Comisión",
                    "Neto",
                ],
            ],
            body: ventas.map((venta) => {
                const nombre = [
                    venta.usuario.perfil?.nombre,
                    venta.usuario.perfil?.apellidoPaterno,
                    venta.usuario.perfil?.apellidoMaterno,
                ]
                    .filter(Boolean)
                    .join(" ");

                return [
                    new Date(venta.creadoEn).toLocaleDateString("es-BO"),
                    nombre || venta.usuario.username,
                    venta.usuario.correo,
                    venta.modulo.curso.nombre,
                    venta.modulo.nombre,
                    venta.medioPago === "PAYPAL"
                        ? "PayPal"
                        : "QR Bolivia",
                    `USD ${dinero(venta.precioBase)}`,
                    `USD ${dinero(venta.montoDescuento)}`,
                    `USD ${dinero(venta.montoCobrado)}`,
                    `USD ${dinero(venta.comision)}`,
                    `USD ${dinero(venta.totalRecibido)}`,
                ];
            }),
            styles: {
                fontSize: 7,
                cellPadding: 2,
            },
            headStyles: {
                fontSize: 7,
            },
            margin: {
                left: 10,
                right: 10,
            },
        });

        const fechaArchivo = new Date()
            .toISOString()
            .slice(0, 10);

        doc.save(`reporte-ventas-${fechaArchivo}.pdf`);
    };

    return (
        <div className="space-y-6 p-4 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <PageHeader
                    title="Ventas"
                    subtitle="Consulta los pagos registrados y concilia las comisiones de cada operación."
                />

                <Button
                    type="button"
                    variant="outline"
                    className="gap-2"
                    onClick={generarPdf}
                    disabled={ventas.length === 0}
                >
                    <FileDown className="size-4" />
                    Generar PDF
                </Button>
            </div>

            <QueryState
                isLoading={isLoading}
                isError={isError}
                error={error}
                fallbackMessage="No se pudieron cargar las ventas."
            >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-2xl border bg-background p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Ventas registradas
                            </p>

                            <ReceiptText className="size-5 text-muted-foreground" />
                        </div>

                        <p className="mt-3 text-2xl font-semibold">
                            {ventas.length}
                        </p>
                    </div>

                    <div className="rounded-2xl border bg-background p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Total cobrado
                            </p>

                            <CircleDollarSign className="size-5 text-muted-foreground" />
                        </div>

                        <p className="mt-3 text-2xl font-semibold">
                            USD {dinero(resumen.totalCobrado)}
                        </p>
                    </div>

                    <div className="rounded-2xl border bg-background p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Comisiones
                            </p>

                            <WalletCards className="size-5 text-muted-foreground" />
                        </div>

                        <p className="mt-3 text-2xl font-semibold">
                            USD {dinero(resumen.totalComisiones)}
                        </p>
                    </div>

                    <div className="rounded-2xl border bg-primary/5 p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-primary">
                                Ganancia neta
                            </p>

                            <CircleDollarSign className="size-5 text-primary" />
                        </div>

                        <p className="mt-3 text-2xl font-semibold">
                            USD {dinero(resumen.gananciaNeta)}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Cobrado menos comisiones
                        </p>
                    </div>
                </div>

                <DataTable
                    columns={columns}
                    data={ventas}
                />
            </QueryState>
        </div>
    );
}