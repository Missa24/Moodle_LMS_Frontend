import {
    useState,
} from "react";

import {
    GoogleLogin,
} from "@react-oauth/google";

import {
    LogIn,
    Sparkles,
    UserPlus,
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    cn,
} from "@/lib/utils";

import {
    useAuthDialogStore,
} from "@/store/authDialogStore";

import {
    LoginForm,
} from "./FormLogin";

import {
    RegisterForm,
} from "./RegisterForm";

import {
    useGoogleAuth,
} from "../Hook/useGoogleAuth";

type AuthMode =
    | "login"
    | "register";

export function LoginDialog() {
    const {
        isOpen,
        close,
    } =
        useAuthDialogStore();

    const [
        mode,
        setMode,
    ] =
        useState<AuthMode>(
            "login",
        );

    const googleAuth =
        useGoogleAuth();

    const handleClose = () => {
        close();

        window.setTimeout(
            () => {
                setMode(
                    "login",
                );
            },
            200,
        );
    };

    const handleSuccess =
        () => {
            handleClose();
        };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(
                open,
            ) => {
                if (!open) {
                    handleClose();
                }
            }}
        >
            <DialogContent
                className={cn(
                    "z-[201]",
                    "max-h-[92svh] overflow-y-auto",
                    "border-border/80",
                    "bg-background/95",
                    "p-0",
                    "shadow-2xl",
                    "backdrop-blur-xl",
                    "sm:max-w-[480px]",
                    "sm:rounded-[1.75rem]",
                )}
            >
                <div className="border-b border-border/70 px-5 pb-5 pt-6 sm:px-7 sm:pb-6 sm:pt-7">
                    <DialogHeader className="text-left">
                        <div className="mb-3 flex items-center justify-between">
                            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                {mode ===
                                    "login" ? (
                                    <LogIn className="size-[18px]" />
                                ) : (
                                    <UserPlus className="size-[18px]" />
                                )}
                            </div>

                            <div className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                <Sparkles className="size-3 text-primary" />

                                Élite Academy
                            </div>
                        </div>

                        <DialogTitle className="text-xl font-semibold tracking-[-0.03em] sm:text-2xl">
                            {mode ===
                                "login"
                                ? "Bienvenido nuevamente"
                                : "Crea tu cuenta"}
                        </DialogTitle>

                        <DialogDescription className="max-w-sm text-xs leading-[1.65] sm:text-sm">
                            {mode ===
                                "login"
                                ? "Ingresa a tu cuenta para continuar con tu formación."
                                : "Crea una cuenta para acceder a la plataforma y comenzar tu formación."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-5 grid grid-cols-2 rounded-xl border border-border/70 bg-muted/40 p-1">
                        <button
                            type="button"
                            onClick={() =>
                                setMode(
                                    "login",
                                )
                            }
                            className={cn(
                                "rounded-lg px-3 py-2.5",
                                "text-xs font-medium",
                                "transition-all duration-200",
                                "sm:text-sm",
                                mode ===
                                    "login"
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground",
                            )}
                        >
                            Iniciar sesión
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setMode(
                                    "register",
                                )
                            }
                            className={cn(
                                "rounded-lg px-3 py-2.5",
                                "text-xs font-medium",
                                "transition-all duration-200",
                                "sm:text-sm",
                                mode ===
                                    "register"
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground",
                            )}
                        >
                            Registrarse
                        </button>
                    </div>
                </div>

                <div className="space-y-5 px-5 pb-6 sm:px-7 sm:pb-7">
                    {mode ===
                        "login" ? (
                        <LoginForm
                            onSuccess={
                                handleSuccess
                            }
                        />
                    ) : (
                        <RegisterForm
                            onSuccess={
                                handleSuccess
                            }
                        />
                    )}

                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-border" />

                        <span className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                            o continúa con
                        </span>

                        <div className="h-px flex-1 bg-border" />
                    </div>

                    <div className="flex w-full justify-center overflow-hidden">
                        <GoogleLogin
                            onSuccess={(
                                response,
                            ) => {
                                if (
                                    !response.credential
                                ) {
                                    return;
                                }

                                googleAuth.mutate(
                                    response.credential,
                                    {
                                        onSuccess:
                                            handleSuccess,
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
                            width="400"
                        />
                    </div>

                    <p className="mx-auto max-w-sm text-center text-[9px] leading-[1.6] text-muted-foreground sm:text-[10px]">
                        Al continuar,
                        aceptas los
                        términos de uso y
                        la política de
                        privacidad de
                        Élite Academy.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}