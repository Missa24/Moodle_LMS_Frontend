import { CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { useCreateLead } from "../Hook/LeadHook";

interface BuyModuleButtonProps {
    moduloId: string;
    linkPago?: string | null;
}

export default function BuyModuleButton({
    moduloId,
    linkPago,
}: BuyModuleButtonProps) {
    const crearLead = useCreateLead();

    const paymentUrl =
        linkPago || "https://facebook.com";

    const handleOpenPayment = () => {
        crearLead.mutate({
            moduloId,
        });
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    type="button"
                    onClick={handleOpenPayment}
                    className="gap-2"
                >
                    <CreditCard className="h-4 w-4" />

                    Comprar módulo
                </Button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="flex w-full flex-col gap-0 p-0 sm:max-w-xl md:max-w-2xl lg:max-w-3xl"
            >
                <SheetHeader className="border-b px-5 py-4">
                    <SheetTitle>
                        Comprar módulo
                    </SheetTitle>

                    <SheetDescription>
                        Completa el proceso de pago para acceder al módulo.
                    </SheetDescription>
                </SheetHeader>

                <div className="min-h-0 flex-1 bg-muted/20 p-3">
                    <div className="h-full overflow-hidden rounded-xl border bg-background">
                        <iframe
                            src={paymentUrl}
                            title="Pago del módulo"
                            className="h-[calc(100vh-120px)] w-full border-0"
                            allow="payment"
                        />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}