import { lazy, Suspense } from "react";
import {
    createBrowserRouter,
    Navigate,
} from "react-router-dom";

import { Loading } from "@/components/common/app/Loading";
import { RouteErrorBoundary } from "@/components/common/app/Routeerrorboundary";

const RootLayout = lazy(
    () => import("@/layouts/RootLayout")
);

const PublicLayout = lazy(
    () => import("@/layouts/PublicLayout")
);

const DashboardLayout = lazy(
    () => import("@/layouts/DashboardLayout")
);

const ProtectedRoute = lazy(() =>
    import(
        "@/components/Login/ProtectedRoute"
    ).then((module) => ({
        default: module.ProtectedRoute,
    }))
);

const HomePage = lazy(
    () => import("@/pages/Home/Home")
);

const CursoCatalogoPage = lazy(
    () =>
        import(
            "@/features/Home/Components/Cursos/CursosPageContent"
        )
);

const CursoModulosPage = lazy(
    () =>
        import(
            "@/features/Home/Components/Cursos/CursoPageContent"
        )
);

const ModuloDetallePublicPage = lazy(
    () =>
        import(
            "@/features/Home/Components/modulos/ModuloPageContent"
        )
);

const ChangePassword = lazy(() =>
    import(
        "@/pages/Auth/ChangePassword"
    ).then((module) => ({
        default: module.ChangePassword,
    }))
);

const InicioPage = lazy(
    () => import("@/pages/Welcome/InicioPage")
);

const ProfilePage = lazy(
    () => import("@/pages/Profile/ProfilePage")
);

const UsuarioPage = lazy(
    () => import("@/pages/Usuario/UsuarioPage")
);

const UsuarioDetallePage = lazy(
    () =>
        import(
            "@/pages/Usuario/UsuarioDetallePage"
        )
);

const CursosPage = lazy(
    () => import("@/pages/Curso/CursoPage")
);

const CursoDetallePage = lazy(
    () =>
        import(
            "@/pages/Curso/CursoDetallePage"
        )
);

const MisCursosPage = lazy(
    () =>
        import(
            "@/pages/Curso/MisCursosPage"
        )
);

const ModulosPage = lazy(
    () => import("@/pages/Modulo/ModuloPage")
);

const ModuloDetallePage = lazy(
    () =>
        import(
            "@/pages/Modulo/ModuloDetallePage"
        )
);

const LeccionDetallePage = lazy(
    () =>
        import(
            "@/pages/Leccion/LeccionDetallePage"
        )
);

const CrearInscripcionPage = lazy(() =>
    import(
        "@/pages/Inscripciones/CrearInscripcionPage"
    ).then((module) => ({
        default: module.CrearInscripcionPage,
    }))
);

const EditarInscripcionPage = lazy(
    () =>
        import(
            "@/pages/Inscripciones/EditarInscripcionPage"
        )
);

const VerificarCertificadoPage = lazy(
    () =>
        import(
            "@/pages/Certificados/VerificarCertificadoPage"
        )
);

const InscripcionesPage = lazy(() =>
    import(
        "@/pages/Inscripciones/InscripcionesPage"
    ).then((module) => ({
        default: module.InscripcionesPage,
    }))
);

const MisCertificados = lazy(
    () =>
        import(
            "@/pages/Certificados/MisCertificados"
        )
);

const NotFoundPage = lazy(
    () => import("@/pages/NotFound/NotFoundPage")
);

const lazyElement = (
    Component: React.LazyExoticComponent<
        React.ComponentType
    >
) => (
    <Suspense fallback={<Loading />}>
        <Component />
    </Suspense>
);

