import { lazy, Suspense, } from "react";

import type { ComponentType, LazyExoticComponent, ReactNode, } from "react";

import { createBrowserRouter, Navigate, Outlet, } from "react-router-dom";

import { Loading } from "@/components/common/app/Loading";
import { RouteErrorBoundary } from "@/components/common/app/Routeerrorboundary";
import { PermissionRoute } from "@/features/Auth/components/PermissionRoute";
import { PERMISSIONS } from "@/utils/constants";
import { PublicRouteFallback } from "@/components/common/app/PublicRouteFallback";
import RootLayout from "@/layouts/RootLayout";
import PublicLayout from "@/layouts/PublicLayout";

import HomePage from "@/pages/Home/Home";

const DashboardLayout = lazy(() => import("@/layouts/DashboardLayout"),);


const ProtectedRoute = lazy(() => import("@/components/Login/ProtectedRoute").then((module) => ({ default: module.ProtectedRoute, })),);

const CursoCatalogoPage = lazy(() => import("@/features/Home/Components/Cursos/CursosPageContent"),);

const CursoModulosPage = lazy(() => import("@/features/Home/Components/Cursos/CursoPageContent"),);

const ModuloDetallePublicPage = lazy(() => import("@/features/Home/Components/modulos/ModuloPageContent"),);

const VerificarCertificadoPage = lazy(() => import("@/pages/Certificados/VerificarCertificadoPage"),);

const PrivacyPage = lazy(() => import("@/pages/Privacy/PrivacyPolicyPage"),);

const NotFoundPage = lazy(() => import("@/pages/NotFound/NotFoundPage"),);

const ChangePassword = lazy(() => import("@/pages/Auth/ChangePassword").then((module) => ({ default: module.ChangePassword, })),);

const InicioPage = lazy(() => import("@/pages/Welcome/InicioPage"),);

const ProfilePage = lazy(() => import("@/pages/Profile/ProfilePage"),);

const UsuarioPage = lazy(() => import("@/pages/Usuario/UsuarioPage"),);

const UsuarioDetallePage = lazy(() => import("@/pages/Usuario/UsuarioDetallePage"),);

const CursosPage = lazy(() => import("@/pages/Curso/CursoPage"),);

const CursoDetallePage = lazy(() => import("@/pages/Curso/CursoDetallePage"),);

const MisCursosPage = lazy(() => import("@/pages/Curso/MisCursosPage"),);

const ModulosPage = lazy(() => import("@/pages/Modulo/ModuloPage"),);

const ModuloDetallePage = lazy(() => import("@/pages/Modulo/ModuloDetallePage"),);

const LeccionDetallePage = lazy(() => import("@/pages/Leccion/LeccionDetallePage"),);

const CrearInscripcionPage = lazy(() => import("@/pages/Inscripciones/CrearInscripcionPage").then((module) => ({ default: module.CrearInscripcionPage, })),);

const EditarInscripcionPage = lazy(() => import("@/pages/Inscripciones/EditarInscripcionPage"),);

const InscripcionesPage = lazy(() => import("@/pages/Inscripciones/InscripcionesPage").then((module) => ({ default: module.InscripcionesPage, })),);

const MisCertificados = lazy(() => import("@/pages/Certificados/MisCertificados"),);

const LeadsPage = lazy(() => import("@/pages/Lead/LeadPage"),);

const LeadDetailPage = lazy(() => import("@/pages/Lead/LeadDetailPage"),);

const LeadUserDetailPage = lazy(() => import("@/pages/Lead/LeadUserDetailPage"),);

const DescuentosPage = lazy(() => import("@/pages/Descuentos/DescuentosPage"),);

const VentasPage = lazy(() => import("@/pages/Ventas/VentasPage"),);

const publicLazyElement = (
    Component: LazyExoticComponent<ComponentType>,
) => (
    <Suspense
        fallback={<PublicRouteFallback />}
    >
        <Component />
    </Suspense>
);

