import { useState } from "react";
import {
    CheckCircle2,
    Clock3,
    CreditCard,
    ExternalLink,
    MailCheck,
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

import { useCreateLead } from "../Hook/LeadHook";

interface BuyModuleButtonProps {
    moduloId: string;
    linkPago?: string | null;
    precio?: number | null;
    currency?: string;
}

type PaymentStep =
    | "confirm"
    | "redirecting"
    | "review";

export default function BuyModuleButton({
    moduloId,
    linkPago,
    precio,
    currency = "USD",
}: BuyModuleButtonProps) {
    const crearLead = useCreateLead();

    const [open, setOpen] = useState(false);
    const [step, setStep] = useState<PaymentStep>("confirm");

    const handleOpenChange = (value: boolean) => {
        setOpen(value);

        if (!value) {
            window.setTimeout(() => {
                setStep("confirm");
            }, 200);
        }
    };

    const handleContinuePayment = () => {
        if (!linkPago) return;

        const paymentWindow = window.open(linkPago, "_blank");

        if (!paymentWindow) {
            console.error("El navegador bloqueó la nueva pestaña");
            return;
        }

        setStep("redirecting");

        crearLead.mutate(
            { moduloId },
            {
                onSuccess: () => {
                    window.setTimeout(() => {
                        setStep("review");
                    }, 5000);
                },

                onError: () => {
                    paymentWindow.close();
                    setStep("confirm");
                },
            },
        );
    };

    const precioFormateado =
        precio !== null && precio !== undefined
            ? `${currency} ${precio.toFixed(2)}`
            : "Precio no disponible";

    return (
        <Dialog
            open={open}
            onOpenChange={handleOpenChange}
        >
            <DialogTrigger asChild>
                <Button
                    type="button"
                    disabled={!linkPago}
                    className="w-full gap-2"
                >
                    <CreditCard className="size-4" />
                    Comprar módulo
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl sm:rounded-2xl">
                {step === "confirm" && (
                    <>
                        <DialogHeader>
                            <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <CreditCard className="size-5" />
                            </div>

                            <DialogTitle className="text-xl">
                                Continuar al pago
                            </DialogTitle>

                            <DialogDescription className="pt-1 leading-6">
                                Serás dirigido a PayPal en una nueva pestaña
                                para completar el pago de tu módulo de forma
                                segura.
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
                                    Una vez realizado el pago, nuestro equipo
                                    administrativo revisará la operación antes
                                    de habilitar tu inscripción.
                                </p>
                            </div>
                        </div>

                        <p className="text-xs leading-5 text-muted-foreground">
                            Cuando tu pago sea confirmado, recibirás una
                            notificación por correo electrónico y podrás
                            acceder al contenido desde tu cuenta.
                        </p>

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
                                onClick={handleContinuePayment}
                                disabled={crearLead.isPending}
                                className="gap-2"
                            >
                                {crearLead.isPending
                                    ? "Preparando..."
                                    : "Continuar a PayPal"}

                                {!crearLead.isPending && (
                                    <ExternalLink className="size-4" />
                                )}
                            </Button>
                        </DialogFooter>
                    </>
                )}

                {step === "redirecting" && (
                    <div className="flex min-h-[280px] flex-col items-center justify-center px-4 text-center">
                        <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <CheckCircle2 className="size-6" />
                        </div>

                        <h2 className="mt-5 text-xl font-semibold tracking-[-0.03em]">
                            Todo listo
                        </h2>

                        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                            Estamos abriendo PayPal en una nueva pestaña para
                            que puedas completar tu pago.
                        </p>

                        {precio !== null && precio !== undefined && (
                            <div className="mt-5 rounded-xl border bg-muted/20 px-5 py-3">
                                <p className="text-xs text-muted-foreground">
                                    Total
                                </p>

                                <p className="mt-1 text-lg font-semibold">
                                    {precioFormateado}
                                </p>
                            </div>
                        )}

                        <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="size-2 animate-pulse rounded-full bg-primary" />
                            Redirigiendo al pago...
                        </div>
                    </div>
                )}

                {step === "review" && (
                    <div className="flex min-h-[320px] flex-col items-center justify-center px-4 text-center">
                        <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <MailCheck className="size-6" />
                        </div>

                        <h2 className="mt-5 text-xl font-semibold tracking-[-0.03em]">
                            Tu solicitud está en proceso
                        </h2>

                        <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                            Cuando completes tu pago, nuestro equipo de
                            administración revisará la operación para validar
                            tu inscripción.
                        </p>

                        <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                            Una vez confirmado el pago, se habilitará el
                            acceso a tu módulo y recibirás una notificación
                            por correo electrónico.
                        </p>

                        <div className="mt-6 flex items-center gap-2 rounded-xl bg-muted/50 px-4 py-3 text-xs text-muted-foreground">
                            <Clock3 className="size-4 shrink-0 text-primary" />
                            La validación puede tomar unos minutos.
                        </div>

                        <Button
                            type="button"
                            className="mt-7 w-full sm:w-auto"
                            onClick={() => setOpen(false)}
                        >
                            Entendido
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}