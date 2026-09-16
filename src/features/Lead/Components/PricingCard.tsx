"use client";

import { useEffect, useState, ReactNode } from "react";
import {
    BadgeCheck,
    Check,
    Clock3,
    ShieldCheck,
    Tag,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

interface PricingCardProps {
    title?: string;
    subtitle?: string;
    price: number | string | null;
    originalPrice?: number | string | null;
    currency?: string;
    currencySymbol?: string;
    badge?: string;
    discountLabel?: string;
    discountEndsAt?: string | null;
    features?: string[];
    action?: ReactNode;
    footer?: string;
    highlight?: string;
}

function useCountdown(endDate?: string | null) {
    const [timeLeft, setTimeLeft] = useState<number | null>(null);

    useEffect(() => {
        if (!endDate) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTimeLeft(null);
            return;
        }

        const calcular = () => {
            const diferencia =
                new Date(endDate).getTime() - Date.now();

            setTimeLeft(Math.max(diferencia, 0));
        };

        calcular();

        const interval = window.setInterval(calcular, 1000);

        return () => window.clearInterval(interval);
    }, [endDate]);

    if (timeLeft === null) return null;

    const totalSeconds = Math.floor(timeLeft / 1000);

    return {
        expired: timeLeft <= 0,
        hours: Math.floor(totalSeconds / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
    };
}

function pad(value: number) {
    return String(value).padStart(2, "0");
}

export function PricingCard({
    title = "Acceso al módulo",
    subtitle = "Accede a todo el contenido de esta formación.",
    price,
    originalPrice,
    currency = "USD",
    currencySymbol = "$",
    badge,
    discountLabel,
    discountEndsAt,
    features = [],
    action,
    footer = "Pago único. Acceso al contenido del módulo.",
    highlight,
}: PricingCardProps) {
    const countdown = useCountdown(discountEndsAt);

    const tieneDescuento =
        originalPrice !== null &&
        originalPrice !== undefined &&
        price !== null &&
        price !== undefined &&
        Number(originalPrice) > Number(price);

    const fechaFinalizacion = discountEndsAt
        ? new Intl.DateTimeFormat("es-BO", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(new Date(discountEndsAt))
        : null;

    return (
        <Card className="relative overflow-hidden border shadow-sm">
            <div className="h-1 bg-primary" />

            <CardHeader className="space-y-3 pb-5">
                <div className="flex flex-wrap items-center gap-2">
                    {badge && (
                        <Badge variant="secondary" className="w-fit gap-1">
                            <BadgeCheck className="size-3.5" />
                            {badge}
                        </Badge>
                    )}

                    {tieneDescuento && discountLabel && (
                        <Badge className="w-fit gap-1">
                            <Tag className="size-3.5" />
                            {discountLabel}
                        </Badge>
                    )}
                </div>

                <div className="space-y-1">
                    <CardTitle className="text-xl font-semibold">
                        {title}
                    </CardTitle>

                    <CardDescription className="max-w-md leading-relaxed">
                        {subtitle}
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="space-y-3">
                    {tieneDescuento && (
                        <div className="flex flex-wrap items-baseline gap-2">
                            <span className="text-sm text-muted-foreground">
                                Antes
                            </span>

                            <span className="text-lg font-medium text-muted-foreground line-through">
                                {currencySymbol}
                                {originalPrice}
                            </span>

                            <span className="text-xs text-muted-foreground">
                                {currency}
                            </span>
                        </div>
                    )}

                    <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-4xl font-bold tracking-tight">
                            {price !== null && price !== undefined
                                ? `${currencySymbol}${price}`
                                : "--"}
                        </span>

                        <span className="text-sm text-muted-foreground">
                            {currency}
                        </span>
                    </div>

                    {tieneDescuento && fechaFinalizacion && (
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock3 className="size-4 shrink-0" />
                                <span>
                                    Promoción válida hasta el{" "}
                                    {fechaFinalizacion}
                                </span>
                            </div>

                            {countdown && (
                                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900/50 dark:bg-red-950/20">
                                    {countdown.expired ? (
                                        <p className="text-center text-sm font-semibold text-red-600 dark:text-red-400">
                                            Promoción finalizada
                                        </p>
                                    ) : (
                                        <div className="text-center">
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-red-600 dark:text-red-400">
                                                Termina en
                                            </p>

                                            <div className="mt-1 flex items-baseline justify-center gap-2 text-red-600 dark:text-red-400">
                                                <span className="text-2xl font-bold tabular-nums">
                                                    {pad(countdown.hours)}
                                                    <span className="ml-0.5 text-xs font-medium">
                                                        h
                                                    </span>
                                                </span>

                                                <span className="text-lg font-semibold">
                                                    :
                                                </span>

                                                <span className="text-2xl font-bold tabular-nums">
                                                    {pad(countdown.minutes)}
                                                    <span className="ml-0.5 text-xs font-medium">
                                                        m
                                                    </span>
                                                </span>

                                                <span className="text-lg font-semibold">
                                                    :
                                                </span>

                                                <span className="text-2xl font-bold tabular-nums">
                                                    {pad(countdown.seconds)}
                                                    <span className="ml-0.5 text-xs font-medium">
                                                        s
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {highlight && (
                        <p className="text-sm text-muted-foreground">
                            {highlight}
                        </p>
                    )}
                </div>

                {features.length > 0 && (
                    <div className="border-y py-5">
                        <p className="mb-4 text-sm font-medium">
                            Incluye:
                        </p>

                        <ul className="space-y-3">
                            {features.map((feature, index) => (
                                <li
                                    key={`${feature}-${index}`}
                                    className="flex items-start gap-3 text-sm text-muted-foreground"
                                >
                                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />

                                    <span className="leading-relaxed">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {action && <div className="w-full">{action}</div>}

                <div className="flex gap-2 border-t pt-4">
                    <ShieldCheck className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                    <p className="text-xs leading-relaxed text-muted-foreground">
                        {footer}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}