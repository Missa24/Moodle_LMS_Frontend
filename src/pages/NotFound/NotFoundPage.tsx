import { ArrowLeft, BookOpen, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <main className="flex min-h-screen items-center justify-center px-5 pb-20 pt-28 sm:px-8 sm:pt-32">
            <div className="mx-auto max-w-2xl text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                    Error 404
                </p>

                <h1 className="mt-4 text-4xl font-medium leading-[1.02] tracking-[-0.045em] text-foreground sm:text-5xl md:text-6xl">
                    Esta página no existe
                </h1>

                <p className="mx-auto mt-5 max-w-lg text-sm leading-[1.7] text-muted-foreground sm:text-base">
                    Es posible que el enlace haya cambiado, que la página ya
                    no esté disponible o que la dirección sea incorrecta.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="rounded-full"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="size-4" />
                        Volver
                    </Button>

                    <Button
                        asChild
                        size="lg"
                        className="rounded-full"
                    >
                        <Link to="/">
                            <Home className="size-4" />
                            Ir al inicio
                        </Link>
                    </Button>

                    <Button
                        asChild
                        variant="secondary"
                        size="lg"
                        className="rounded-full"
                    >
                        <Link to="/cursos">
                            <BookOpen className="size-4" />
                            Ver cursos
                        </Link>
                    </Button>
                </div>

                <div className="mt-12 text-[clamp(7rem,25vw,14rem)] font-semibold leading-none tracking-[-0.08em] text-muted/50">
                    404
                </div>
            </div>
        </main>
    );
}