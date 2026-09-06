import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRound } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";

export function CompleteProfileDialog() {
    const navigate = useNavigate();
    const usuario = useAuthStore((state) => state.usuario);

    const [dismissed, setDismissed] = useState(false);

    const open =
        Boolean(usuario?.requiereCompletarPerfil) &&
        !dismissed;

    const handleOpenChange = (value: boolean) => {
        if (!value) {
            setDismissed(true);
        }
    };

    const handleCompleteProfile = () => {
        setDismissed(true);
        navigate("/panel/perfil");
    };

    return (
        <Dialog
            open={open}
            onOpenChange={handleOpenChange}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="items-center text-center">
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <UserRound className="h-6 w-6 text-primary" />
                    </div>

                    <DialogTitle>
                        Completa tu perfil
                    </DialogTitle>

                    <DialogDescription>
                        Necesitamos algunos datos adicionales para completar tu cuenta y mostrarte las opciones disponibles según tu país.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex-col gap-2 sm:flex-row">
                    <Button
                        variant="outline"
                        onClick={() => setDismissed(true)}
                    >
                        Lo haré después
                    </Button>

                    <Button
                        onClick={handleCompleteProfile}
                    >
                        Completar perfil
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}