const privateLazyElement = (
    Component: LazyExoticComponent<ComponentType>,
    fallback: ReactNode = <Loading />,
) => (
    <Suspense
        fallback={fallback}
    >
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

export const router =
    createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            errorElement: <RouteErrorBoundary />,
            children: [
                {
                    element: <PublicLayout />,
                    errorElement: <RouteErrorBoundary />,
                    children: [
                        {
                            index: true,
                            element: <HomePage />,
                        },
                        {
                            path: "cursos",
                            children: [
                                {
                                    index: true,
                                    element: publicLazyElement(CursoCatalogoPage,),
                                },

                                {
                                    path: ":cursoId",

                                    children: [
                                        {
                                            index: true,
                                            element: publicLazyElement(CursoModulosPage,),
                                        },

                                        {
                                            path: "modulos/:moduloId",
                                            element: publicLazyElement(ModuloDetallePublicPage,),
                                        },
                                    ],
                                },
                            ],
                        },

                        {
                            path: "politica-de-privacidad",
                            element: publicLazyElement(PrivacyPage,),
                        },

                        {
                            path: "*",
                            element: publicLazyElement(NotFoundPage,),
                        },
                    ],
                },

                {
                    path: "verificar/:codigo",

                    element: publicLazyElement(VerificarCertificadoPage,),
                },
                {
                    path: "panel",
                    element: privateLazyElement(ProtectedRoute,),
                    errorElement: <RouteErrorBoundary />,

                    children: [
                        {
                            path: "cambiar-password",
                            element: privateLazyElement(ChangePassword,),
                        },

                        {
                            element: privateLazyElement(DashboardLayout,),
                            errorElement: <RouteErrorBoundary />,

                            children: [
                                {
                                    index: true,
                                    element: (
                                        <Navigate to="inicio" replace />
                                    ),
                                },
                                {
                                    path: "inicio",
                                    element: privateLazyElement(InicioPage,),
                                },

                                {
                                    path: "perfil",
                                    element: privateLazyElement(ProfilePage,),
                                },

                                {
                                    path: "usuario",
                                    element: withPermission(PERMISSIONS.USUARIOS.VER, <Outlet />, "No tienes permisos para ver los usuarios",),

                                    children: [
                                        {
                                            index: true,
                                            element: privateLazyElement(UsuarioPage,),
                                        },
                                        {
                                            path: ":id",
                                            element: privateLazyElement(UsuarioDetallePage,),
                                        },
                                    ],
                                },

                                {
                                    path: "cursos",
                                    children: [
                                        {
                                            index: true,
                                            element: withPermission(PERMISSIONS.CURSOS.VER, privateLazyElement(CursosPage,), "No tienes permisos para ver los cursos",),
                                        },

                                        {
                                            path: "mis-cursos",
                                            element: privateLazyElement(MisCursosPage,),
                                        },

                                        {
                                            path: ":id",
                                            children: [
                                                {
                                                    index: true,
                                                    element: privateLazyElement(CursoDetallePage,),
                                                },

                                                {
                                                    path: "modulos",
                                                    children: [
                                                        {
                                                            index: true,
                                                            element: withPermission(PERMISSIONS.MODULOS.VER, privateLazyElement(ModulosPage,), "No tienes permisos para ver los módulos",),
                                                        },

                                                        {
                                                            path: ":moduloId",

                                                            children: [
                                                                {
                                                                    index: true,
                                                                    element: privateLazyElement(ModuloDetallePage,),
                                                                },

                                                                {
                                                                    path: "lecciones/:leccionId",
                                                                    element: privateLazyElement(LeccionDetallePage,),
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
                                    element: privateLazyElement(MisCursosPage,),
                                },

                                {
                                    path: "inscripciones",
                                    children: [
                                        {
                                            index: true,
                                            element: withPermission(PERMISSIONS.INSCRIPCIONES.VER, privateLazyElement(InscripcionesPage,), "No tienes permisos para ver las inscripciones",),
                                        },

                                        {
                                            path: "crear",
                                            element: withPermission(PERMISSIONS.INSCRIPCIONES.CREAR, privateLazyElement(CrearInscripcionPage,), "No tienes permisos para crear inscripciones",),
                                        },

                                        {
                                            path: "estudiante/:estudianteId",
                                            element: withPermission(PERMISSIONS.INSCRIPCIONES.EDITAR, privateLazyElement(EditarInscripcionPage,), "No tienes permisos para editar inscripciones",),
                                        },
                                    ],
                                },

                                {
                                    path: "certificados",
                                    element: privateLazyElement(MisCertificados,),
                                },
                                {
                                    path: "ventas",
                                    element: withPermission(PERMISSIONS.VENTAS.VER, privateLazyElement(VentasPage,), "No tienes permisos para ver las ventas",),
                                },
                                {
                                    path: "descuentos",
                                    element: withPermission(PERMISSIONS.DESCUENTOS.VER, privateLazyElement(DescuentosPage,), "No tienes permisos para ver los descuentos",),
                                },
                                {
                                    path: "leads",
                                    element: withPermission(PERMISSIONS.LEADS.VER, <Outlet />, "No tienes permisos para ver los leads",),

                                    children: [
                                        {
                                            index: true,
                                            element: privateLazyElement(LeadsPage,),
                                        },

                                        {
                                            path: "usuario/:usuarioId",
                                            element: privateLazyElement(LeadUserDetailPage,),
                                        },

                                        {
                                            path: ":leadId",
                                            element: privateLazyElement(LeadDetailPage,),
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