export const router =
    createBrowserRouter([
        {
            path: "/",
            element: lazyElement(
                RootLayout
            ),
            children: [
                {
                    element: lazyElement(
                        PublicLayout
                    ),
                    children: [
                        {
                            index: true,
                            element:
                                lazyElement(
                                    HomePage
                                ),
                        },
                        {
                            path: "cursos",
                            children: [
                                {
                                    index: true,
                                    element:
                                        lazyElement(
                                            CursoCatalogoPage
                                        ),
                                },
                                {
                                    path: ":cursoId",
                                    children: [
                                        {
                                            index: true,
                                            element:
                                                lazyElement(
                                                    CursoModulosPage
                                                ),
                                        },
                                        {
                                            path: "modulos/:moduloId",
                                            element:
                                                lazyElement(
                                                    ModuloDetallePublicPage
                                                ),
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            path: "verificar/:codigo",
                            element:
                                lazyElement(
                                    VerificarCertificadoPage
                                ),
                        },
                        {
                            path: "*",
                            element: lazyElement(
                                NotFoundPage
                            ),
                        },
                    ],
                },

                {
                    path: "panel",
                    element:
                        lazyElement(
                            ProtectedRoute
                        ),
                    children: [
                        {
                            path: "cambiar-password",
                            element:
                                lazyElement(
                                    ChangePassword
                                ),
                        },
                        {
                            element:
                                lazyElement(
                                    DashboardLayout
                                ),
                            errorElement: (
                                <RouteErrorBoundary />
                            ),
                            children: [
                                {
                                    index: true,
                                    element: (
                                        <Navigate
                                            to="inicio"
                                            replace
                                        />
                                    ),
                                },
                                {
                                    path: "inicio",
                                    element:
                                        lazyElement(
                                            InicioPage
                                        ),
                                },
                                {
                                    path: "perfil",
                                    element:
                                        lazyElement(
                                            ProfilePage
                                        ),
                                },

                                {
                                    path: "usuario",
                                    children: [
                                        {
                                            index: true,
                                            element:
                                                lazyElement(
                                                    UsuarioPage
                                                ),
                                        },
                                        {
                                            path: ":id",
                                            element:
                                                lazyElement(
                                                    UsuarioDetallePage
                                                ),
                                        },
                                    ],
                                },

                                {
                                    path: "cursos",
                                    children: [
                                        {
                                            index: true,
                                            element:
                                                lazyElement(
                                                    CursosPage
                                                ),
                                        },
                                        {
                                            path: "mis-cursos",
                                            element:
                                                lazyElement(
                                                    MisCursosPage
                                                ),
                                        },
                                        {
                                            path: ":id",
                                            children: [
                                                {
                                                    index: true,
                                                    element:
                                                        lazyElement(
                                                            CursoDetallePage
                                                        ),
                                                },
                                                {
                                                    path: "modulos",
                                                    children: [
                                                        {
                                                            index: true,
                                                            element:
                                                                lazyElement(
                                                                    ModulosPage
                                                                ),
                                                        },
                                                        {
                                                            path: ":moduloId",
                                                            children: [
                                                                {
                                                                    index: true,
                                                                    element:
                                                                        lazyElement(
                                                                            ModuloDetallePage
                                                                        ),
                                                                },
                                                                {
                                                                    path: "lecciones/:leccionId",
                                                                    element:
                                                                        lazyElement(
                                                                            LeccionDetallePage
                                                                        ),
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },

                                {
                                    path: "mis-cursos",
                                    element:
                                        lazyElement(
                                            MisCursosPage
                                        ),
                                },

                                {
                                    path: "inscripciones",
                                    children: [
                                        {
                                            index: true,
                                            element:
                                                lazyElement(
                                                    InscripcionesPage
                                                ),
                                        },
                                        {
                                            path: "crear",
                                            element:
                                                lazyElement(
                                                    CrearInscripcionPage
                                                ),
                                        },
                                        {
                                            path: "estudiante/:estudianteId",
                                            element:
                                                lazyElement(
                                                    EditarInscripcionPage
                                                ),
                                        },
                                    ],
                                },

                                {
                                    path: "certificados",
                                    element:
                                        lazyElement(
                                            MisCertificados
                                        ),
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ]);