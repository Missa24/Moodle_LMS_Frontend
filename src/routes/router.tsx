import { lazy, Suspense } from "react";
import type { ComponentType, LazyExoticComponent, ReactNode } from "react";

import {
    createBrowserRouter,
    Navigate,
    Outlet,
} from "react-router-dom";

import { Loading } from "@/components/common/app/Loading";
import { RouteErrorBoundary } from "@/components/common/app/Routeerrorboundary";
import { PermissionRoute } from "@/features/Auth/components/PermissionRoute";
import { PERMISSIONS } from "@/utils/constants";

const RootLayout = lazy(() => import("@/layouts/RootLayout"));
const PublicLayout = lazy(() => import("@/layouts/PublicLayout"));
const DashboardLayout = lazy(() => import("@/layouts/DashboardLayout"));

const ProtectedRoute = lazy(() =>
    import("@/components/Login/ProtectedRoute").then((module) => ({
        default: module.ProtectedRoute,
    })),
);

const HomePage = lazy(() => import("@/pages/Home/Home"));
const CursoCatalogoPage = lazy(() => import("@/features/Home/Components/Cursos/CursosPageContent"));
const CursoModulosPage = lazy(() => import("@/features/Home/Components/Cursos/CursoPageContent"));
const ModuloDetallePublicPage = lazy(() => import("@/features/Home/Components/modulos/ModuloPageContent"));

const ChangePassword = lazy(() =>
    import("@/pages/Auth/ChangePassword").then((module) => ({
        default: module.ChangePassword,
    })),
);

const InicioPage = lazy(() => import("@/pages/Welcome/InicioPage"));
const ProfilePage = lazy(() => import("@/pages/Profile/ProfilePage"));

const UsuarioPage = lazy(() => import("@/pages/Usuario/UsuarioPage"));
const UsuarioDetallePage = lazy(() => import("@/pages/Usuario/UsuarioDetallePage"));

const CursosPage = lazy(() => import("@/pages/Curso/CursoPage"));
const CursoDetallePage = lazy(() => import("@/pages/Curso/CursoDetallePage"));
const MisCursosPage = lazy(() => import("@/pages/Curso/MisCursosPage"));

const ModulosPage = lazy(() => import("@/pages/Modulo/ModuloPage"));
const ModuloDetallePage = lazy(() => import("@/pages/Modulo/ModuloDetallePage"));

const LeccionDetallePage = lazy(() => import("@/pages/Leccion/LeccionDetallePage"));

const CrearInscripcionPage = lazy(() =>
    import("@/pages/Inscripciones/CrearInscripcionPage").then((module) => ({
        default: module.CrearInscripcionPage,
    })),
);

const EditarInscripcionPage = lazy(() => import("@/pages/Inscripciones/EditarInscripcionPage"));

const InscripcionesPage = lazy(() =>
    import("@/pages/Inscripciones/InscripcionesPage").then((module) => ({
        default: module.InscripcionesPage,
    })),
);

const VerificarCertificadoPage = lazy(() => import("@/pages/Certificados/VerificarCertificadoPage"));
const MisCertificados = lazy(() => import("@/pages/Certificados/MisCertificados"));

const SupportPage = lazy(() => import("@/pages/Support/SupportPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFound/NotFoundPage"));

const LeadsPage = lazy(() => import("@/pages/Lead/LeadPage"));
const LeadDetailPage = lazy(() => import("@/pages/Lead/LeadDetailPage"));
const LeadUserDetailPage = lazy(() => import("@/pages/Lead/LeadUserDetailPage"));

const PrivacyPage = lazy(() => import("@/pages/Privacy/PrivacyPolicyPage"));


const lazyElement = (
    Component: LazyExoticComponent<ComponentType>,
    fallback: ReactNode = <Loading />,
) => (
    <Suspense fallback={fallback}>
        <Component />
    </Suspense>
);

const withPermission = (
    permission: string,
    element: ReactNode,
    message?: string,
) => (
    <PermissionRoute
        permission={permission}
        message={message}
    >
        {element}
    </PermissionRoute>
);

