import { ModeToggle } from "@/components/ModeToggle";
import { AppTitle } from "@/components/common/Apptittle";
import { ResetFormPass } from "@/features/Auth/components/ResetPassForm";

export function ChangePassword() {
    return (
        <div className="relative h-dvh overflow-hidden bg-sidebar">
            <div className="absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.04] blur-3xl" />
            <div className="relative z-10 flex h-dvh flex-col">
                <header className="flex shrink-0 items-center justify-between px-5 py-4 sm:px-8 sm:py-5 lg:px-12">
                    <AppTitle
                        title="Elaces Latam"
                        subtitle="Learning Management System"
                    />

                    <ModeToggle />
                </header>

                <main className="flex min-h-0 flex-1 items-center px-5 py-4 sm:px-8 sm:py-5 lg:px-12">
                    <div className="mx-auto grid w-full max-w-5xl items-center gap-8 lg:grid-cols-[1fr_420px] lg:gap-16">

                        <section className="hidden lg:block">
                            <div className="max-w-lg">
                                <div className="mb-5 h-1 w-12 rounded-full bg-primary" />

                                <h1 className="text-4xl font-bold leading-tight tracking-tight text-sidebar-foreground xl:text-5xl">
                                    Protege tu cuenta.
                                    <br />
                                    <span className="text-primary">
                                        Sigue aprendiendo.
                                    </span>
                                </h1>

                                <p className="mt-4 max-w-md text-sm leading-6 text-sidebar-foreground/60">
                                    Tu contraseña temporal debe actualizarse
                                    antes de continuar. Elige una contraseña
                                    segura que puedas recordar fácilmente.
                                </p>

                                <div className="mt-5 flex justify-center lg:justify-start">
                                    <img
                                        src="/password_change.png"
                                        alt="Seguridad de la cuenta"
                                        className="h-auto w-60 object-contain drop-shadow-xl xl:w-72"
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="w-full">
                            <div>
                                <div className="mb-5">
                                    <h2 className="text-2xl font-bold tracking-tight text-sidebar-foreground">
                                        Actualiza tu contraseña
                                    </h2>

                                    <p className="mt-1.5 text-sm leading-5 text-sidebar-foreground/60">
                                        Por seguridad, debes cambiar tu
                                        contraseña temporal antes de continuar.
                                    </p>
                                </div>

                                <ResetFormPass />
                            </div>
                        </section>
                    </div>
                </main>

                <footer className="shrink-0 px-5 pb-4 sm:px-8 sm:pb-5 lg:px-12">
                    <p className="text-xs text-sidebar-foreground/35">
                        © {new Date().getFullYear()} Elaces Latam
                    </p>
                </footer>
            </div>
        </div>
    );
}
