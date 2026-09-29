"use client";

import { useState } from "react";
import { LogIn, UserPlus } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { useAuthDialogStore } from "@/store/authDialogStore";

import { LoginForm } from "./FormLogin";
import { RegisterForm } from "./RegisterForm";

type AuthMode = "login" | "register";

export function LoginDialog() {
    const { isOpen, close } = useAuthDialogStore();
    const [mode, setMode] = useState<AuthMode>("login");

    const handleClose = () => {
        close();

        window.setTimeout(() => {
            setMode("login");
        }, 200);
    };

    const handleSuccess = () => {
        handleClose();
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) handleClose();
            }}
        >
            <DialogContent
                className={cn(
                    "z-[201] w-[calc(100vw-1.5rem)] max-w-[440px] overflow-hidden p-0",
                    "max-h-[calc(100svh-1.5rem)] overflow-y-auto",
                    "rounded-2xl border-border/70 bg-background shadow-2xl",
                )}
            >
                <div className="px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
                    <DialogHeader className="text-left">
                        <div className="flex items-start gap-3 pr-6">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                {mode === "login" ? (
                                    <LogIn className="size-[18px]" />
                                ) : (
                                    <UserPlus className="size-[18px]" />
                                )}
                            </div>

                            <div className="min-w-0 space-y-1">
                                <DialogTitle className="text-xl font-semibold tracking-tight">
                                    {mode === "login"
                                        ? "Bienvenido nuevamente"
                                        : "Crea tu cuenta"}
                                </DialogTitle>

                                <DialogDescription className="text-xs leading-5 sm:text-sm">
                                    {mode === "login"
                                        ? "Ingresa a tu cuenta para continuar con tu formación."
                                        : "Regístrate para acceder a la plataforma y comenzar tu formación."}
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="mt-4 grid grid-cols-2 rounded-lg bg-muted p-1">
                        <button
                            type="button"
                            onClick={() => setMode("login")}
                            className={cn(
                                "h-9 rounded-md px-3 text-xs font-medium transition-all sm:text-sm",
                                mode === "login"
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground",
                            )}
                        >
                            Iniciar sesión
                        </button>

                        <button
                            type="button"
                            onClick={() => setMode("register")}
                            className={cn(
                                "h-9 rounded-md px-3 text-xs font-medium transition-all sm:text-sm",
                                mode === "register"
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground",
                            )}
                        >
                            Registrarse
                        </button>
                    </div>
                </div>

                <div className="border-t px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                    <div className="space-y-4">
                        {mode === "login" ? (
                            <LoginForm onSuccess={handleSuccess} />
                        ) : (
                            <RegisterForm onSuccess={handleSuccess} />
                        )}
                        <p className="text-center text-[9px] leading-4 text-muted-foreground sm:text-[10px]">
                            Al continuar, aceptas los términos de uso y la
                            política de privacidad de Élite Academy.
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}