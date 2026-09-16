"use client";

import { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
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
import { useGoogleAuth } from "../Hook/useGoogleAuth";

type AuthMode = "login" | "register";

export function LoginDialog() {
    const { isOpen, close } = useAuthDialogStore();
    const [mode, setMode] = useState<AuthMode>("login");
    const [googleButtonWidth, setGoogleButtonWidth] = useState("360");
    const googleAuth = useGoogleAuth();

    useEffect(() => {
        const updateGoogleWidth = () => {
            const width = Math.max(
                240,
                Math.min(360, window.innerWidth - 64),
            );

            setGoogleButtonWidth(String(width));
        };

        updateGoogleWidth();
        window.addEventListener("resize", updateGoogleWidth);

        return () => {
            window.removeEventListener("resize", updateGoogleWidth);
        };
    }, []);

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

                        <div className="flex items-center gap-3">
                            <div className="h-px flex-1 bg-border" />

                            <span className="shrink-0 text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                                o continúa con
                            </span>

                            <div className="h-px flex-1 bg-border" />
                        </div>

                        <div className="flex w-full justify-center overflow-hidden">
                            <GoogleLogin
                                onSuccess={(response) => {
                                    if (!response.credential) return;

                                    googleAuth.mutate(
                                        response.credential,
                                        {
                                            onSuccess: handleSuccess,
                                        },
                                    );
                                }}
                                onError={() => {
                                    console.error(
                                        "Error al iniciar sesión con Google",
                                    );
                                }}
                                text="continue_with"
                                shape="pill"
                                size="large"
                                width={googleButtonWidth}
                            />
                        </div>

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