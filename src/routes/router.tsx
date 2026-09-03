import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { RouteErrorBoundary } from "@/components/common/app/Routeerrorboundary";

const RootLayout = lazy(() => import("@/layouts/RootLayout"));
const DashboardLayout = lazy(() => import("@/layouts/DashboardLayout"));

const ProtectedRoute = lazy(() =>
    import("@/components/Login/ProtectedRoute").then((module) => ({
        default: module.ProtectedRoute,
    }))
);

const AuthPage = lazy(() =>
    import("@/pages/Auth/AuthPage").then((module) => ({
        default: module.AuthPage,
    }))
);

const ChangePassword = lazy(() =>
    import("@/pages/Auth/ChangePassword").then((module) => ({
        default: module.ChangePassword,
    }))
);

const InicioPage = lazy(() => import("@/pages/Welcome/InicioPage"));
const ProfilePage = lazy(() => import("@/pages/Profile/ProfilePage"));

const UsuarioPage = lazy(() => import("@/pages/Usuario/UsuarioPage"));
const UsuarioDetallePage = lazy(() =>
    import("@/pages/Usuario/UsuarioDetallePage")
);

const CursosPage = lazy(() => import("@/pages/Curso/CursoPage"));
const CursoDetallePage = lazy(() =>
    import("@/pages/Curso/CursoDetallePage")
);
const MisCursosPage = lazy(() =>
    import("@/pages/Curso/MisCursosPage")
);

const ModulosPage = lazy(() => import("@/pages/Modulo/ModuloPage"));
const ModuloDetallePage = lazy(() =>
    import("@/pages/Modulo/ModuloDetallePage")
);

const LeccionDetallePage = lazy(() =>
    import("@/pages/Leccion/LeccionDetallePage")
);

const CrearInscripcionPage = lazy(() =>
    import("@/pages/Inscripciones/CrearInscripcionPage").then((module) => ({
        default: module.CrearInscripcionPage,
    }))
);

const EditarInscripcionPage = lazy(
    () => import("@/pages/Inscripciones/EditarInscripcionPage")
);

const VerificarCertificadoPage = lazy(
    () => import("@/pages/Certificados/VerificarCertificadoPage")
);

const InscripcionesPage = lazy(() =>
    import("@/pages/Inscripciones/InscripcionesPage").then((module) => ({
        default: module.InscripcionesPage,
    }))
);

const MisCertificados = lazy(
    () => import("@/pages/Certificados/MisCertificados")
);

import { Loading } from "@/components/common/app/Loading";

const lazyElement = (
    Component: React.LazyExoticComponent<React.ComponentType>
) => (
    <Suspense fallback={<Loading />}>
        <Component />
    </Suspense>
);

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback={<Loading />}>
                <RootLayout />
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/login" replace />,
            },
            {
                path: "login",
                element: lazyElement(AuthPage),
            },
            {
                path: "verificar/:codigo",
                element: lazyElement(VerificarCertificadoPage),
            },
            {
                element: lazyElement(ProtectedRoute),
                children: [
                    {
                        path: "cambiar-password",
                        element: lazyElement(ChangePassword),
                    },
                    {
                        element: lazyElement(DashboardLayout),
                        errorElement: <RouteErrorBoundary />,
                        children: [
                            {
                                path: "inicio",
                                element: lazyElement(InicioPage),
                            },
                            {
                                path: "perfil",
                                element: lazyElement(ProfilePage),
                            },

                            {
                                path: "usuario",
                                children: [
                                    {
                                        index: true,
                                        element: lazyElement(UsuarioPage),
                                    },
                                    {
                                        path: ":id",
                                        element: lazyElement(
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
                                        element: lazyElement(CursosPage),
                                    },

                                    {
                                        path: "mis-cursos",
                                        element: lazyElement(MisCursosPage),
                                    },

                                    {
                                        path: ":id",
                                        children: [
                                            {
                                                index: true,
                                                element: lazyElement(
                                                    CursoDetallePage
                                                ),
                                            },
                                            {
                                                path: "modulos",
                                                children: [
                                                    {
                                                        index: true,
                                                        element: lazyElement(
                                                            ModulosPage
                                                        ),
                                                    },
                                                    {
                                                        path: ":moduloId",
                                                        children: [
                                                            {
                                                                index: true,
                                                                element: lazyElement(
                                                                    ModuloDetallePage
                                                                ),
                                                            },
                                                            {
                                                                path: "lecciones/:leccionId",
                                                                element: lazyElement(
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
                                element: lazyElement(MisCursosPage),
                            },

                            {
                                path: "inscripciones",
                                children: [
                                    {
                                        index: true,
                                        element: lazyElement(
                                            InscripcionesPage
                                        ),
                                    },
                                    {
                                        path: "crear",
                                        element: lazyElement(
                                            CrearInscripcionPage
                                        ),
                                    },
                                    {
                                        path: "estudiante/:estudianteId",
                                        element: lazyElement(
                                            EditarInscripcionPage
                                        ),
                                    },
                                ],
                            },
                            {
                                path: "certificados",
                                element: lazyElement(MisCertificados),
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);
