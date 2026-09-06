import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
    const [isDark, setIsDark] = React.useState(true);

    React.useEffect(() => {
        setIsDark(
            document.documentElement.classList.contains("dark")
        );
    }, []);

    const toggleTheme = () => {
        const nextIsDark = !isDark;

        document.documentElement.classList.toggle(
            "dark",
            nextIsDark
        );

        setIsDark(nextIsDark);
    };

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label={
                isDark
                    ? "Cambiar a modo claro"
                    : "Cambiar a modo oscuro"
            }
        >
            {isDark ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}

            <span className="sr-only">
                Cambiar tema
            </span>
        </Button>
    );
}
