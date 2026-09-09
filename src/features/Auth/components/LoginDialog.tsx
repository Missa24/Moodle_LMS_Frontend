"use client";

import { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

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
    const [googleButtonWidth, setGoogleButtonWidth] = useState("400");

    const googleAuth = useGoogleAuth();

    useEffect(() => {
        const updateGoogleWidth = () => {
            const width = Math.max(
                240,
                Math.min(400, window.innerWidth - 56),
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
                    "z-[201] w-[calc(100vw-1rem)] max-w-[480px] p-0",
                    "max-h-[calc(100svh-1rem)] overflow-y-auto overscroll-contain",
                    "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                    "rounded-2xl border-border/80 bg-background/95",
                    "shadow-2xl backdrop-blur-xl",
                    "sm:w-full sm:max-h-[92svh] sm:rounded-[1.75rem]",
                )}
            >
                <div className="border-b border-border/70 px-4 pb-4 pt-5 sm:px-7 sm:pb-6 sm:pt-7">
                    <DialogHeader className="text-left">
                        <DialogTitle className="text-lg font-semibold tracking-[-0.03em] sm:text-2xl">
                            {mode === "login"
                                ? "Bienvenido nuevamente"
                                : "Crea tu cuenta"}
                        </DialogTitle>

                        <DialogDescription className="max-w-sm text-[11px] leading-relaxed sm:text-sm sm:leading-[1.65]">
                            {mode === "login"
                                ? "Ingresa a tu cuenta para continuar con tu formación."
                                : "Crea una cuenta para acceder a la plataforma y comenzar tu formación."}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="mt-4 grid grid-cols-2 rounded-xl border border-border/70 bg-muted/40 p-1 sm:mt-5">
                        <button
                            type="button"
                            onClick={() => setMode("login")}
                            className={cn(
                                "min-h-10 rounded-lg px-2 py-2 text-[11px] font-medium transition-all duration-200",
                                "sm:px-3 sm:py-2.5 sm:text-sm",
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
                                "min-h-10 rounded-lg px-2 py-2 text-[11px] font-medium transition-all duration-200",
                                "sm:px-3 sm:py-2.5 sm:text-sm",
                                mode === "register"
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground",
                            )}
                        >
                            Registrarse
                        </button>
                    </div>
                </div>

                <div className="space-y-4 px-4 py-5 sm:space-y-5 sm:px-7 sm:pb-7 sm:pt-6">
                    {mode === "login" ? (
                        <LoginForm onSuccess={handleSuccess} />
                    ) : (
                        <RegisterForm onSuccess={handleSuccess} />
                    )}

                    <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="h-px flex-1 bg-border" />

                        <span className="shrink-0 whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:text-[9px] sm:tracking-[0.14em]">
                            o continúa con
                        </span>

                        <div className="h-px flex-1 bg-border" />
                    </div>

                    <div className="flex w-full justify-center overflow-hidden">
                        <GoogleLogin
                            onSuccess={(response) => {
                                if (!response.credential) return;

                                googleAuth.mutate(response.credential, {
                                    onSuccess: handleSuccess,
                                });
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
                    <p className="mx-auto max-w-sm px-2 text-center text-[9px] leading-relaxed text-muted-foreground sm:px-0 sm:text-[10px]">
                        Al continuar, aceptas los términos de uso y nuestra{" "}
                        <a
                            href="/politica-de-privacidad"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-foreground underline underline-offset-2 hover:text-primary"
                        >
                            política de privacidad
                        </a>
                        .
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}