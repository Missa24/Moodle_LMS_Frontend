import {
    MessageCircle,
} from "lucide-react";

import {
    useAuthStore,
} from "@/store/authStore";

import { SupportForm } from "@/features/Support/Componentes/SupportForm";
import BuyModuleButton from "@/features/Lead/Components/BuyModuleButton";

export default function SupportPage() {
    const usuario = useAuthStore(
        (state) => state.usuario,
    );

    return (
        <div className="mx-auto w-full max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8">
            <div className="space-y-3">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <MessageCircle className="size-6" />
                </div>

                <div>
                    <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        Centro de soporte
                    </h1>

                    <p className="mt-1 max-w-2xl text-sm text-muted-foreground sm:text-base">
                        ¿Tienes algún problema o necesitas
                        ayuda? Cuéntanos qué sucede y te
                        ayudaremos lo antes posible.
                    </p>
                </div>
            </div>

            <div className="flex items-center">
                <BuyModuleButton
                    moduloId="MODULO_ID_PRUEBA"
                    linkPago="https://example.com"
                />
            </div>

            <SupportForm
                nombre={
                    usuario?.username ?? ""
                }
                correo={
                    usuario?.correo ?? ""
                }
            />
        </div>
    );
}