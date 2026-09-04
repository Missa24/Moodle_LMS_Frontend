import { useLocation, useNavigate } from "react-router-dom";
import {
    ChevronDown,
    LogOut,
    User,
} from "lucide-react";

import { ModeToggle } from "../ModeToggle";
import { useAuthStore } from "@/store/authStore";

import {
    Avatar,
    AvatarFallback,
} from "../ui/avatar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Button } from "../ui/button";
import { NotificationBell } from "./notification-bell";

export const Headerbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const usuario = useAuthStore(
        (state) => state.usuario,
    );

    const logout = useAuthStore(
        (state) => state.logout,
    );

    const fullName =
        usuario?.username || "Usuario";

    const initials =
        fullName
            .slice(0, 2)
            .toUpperCase();

    const email =
        usuario?.correo || "Sin correo";

    const getPageInfo = () => {
        const path = location.pathname;

        if (path.endsWith("/inicio")) {
            return {
                title: "Inicio",
                subtitle: "Resumen de tu plataforma",
            };
        }

        if (path.includes("/usuario")) {
            return {
                title: "Usuarios",
                subtitle: "Gestión de usuarios",
            };
        }

        if (path.includes("/cursos/mis-cursos")) {
            return {
                title: "Mis cursos",
                subtitle: "Continúa con tu aprendizaje",
            };
        }

        if (path.includes("/cursos")) {
            return {
                title: "Cursos",
                subtitle: "Gestión académica",
            };
        }

        if (path.includes("/inscripciones")) {
            return {
                title: "Inscripciones",
                subtitle: "Gestión de inscripciones",
            };
        }

        if (path.includes("/certificados")) {
            return {
                title: "Mis certificados",
                subtitle: "Certificados obtenidos",
            };
        }

        if (path.endsWith("/perfil")) {
            return {
                title: "Mi perfil",
                subtitle: "Información de tu cuenta",
            };
        }

        return {
            title: "Elite Academy",
            subtitle: "Plataforma académica",
        };
    };

    const pageInfo = getPageInfo();

    const handleProfile = () => {
        navigate("/panel/perfil");
    };

    const handleLogout = () => {
        logout();

        navigate("/", {
            replace: true,
        });
    };

    return (
        <header className="sticky top-3 z-30 px-3 sm:px-4">
            <div className="flex min-h-16 items-center justify-between gap-3 rounded-2xl border border-border/70 bg-background/90 px-3 py-2 shadow-sm backdrop-blur-xl sm:px-4">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="hidden h-10 w-1 rounded-full bg-primary sm:block" />

                    <div className="min-w-0">
                        <h1 className="truncate text-base font-semibold tracking-tight text-foreground sm:text-lg">
                            {pageInfo.title}
                        </h1>

                        <p className="hidden truncate text-xs text-muted-foreground sm:block">
                            {pageInfo.subtitle}
                        </p>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                    <div className="flex items-center gap-1 rounded-xl bg-muted/40 p-1">
                        <ModeToggle />

                        <NotificationBell />
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="ml-1 h-11 gap-2 rounded-xl px-1.5 pr-2 hover:bg-muted/70 sm:px-2"
                            >
                                <div className="relative">
                                    <Avatar className="h-8 w-8 border border-primary/20">
                                        <AvatarFallback className="bg-primary/10 text-[11px] font-bold uppercase text-primary">
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>

                                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-emerald-500" />
                                </div>

                                <div className="hidden min-w-0 flex-col items-start lg:flex">
                                    <span className="max-w-[150px] truncate text-xs font-semibold leading-tight">
                                        {fullName}
                                    </span>

                                    <span className="max-w-[150px] truncate text-[10px] leading-tight text-muted-foreground">
                                        {email}
                                    </span>
                                </div>

                                <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground sm:block" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="end"
                            sideOffset={10}
                            className="w-64 rounded-2xl border-border/70 p-2 shadow-xl"
                        >
                            <DropdownMenuLabel className="px-2 py-2">
                                <div className="flex items-center gap-3 rounded-xl bg-muted/40 p-2">
                                    <div className="relative">
                                        <Avatar className="h-11 w-11 border border-primary/20">
                                            <AvatarFallback className="bg-primary/10 text-sm font-bold uppercase text-primary">
                                                {initials}
                                            </AvatarFallback>
                                        </Avatar>

                                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-semibold text-foreground">
                                            {fullName}
                                        </p>

                                        <p className="truncate text-xs font-normal text-muted-foreground">
                                            {email}
                                        </p>
                                    </div>
                                </div>
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator />

                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    onClick={handleProfile}
                                    className="cursor-pointer rounded-xl py-2.5"
                                >
                                    <User className="mr-2 h-4 w-4" />

                                    <span>
                                        Mi perfil
                                    </span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="cursor-pointer rounded-xl py-2.5 text-destructive focus:bg-destructive/10 focus:text-destructive"
                            >
                                <LogOut className="mr-2 h-4 w-4" />

                                <span>
                                    Cerrar sesión
                                </span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};