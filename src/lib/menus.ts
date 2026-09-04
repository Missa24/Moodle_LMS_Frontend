import { PERMISSIONS } from "@/utils/constants";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import {
    faHouse,
    faUsersGear,
    faBook,
    faGraduationCap,
    faIdBadge,
    faCertificate,
} from "@fortawesome/free-solid-svg-icons";

export interface MenuItem {
    title: string;
    icon: IconDefinition;
    url: string;
    permission?: string;
}

export const menuItems: MenuItem[] = [
    {
        title: "Inicio",
        icon: faHouse,
        url: "/panel/inicio",
    },
    {
        title: "Usuarios",
        icon: faUsersGear,
        url: "/panel/usuario",
        permission: PERMISSIONS.USUARIOS.VER,
    },
    {
        title: "Cursos",
        icon: faBook,
        url: "/panel/cursos",
        permission: PERMISSIONS.CURSOS.VER,
    },
    {
        title: "Mis cursos",
        icon: faGraduationCap,
        url: "/panel/cursos/mis-cursos",
        permission: PERMISSIONS.CURSOS.VER,
    },
    {
        title: "Inscripciones",
        icon: faIdBadge,
        url: "/panel/inscripciones",
        permission: PERMISSIONS.INSCRIPCIONES.VER,
    },
    {
        title: "Mis certificados",
        icon: faCertificate,
        url: "/panel/certificados",
    },
];