import { PERMISSIONS } from "@/utils/constants";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import {
    faHouse,
    faUserGroup,
    faBookOpen,
    faGraduationCap,
    faClipboardList,
    faAward,
    faHeadset,
    faUserPlus,
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
        icon: faUserGroup,
        url: "/panel/usuario",
        permission: PERMISSIONS.USUARIOS.VER,
    },
    {
        title: "Cursos",
        icon: faBookOpen,
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
        icon: faClipboardList,
        url: "/panel/inscripciones",
        permission: PERMISSIONS.INSCRIPCIONES.VER,
    },
    {
        title: "Mis certificados",
        icon: faAward,
        url: "/panel/certificados",
    },
    {
        title: "Soporte",
        icon: faHeadset,
        url: "/panel/soporte",
    },
    {
        title: "Leads",
        icon: faUserPlus,
        url: "/panel/leads",
        permission: PERMISSIONS.LEADS.VER,
    },
];
