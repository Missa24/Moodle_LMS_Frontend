"use client";

import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    AlertCircle,
    CheckCircle2,
    Clock3,
    CreditCard,
    ExternalLink,
    Loader2,
    MailCheck,
    QrCode,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { useAuthStore } from "@/store/authStore";
import {
    useCreateLead,
    useEstadoCompraCurso,
} from "../Hook/LeadHook";

interface BuyCourseButtonProps {
    cursoId: string;
    linkPago?: string | null;
    qrPagoBolivia?: string | null;
    precio?: number | null;
    currency?: string;
}

type PaymentStep = "confirm" | "qr" | "paypal";

export default function BuyCourseButton({
    cursoId,
    linkPago,
    qrPagoBolivia,
    precio,
    currency = "USD",
}: BuyCourseButtonProps) {
    const crearLead = useCreateLead();

    const {
        data: estadoCompra,
        isLoading: cargandoEstadoCompra,
    } = useEstadoCompraCurso(cursoId, !!cursoId);

    const usuario = useAuthStore((state) => state.usuario);

    const [open, setOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [step, setStep] = useState<PaymentStep>("confirm");
    const [canVerify, setCanVerify] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);

    const verifyTimerRef = useRef<number | null>(null);

    const paisCodigo = usuario?.paisCodigo ?? null;
    const requiereCompletarPerfil =
        usuario?.requiereCompletarPerfil ?? false;

    const esBolivia = paisCodigo === "BO";
    const metodoDisponible = esBolivia
        ? Boolean(qrPagoBolivia)
        : Boolean(linkPago);

    const perfilIncompleto = requiereCompletarPerfil || !paisCodigo;
    const compraDeshabilitada =
        perfilIncompleto || !metodoDisponible;

    const precioFormateado =
        precio !== null && precio !== undefined
            ? `${currency} ${precio.toFixed(2)}`
            : "Precio no disponible";

    const clearVerificationTimer = () => {
        if (verifyTimerRef.current === null) return;

        window.clearTimeout(verifyTimerRef.current);
        verifyTimerRef.current = null;
    };

    const startVerificationTimer = () => {
        clearVerificationTimer();
        setCanVerify(false);

        verifyTimerRef.current = window.setTimeout(() => {
            setCanVerify(true);
            verifyTimerRef.current = null;
        }, 5000);
    };

    const resetPaymentDialog = () => {
        clearVerificationTimer();
        setStep("confirm");
        setCanVerify(false);
        setPaymentError(null);
    };

    const handleOpenChange = (value: boolean) => {
        setOpen(value);

        if (!value) resetPaymentDialog();
    };

    const handleStartPayment = () => {
        setPaymentError(null);

        if (perfilIncompleto) {
            setPaymentError(
                "Debes completar la información de tu perfil antes de realizar una compra.",
            );
            return;
        }

        if (esBolivia) {
            if (!qrPagoBolivia) {
                setPaymentError(
                    "El pago mediante QR no está disponible en este momento.",
                );
                return;
            }

            setStep("qr");
            startVerificationTimer();
            return;
        }

        if (!linkPago) {
            setPaymentError(
                "El pago mediante PayPal no está disponible en este momento.",
            );
            return;
        }

        const paymentWindow = window.open(linkPago, "_blank");

        if (!paymentWindow) {
            setPaymentError(
                "El navegador bloqueó la ventana de PayPal. Habilita las ventanas emergentes e inténtalo nuevamente.",
            );
            return;
        }

        paymentWindow.opener = null;
        setStep("paypal");
        startVerificationTimer();
    };

    const handleVerifyPayment = () => {
        if (!canVerify || crearLead.isPending) return;

        setPaymentError(null);

        crearLead.mutate(
            {
                tipoCompra: "CURSO",
                cursoId,
            },
            {
                onSuccess: () => {
                    clearVerificationTimer();
                    setOpen(false);
                    setStep("confirm");
                    setCanVerify(false);
                    setPaymentError(null);

                    window.setTimeout(() => {
                        setSuccessOpen(true);
                    }, 150);
                },
                onError: () => {
                    setPaymentError(
                        "No se pudo registrar la solicitud. Verifica si ya tienes acceso a este curso.",
                    );
                },
            },
        );
    };

    if (cargandoEstadoCompra) return null;

    if (estadoCompra && !estadoCompra.puedeComprarCurso) {
        return null;
    }

    return (
        <>
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <div className="space-y-3">
                    <DialogTrigger asChild>
                        <Button
                            type="button"
                            disabled={compraDeshabilitada}
                            className="w-full gap-2"
                        >
                            <CreditCard className="size-4" />
                            Comprar curso completo
                        </Button>
                    </DialogTrigger>

                    {perfilIncompleto && (
                        <div className="flex items-start gap-2 rounded-xl border border-destructive/20 bg-destructive/5 p-3">
                            <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />

                            <p className="text-xs leading-5 text-destructive">
                                La compra del curso estará disponible cuando
                                completes la información de tu{" "}
                                <Link
                                    to="/panel/perfil"
                                    className="font-semibold underline underline-offset-2"
                                >
                                    perfil
                                </Link>
                                .
                            </p>
                        </div>
                    )}

                    {!perfilIncompleto && !metodoDisponible && (
                        <div className="flex items-start gap-2 rounded-xl border border-destructive/20 bg-destructive/5 p-3">
                            <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />

                            <p className="text-xs leading-5 text-destructive">
                                El método de pago para este curso todavía no
                                está disponible.
                            </p>
                        </div>
                    )}
                </div>

                <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl pr-3">
                    {step === "confirm" && (
                        <>
                            <DialogHeader>
                                <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    {esBolivia ? (
                                        <QrCode className="size-5" />
                                    ) : (
                                        <CreditCard className="size-5" />
                                    )}
                                </div>

                                <DialogTitle className="text-xl">
                                    {esBolivia
                                        ? "Pago mediante QR"
                                        : "Pago mediante PayPal"}
                                </DialogTitle>

                                <DialogDescription className="pt-1 leading-6">
                                    {esBolivia
                                        ? "Realiza el pago correspondiente al acceso completo del curso."
                                        : "Serás dirigido a PayPal para completar el pago de todo el curso."}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="my-2 rounded-xl border bg-muted/20 p-4">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-sm text-muted-foreground">
                                        Total a pagar
                                    </span>

                                    <span className="text-lg font-semibold">
                                        {precioFormateado}
                                    </span>
                                </div>
                            </div>

                            <div className="border-y border-border py-4">
                                <div className="flex items-start gap-3">
                                    <Clock3 className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                                    <p className="text-sm leading-6 text-muted-foreground">
                                        Después de realizar el pago solicita su
                                        verificación. Administración revisará la
                                        operación y, una vez confirmada,
                                        habilitará los módulos del curso.
                                    </p>
                                </div>
                            </div>

                            {paymentError && (
                                <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-3">
                                    <p className="text-sm leading-5 text-destructive">
                                        {paymentError}
                                    </p>
                                </div>
                            )}

                            <DialogFooter className="mt-2 gap-2 sm:gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setOpen(false)}
                                >
                                    Cancelar
                                </Button>

                                <Button
                                    type="button"
                                    onClick={handleStartPayment}
                                    className="gap-2"
                                >
                                    {esBolivia ? (
                                        <>
                                            <QrCode className="size-4" />
                                            Pagar con QR
                                        </>
                                    ) : (
                                        <>
                                            Ir a PayPal
                                            <ExternalLink className="size-4" />
                                        </>
                                    )}
                                </Button>
                            </DialogFooter>
                        </>
                    )}

                    {step === "qr" && qrPagoBolivia && (
                        <div className="flex flex-col items-center px-2 text-center">
                            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <QrCode className="size-5" />
                            </div>

                            <h2 className="mt-4 text-xl font-semibold">
                                Escanea el código QR
                            </h2>

                            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                                Realiza el pago correspondiente al curso completo
                                desde tu aplicación bancaria.
                            </p>

                            <div className="mt-5 overflow-hidden rounded-2xl border bg-white p-3">
                                <img
                                    src={qrPagoBolivia}
                                    alt="Código QR para pago del curso"
                                    className="h-auto w-full max-w-[280px] object-contain"
                                />
                            </div>

                            <div className="mt-5 w-full rounded-xl border bg-muted/20 p-4">
                                <p className="text-xs text-muted-foreground">
                                    Total del curso
                                </p>

                                <p className="mt-1 text-xl font-semibold">
                                    {precioFormateado}
                                </p>
                            </div>

                            {paymentError && (
                                <div className="mt-5 w-full rounded-xl border border-destructive/20 bg-destructive/5 p-3">
                                    <p className="text-sm leading-5 text-destructive">
                                        {paymentError}
                                    </p>
                                </div>
                            )}

                            {!canVerify ? (
                                <div className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
                                    <Loader2 className="size-4 animate-spin" />
                                    Espera unos segundos después de realizar el
                                    pago...
                                </div>
                            ) : (
                                <Button
                                    type="button"
                                    className="mt-6 w-full gap-2"
                                    onClick={handleVerifyPayment}
                                    disabled={crearLead.isPending}
                                >
                                    {crearLead.isPending ? (
                                        <>
                                            <Loader2 className="size-4 animate-spin" />
                                            Enviando solicitud...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 className="size-4" />
                                            Verificar pago
                                        </>
                                    )}
                                </Button>
                            )}

                            <Button
                                type="button"
                                variant="ghost"
                                className="mt-3 w-full"
                                onClick={() => setOpen(false)}
                            >
                                Cancelar
                            </Button>
                        </div>
                    )}

                    {step === "paypal" && (
                        <div className="flex min-h-[330px] flex-col items-center justify-center px-4 text-center">
                            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <ExternalLink className="size-6" />
                            </div>

                            <h2 className="mt-5 text-xl font-semibold">
                                Completa tu pago en PayPal
                            </h2>

                            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                                PayPal se abrió en una nueva pestaña. Completa
                                allí el pago del curso y luego vuelve para
                                solicitar su verificación.
                            </p>

                            <div className="mt-5 rounded-xl border bg-muted/20 px-6 py-4">
                                <p className="text-xs text-muted-foreground">
                                    Total del curso
                                </p>

                                <p className="mt-1 text-xl font-semibold">
                                    {precioFormateado}
                                </p>
                            </div>

                            {paymentError && (
                                <div className="mt-5 w-full rounded-xl border border-destructive/20 bg-destructive/5 p-3">
                                    <p className="text-sm leading-5 text-destructive">
                                        {paymentError}
                                    </p>
                                </div>
                            )}

                            {!canVerify ? (
                                <div className="mt-6 flex items-center gap-2 rounded-xl bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
                                    <Loader2 className="size-4 animate-spin" />
                                    Espera unos segundos después de realizar el
                                    pago...
                                </div>
                            ) : (
                                <Button
                                    type="button"
                                    className="mt-6 w-full gap-2"
                                    onClick={handleVerifyPayment}
                                    disabled={crearLead.isPending}
                                >
                                    {crearLead.isPending ? (
                                        <>
                                            <Loader2 className="size-4 animate-spin" />
                                            Enviando solicitud...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 className="size-4" />
                                            Verificar pago
                                        </>
                                    )}
                                </Button>
                            )}

                            {linkPago && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="mt-3 w-full gap-2"
                                    onClick={() => {
                                        const paymentWindow =
                                            window.open(linkPago, "_blank");

                                        if (paymentWindow) {
                                            paymentWindow.opener = null;
                                        }
                                    }}
                                >
                                    Volver a abrir PayPal
                                    <ExternalLink className="size-4" />
                                </Button>
                            )}

                            <Button
                                type="button"
                                variant="ghost"
                                className="mt-3 w-full"
                                onClick={() => setOpen(false)}
                            >
                                Cancelar
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
                <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl pr-3">
                    <div className="flex min-h-[320px] flex-col items-center justify-center px-4 text-center">
                        <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <MailCheck className="size-7" />
                        </div>

                        <h2 className="mt-5 text-xl font-semibold">
                            Solicitud de verificación enviada
                        </h2>

                        <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                            Tu solicitud fue registrada correctamente.
                            Administración revisará el pago realizado.
                        </p>

                        <div className="mt-5 flex items-start gap-3 rounded-xl bg-muted/50 p-4 text-left">
                            <Clock3 className="mt-0.5 size-4 shrink-0 text-primary" />

                            <p className="text-sm leading-6 text-muted-foreground">
                                Una vez confirmado el pago, se habilitará tu
                                inscripción a los módulos incluidos en la compra
                                del curso.
                            </p>
                        </div>

                        <p className="mt-4 max-w-sm text-xs leading-5 text-muted-foreground">
                            No es necesario volver a realizar el pago ni enviar
                            otra solicitud.
                        </p>

                        <Button
                            type="button"
                            className="mt-7 w-full"
                            onClick={() => setSuccessOpen(false)}
                        >
                            Entendido
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}