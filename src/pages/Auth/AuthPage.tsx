import { ModeToggle } from "@/components/ModeToggle";
import { AppTitle } from "@/components/common/Apptittle";
import { LoginForm } from "@/features/Auth/components/FormLogin";

export const AuthPage = () => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-sidebar">
            <div className="absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-primary/10 blur-3xl" />

            <div className="absolute -bottom-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-primary/10 blur-3xl" />

            <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.04] blur-3xl" />

            <div className="relative z-10 flex min-h-screen flex-col">
                <header className="flex items-center justify-between px-6 py-6 sm:px-10 lg:px-14">
                    <AppTitle
                        title="Elaces Latam"
                        subtitle="Learning Management System"
                    />

                    <ModeToggle />
                </header>

                <main className="flex flex-1 items-center px-6 pb-12 pt-6 sm:px-10 lg:px-14">
                    <div className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1fr_420px] lg:gap-24">
                        <section className="hidden max-w-xl lg:block">
                            <div className="mb-7 h-1 w-12 rounded-full bg-primary" />

                            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-sidebar-foreground xl:text-6xl">
                                Aprende.
                                <br />
                                Crece.
                                <br />
                                <span className="text-primary">
                                    Destaca.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-md text-base leading-7 text-sidebar-foreground/60">
                                Una plataforma diseñada para gestionar tu
                                aprendizaje y llevar tus conocimientos al
                                siguiente nivel.
                            </p>

                            <div className="mt-10 flex items-center gap-3">
                                <div className="h-px w-10 bg-sidebar-border" />

                                <span className="text-xs font-medium tracking-widest text-sidebar-foreground/40 uppercase">
                                    Tu aprendizaje, a otro nivel
                                </span>
                            </div>
                        </section>

                        <section className="w-full">
                            <div className="mb-8 lg:hidden">
                                <h2 className="text-2xl font-bold tracking-tight text-sidebar-foreground">
                                    Bienvenido de nuevo
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-sidebar-foreground/60">
                                    Ingresa tus credenciales para continuar.
                                </p>
                            </div>

                            <LoginForm />
                        </section>

                    </div>
                </main>

                <footer className="px-6 pb-6 sm:px-10 lg:px-14">
                    <p className="text-xs text-sidebar-foreground/35">
                        © {new Date().getFullYear()} Elaces Latam
                    </p>
                </footer>
            </div>
        </div>
    );
};
