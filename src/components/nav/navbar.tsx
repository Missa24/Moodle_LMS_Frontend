import { useState } from "react";

import { Link } from "react-router-dom";

import {
    CircleUserRound,
    Menu,
    Search,
    X,
} from "lucide-react";

import { CourseSearch } from "@/features/Home/Components/Cursos/couse-search";
import { cn } from "@/lib/utils";
import { useAuthDialogStore } from "@/store/authDialogStore";
import { useAuthStore } from "@/store/authStore";

import { ModeToggle } from "../ModeToggle";

const ITEMS = [
    {
        label: "Inicio",
        to: "/",
    },
    {
        label: "Cursos",
        to: "/cursos",
    },
];

export function Navbar() {
    const { token } = useAuthStore();

    const openLoginDialog =
        useAuthDialogStore(
            (state) => state.open
        );

    const [
        mobileMenuOpen,
        setMobileMenuOpen,
    ] = useState(false);

    const [
        mobileSearchOpen,
        setMobileSearchOpen,
    ] = useState(false);

    const closeMobilePanels = () => {
        setMobileMenuOpen(false);
        setMobileSearchOpen(false);
    };

    return (
        <header className="fixed inset-x-0 top-3 z-[100] px-3 sm:top-5 sm:px-5 lg:top-6">
            <div
                className={cn(
                    "mx-auto w-full max-w-[1050px]",
                    "overflow-hidden rounded-2xl",
                    "border border-border/80",
                    "bg-background/90",
                    "shadow-sm backdrop-blur-xl",
                    "transition-all duration-300"
                )}
            >
                {/* NAVBAR PRINCIPAL */}
                <div
                    className={cn(
                        "flex h-16 items-center gap-3 px-3",
                        "sm:h-[70px] sm:px-4",
                        "lg:grid",
                        "lg:grid-cols-[auto_minmax(280px,430px)_auto]",
                        "lg:gap-6 lg:px-5"
                    )}
                >
                    {/* LOGO + LINKS */}
                    <div className="flex min-w-0 items-center gap-4">
                        <Link
                            to="/"
                            onClick={closeMobilePanels}
                            className="flex shrink-0 items-center"
                            aria-label="Élite Academy"
                        >
                            <img
                                src="/logo.png"
                                alt="Élite Academy"
                                className="size-10 object-contain sm:size-11"
                            />
                        </Link>

                        {/* DESKTOP NAV */}
                        <nav className="hidden items-center gap-1 lg:flex">
                            {ITEMS.map(
                                (item) => (
                                    <Link
                                        key={item.to}
                                        to={item.to}
                                        className={cn(
                                            "relative rounded-full",
                                            "px-3.5 py-2",
                                            "text-sm font-medium",
                                            "text-muted-foreground",
                                            "transition-colors duration-200",
                                            "hover:text-foreground"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                )
                            )}
                        </nav>
                    </div>

                    {/* BUSCADOR DESKTOP */}
                    <div className="hidden min-w-0 lg:block">
                        <CourseSearch
                            variant="navbar"
                            className="mx-auto w-full"
                        />
                    </div>

                    {/* ACCIONES */}
                    <div className="ml-auto flex shrink-0 items-center justify-end gap-1.5 lg:ml-0 lg:gap-2">
                        {/* BUSCAR MOBILE */}
                        <button
                            type="button"
                            onClick={() => {
                                setMobileSearchOpen(
                                    (current) =>
                                        !current
                                );

                                setMobileMenuOpen(false);
                            }}
                            className={cn(
                                "flex size-9 items-center justify-center",
                                "rounded-xl",
                                "border border-border",
                                "text-muted-foreground",
                                "transition-all duration-200",
                                "hover:border-primary/30",
                                "hover:bg-primary/5",
                                "hover:text-primary",
                                "lg:hidden"
                            )}
                            aria-label="Buscar cursos"
                        >
                            {mobileSearchOpen ? (
                                <X className="size-4" />
                            ) : (
                                <Search className="size-4" />
                            )}
                        </button>

                        {/* TEMA */}
                        <ModeToggle />

                        {/* SESIÓN DESKTOP/TABLET */}
                        {token ? (
                            <Link
                                to="/panel/inicio"
                                className={cn(
                                    "group hidden items-center gap-2",
                                    "rounded-full",
                                    "border border-border",
                                    "bg-background",
                                    "px-3 py-2",
                                    "text-sm font-medium",
                                    "text-foreground",
                                    "shadow-sm",
                                    "transition-all duration-300",
                                    "hover:-translate-y-0.5",
                                    "hover:border-primary/30",
                                    "hover:shadow-md",
                                    "sm:inline-flex"
                                )}
                            >
                                <span
                                    className={cn(
                                        "flex size-7 items-center justify-center",
                                        "rounded-full",
                                        "bg-primary/10",
                                        "text-primary"
                                    )}
                                >
                                    <CircleUserRound className="size-4" />
                                </span>

                                <span>
                                    Mi cuenta
                                </span>
                            </Link>
                        ) : (
                            <button
                                type="button"
                                onClick={() =>
                                    openLoginDialog()
                                }
                                className={cn(
                                    "group hidden items-center gap-2",
                                    "rounded-full",
                                    "border border-border",
                                    "bg-background",
                                    "px-3 py-2",
                                    "text-sm font-medium",
                                    "text-foreground",
                                    "shadow-sm",
                                    "transition-all duration-300",
                                    "hover:-translate-y-0.5",
                                    "hover:border-primary/30",
                                    "hover:shadow-md",
                                    "sm:inline-flex"
                                )}
                            >
                                <span
                                    className={cn(
                                        "flex size-7 items-center justify-center",
                                        "rounded-full",
                                        "bg-primary/10",
                                        "text-primary",
                                        "transition-colors duration-300",
                                        "group-hover:bg-primary",
                                        "group-hover:text-primary-foreground"
                                    )}
                                >
                                    <CircleUserRound className="size-4" />
                                </span>

                                <span className="whitespace-nowrap">
                                    Iniciar sesión
                                    <span className="mx-1.5 text-border">
                                        |
                                    </span>
                                    <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                                        Registrarse
                                    </span>
                                </span>
                            </button>
                        )}

                        {/* MENU MOBILE */}
                        <button
                            type="button"
                            onClick={() => {
                                setMobileMenuOpen(
                                    (current) =>
                                        !current
                                );

                                setMobileSearchOpen(false);
                            }}
                            className={cn(
                                "flex size-9 items-center justify-center",
                                "rounded-xl",
                                "border border-border",
                                "text-muted-foreground",
                                "transition-all duration-200",
                                "hover:border-primary/30",
                                "hover:bg-primary/5",
                                "hover:text-primary",
                                "lg:hidden"
                            )}
                            aria-label={
                                mobileMenuOpen
                                    ? "Cerrar menú"
                                    : "Abrir menú"
                            }
                        >
                            {mobileMenuOpen ? (
                                <X className="size-4" />
                            ) : (
                                <Menu className="size-4" />
                            )}
                        </button>
                    </div>
                </div>

                {/* BUSCADOR MOBILE */}
                <div
                    className={cn(
                        "grid transition-all duration-300 lg:hidden",
                        mobileSearchOpen
                            ? "grid-rows-[1fr] border-t border-border opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                    )}
                >
                    <div className="overflow-hidden">
                        <div className="p-3 sm:p-4">
                            <CourseSearch
                                variant="navbar"
                                onSearchComplete={() =>
                                    setMobileSearchOpen(
                                        false
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* MENU MOBILE */}
                <div
                    className={cn(
                        "grid transition-all duration-300 lg:hidden",
                        mobileMenuOpen
                            ? "grid-rows-[1fr] border-t border-border opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                    )}
                >
                    <div className="overflow-hidden">
                        <div className="p-3 sm:p-4">
                            {/* LINKS */}
                            <nav className="flex flex-col">
                                {ITEMS.map(
                                    (item) => (
                                        <Link
                                            key={item.to}
                                            to={item.to}
                                            onClick={
                                                closeMobilePanels
                                            }
                                            className={cn(
                                                "border-b border-border/60",
                                                "px-2 py-3",
                                                "text-sm font-medium",
                                                "text-muted-foreground",
                                                "transition-colors duration-200",
                                                "last:border-b-0",
                                                "hover:text-foreground"
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    )
                                )}
                            </nav>

                            {/* LOGIN MOBILE */}
                            <div className="mt-3 border-t border-border pt-3 sm:hidden">
                                {token ? (
                                    <Link
                                        to="/panel/inicio"
                                        onClick={
                                            closeMobilePanels
                                        }
                                        className={cn(
                                            "flex w-full items-center gap-3",
                                            "rounded-xl",
                                            "border border-border",
                                            "bg-background",
                                            "p-3",
                                            "text-sm font-medium",
                                            "text-foreground",
                                            "transition-all duration-200",
                                            "hover:border-primary/30",
                                            "hover:bg-primary/5"
                                        )}
                                    >
                                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <CircleUserRound className="size-[18px]" />
                                        </span>

                                        <div className="text-left">
                                            <p>
                                                Mi cuenta
                                            </p>

                                            <p className="mt-0.5 text-[10px] font-normal text-muted-foreground">
                                                Accede a tu plataforma
                                            </p>
                                        </div>
                                    </Link>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            closeMobilePanels();
                                            openLoginDialog();
                                        }}
                                        className={cn(
                                            "flex w-full items-center gap-3",
                                            "rounded-xl",
                                            "border border-border",
                                            "bg-background",
                                            "p-3",
                                            "text-left",
                                            "transition-all duration-200",
                                            "hover:border-primary/30",
                                            "hover:bg-primary/5"
                                        )}
                                    >
                                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <CircleUserRound className="size-[18px]" />
                                        </span>

                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-foreground">
                                                Iniciar sesión
                                                <span className="mx-1.5 text-border">
                                                    |
                                                </span>
                                                Registrarse
                                            </p>

                                            <p className="mt-0.5 text-[10px] text-muted-foreground">
                                                Accede o crea tu cuenta
                                            </p>
                                        </div>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}