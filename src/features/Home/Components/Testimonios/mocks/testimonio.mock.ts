import { Testimonio } from "../types/testimonio";

export const TESTIMONIOS: Testimonio[] = [
    {
        id: "1",
        nombre: "María Fernanda",
        pais: "BO",
        profesion: "Estudiante de Cosmetología",
        testimonio:
            "La plataforma me permitió organizar mejor mis clases y continuar aprendiendo incluso cuando no podía asistir presencialmente.",
        aprendio: "Cosmetología y Cosmiatría",
        resultado: "Fortaleció su formación profesional",
        media: {
            tipo: "video",
            src: "/testimonios/maria.mp4",
            poster: "/testimonios/maria-poster.webp",
        },
    },
    {
        id: "2",
        nombre: "Andrea López",
        pais: "BO",
        profesion: "Esteticista",
        testimonio:
            "Encontrar los módulos, continuar mis cursos y revisar mis avances es muy sencillo. Todo está organizado en un solo lugar.",
        aprendio: "Estética Facial",
        resultado: "Mejoró sus conocimientos profesionales",
        media: {
            tipo: "imagen",
            src: "/testimonios/andrea.webp",
            alt: "Andrea, estudiante de Elite Academy",
        },
    },
    {
        id: "3",
        nombre: "Carla Mendoza",
        pais: "BO",
        profesion: "Profesional independiente",
        testimonio:
            "Poder acceder a mis certificados directamente desde la plataforma hace que todo el proceso académico sea mucho más cómodo.",
        resultado: "Completó satisfactoriamente su formación",
    },
    {
        id: "4",
        nombre: "Valeria Rojas",
        pais: "BO",
        profesion: "Cosmetóloga",
        testimonio:
            "Me gustó poder avanzar paso a paso y tener mis contenidos disponibles cuando los necesitaba.",
        aprendio: "Dermatocosmiatría",
        resultado: "Amplió sus conocimientos en estética",
        media: {
            tipo: "imagen",
            src: "/testimonios/valeria.webp",
            alt: "Valeria, alumna de Elite Academy",
        },
    },
    {
        id: "5",
        nombre: "Daniela Flores",
        pais: "BO",
        profesion: "Maquilladora profesional",
        testimonio:
            "La experiencia es clara y práctica. Puedo revisar mis cursos y continuar aprendiendo desde mi celular.",
        aprendio: "Maquillaje Profesional",
        resultado: "Impulsó su desarrollo profesional",
        media: {
            tipo: "video",
            src: "/testimonios/daniela.mp4",
            poster: "/testimonios/daniela-poster.webp",
        },
    },
];