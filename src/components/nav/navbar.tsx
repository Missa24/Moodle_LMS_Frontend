import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useAuthDialogStore } from "@/store/authDialogStore";
import { cn } from "@/lib/utils";
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
    const location = useLocation();
    const { token, usuario } = useAuthStore();
    const openLoginDialog = useAuthDialogStore(
        (state) => state.open
    );

    return (
        <header
            className={cn(
                "fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] -translate-x-1/2 rounded-4xl border bg-background/70 backdrop-blur-md",
                "sm:top-6 lg:top-8 lg:w-[75%] xl:w-[70%]"
            )}
        >
            <div className="flex items-center justify-between px-6 py-3">
                {/* Logo */}
                <Link
                    to="/"
                    className="flex shrink-0 items-center gap-2"
                >
                    <img
                        src="/logo.png"
                        alt="Elite Academy"
                        className="h-10 w-10 object-contain sm:h-12 sm:w-12"
                    />
                </Link>

                {/* Navegación */}
                <nav className="hidden items-center gap-6 lg:flex">
                    {ITEMS.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={cn(
                                "text-sm font-medium transition-opacity hover:opacity-75",
                                location.pathname === item.to &&
                                "text-muted-foreground"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Acciones */}
                <div className="flex items-center gap-2.5">
                    <ModeToggle />

                    {token ? (
                        <Button asChild size="sm">
                            <Link to="/panel/inicio">
                                Mi cuenta
                            </Link>
                        </Button>
                    ) : (
                        <Button
                            size="sm"
                            onClick={() =>
                                openLoginDialog()
                            }
                        >
                            Iniciar sesión
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}
