import {
    BadgeCheck,
    Check,
    ShieldCheck,
} from "lucide-react";
import { ReactNode } from "react";

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
    currency?: string;
    badge?: string;
    features?: string[];
    action?: ReactNode;
    footer?: string;
    highlight?: string;
}

export function PricingCard({
    title = "Acceso al módulo",
    subtitle = "Accede a todo el contenido de esta formación.",
    price,
    currency = "USD",
    badge,
    features = [],
    action,
    footer = "Pago único. Acceso al contenido del módulo.",
    highlight,
}: PricingCardProps) {
    return (
        <Card className="relative overflow-hidden border shadow-sm">
            <div className="h-1 bg-primary" />

            <CardHeader className="space-y-3 pb-5">
                {badge && (
                    <Badge
                        variant="secondary"
                        className="w-fit gap-1"
                    >
                        <BadgeCheck className="size-3.5" />
                        {badge}
                    </Badge>
                )}

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
                <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold tracking-tight">
                            {price !== null && price !== undefined
                                ? `$${price}`
                                : "--"}
                        </span>

                        <span className="text-sm text-muted-foreground">
                            {currency}
                        </span>
                    </div>

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

                {action && (
                    <div className="w-full">
                        {action}
                    </div>
                )}

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