export const router = createBrowserRouter([
    {
        path: "/",
        element: lazyElement(RootLayout),
        errorElement: <RouteErrorBoundary />,
        children: [
            {
                element: lazyElement(PublicLayout),
                errorElement: <RouteErrorBoundary />,
                children: [
                    {
                        index: true,
                        element: lazyElement(HomePage),
                    },
                    {
                        path: "cursos",
                        children: [
                            {
                                index: true,
                                element: lazyElement(CursoCatalogoPage),
                            },
                            {
                                path: ":cursoId",
                                children: [
                                    {
                                        index: true,
                                        element: lazyElement(CursoModulosPage),
                                    },
                                    {
                                        path: "modulos/:moduloId",
                                        element: lazyElement(ModuloDetallePublicPage),
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        path: "verificar/:codigo",
                        element: lazyElement(VerificarCertificadoPage),
                    },
                    {
                        path: "politica-de-privacidad",
                        element: lazyElement(PrivacyPage),
                    },
                    {
                        path: "*",
                        element: lazyElement(NotFoundPage),
                    },
                ],
            },

            {
                path: "panel",
                element: lazyElement(ProtectedRoute),
                errorElement: <RouteErrorBoundary />,
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
                                index: true,
                                element: <Navigate to="inicio" replace />,
                            },

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
                                element: withPermission(
                                    PERMISSIONS.USUARIOS.VER,
                                    <Outlet />,
                                    "No tienes permisos para ver los usuarios",
                                ),
                                children: [
                                    {
                                        index: true,
                                        element: lazyElement(UsuarioPage),
                                    },
                                    {
                                        path: ":id",
                                        element: lazyElement(UsuarioDetallePage),
                                    },
                                ],
                            },

                            {
                                path: "cursos",
                                children: [
                                    {
                                        index: true,
                                        element: withPermission(
                                            PERMISSIONS.CURSOS.VER,
                                            lazyElement(CursosPage),
                                            "No tienes permisos para ver los cursos",
                                        ),
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
                                                element: lazyElement(CursoDetallePage),
                                            },

                                            {
                                                path: "modulos",
                                                children: [
                                                    {
                                                        index: true,
                                                        element: withPermission(
                                                            PERMISSIONS.MODULOS.VER,
                                                            lazyElement(ModulosPage),
                                                            "No tienes permisos para ver los módulos",
                                                        ),
                                                    },

                                                    {
                                                        path: ":moduloId",
                                                        children: [
                                                            {
                                                                index: true,
                                                                element: lazyElement(ModuloDetallePage),
                                                            },

                                                            {
                                                                path: "lecciones/:leccionId",
                                                                element: lazyElement(LeccionDetallePage),
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
                                        element: withPermission(
                                            PERMISSIONS.INSCRIPCIONES.VER,
                                            lazyElement(InscripcionesPage),
                                            "No tienes permisos para ver las inscripciones",
                                        ),
                                    },

                                    {
                                        path: "crear",
                                        element: withPermission(
                                            PERMISSIONS.INSCRIPCIONES.CREAR,
                                            lazyElement(CrearInscripcionPage),
                                            "No tienes permisos para crear inscripciones",
                                        ),
                                    },

                                    {
                                        path: "estudiante/:estudianteId",
                                        element: withPermission(
                                            PERMISSIONS.INSCRIPCIONES.EDITAR,
                                            lazyElement(EditarInscripcionPage),
                                            "No tienes permisos para editar inscripciones",
                                        ),
                                    },
                                ],
                            },

                            {
                                path: "certificados",
                                element: lazyElement(MisCertificados),
                            },

                            {
                                path: "soporte",
                                element: lazyElement(SupportPage),
                            },

                            {
                                path: "leads",
                                element: withPermission(
                                    PERMISSIONS.LEADS.VER,
                                    <Outlet />,
                                    "No tienes permisos para ver los leads",
                                ),
                                children: [
                                    {
                                        index: true,
                                        element: lazyElement(LeadsPage),
                                    },

                                    {
                                        path: "usuario/:usuarioId",
                                        element: lazyElement(LeadUserDetailPage),
                                    },

                                    {
                                        path: ":leadId",
                                        element: lazyElement(LeadDetailPage),
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);