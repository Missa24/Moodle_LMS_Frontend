import { Testimonio } from "../types/testimonio";

export const TESTIMONIOS: Testimonio[] = [
    {
        id: "1",
        nombre: "María Fernanda",
        pais: "BO",
        profesion: "Estudiante de Cosmetología",
        testimonio:
            "Ha sido una experiencia muy agradable. He aprendido bastante y los docentes son muy pacientes y explican los temas de forma clara.",
        aprendio: "Cosmetología y Cosmiatría",
        resultado: "Fortaleció su formación profesional",
        media: {
            tipo: "video",
            src: "/testimonios/primero.webm",
            poster: "/testimonios/primero.webp",
        },
    },
    {
        id: "2",
        nombre: "Andrea López",
        pais: "BO",
        profesion: "Esteticista",
        testimonio:
            "Elegir esta academia ha sido una excelente experiencia. Además de aprender, he podido compartir con otros compañeros, vivir nuevas experiencias y crecer tanto a nivel académico como personal.",
        aprendio: "Estética Facial",
        resultado: "Mejoró sus conocimientos profesionales",
    },
    {
        id: "3",
        nombre: "Valeria Rojas",
        pais: "BO",
        profesion: "Cosmetóloga",
        testimonio:
            "Estoy muy agradecido por haber formado parte de la Academia Élite. Destaco mucho el profesionalismo de los docentes, quienes nos enseñan con paciencia y dedicación, compartiendo sus conocimientos y brindándonos el apoyo necesario para alcanzar nuestros sueños.",
        aprendio: "Dermatocosmiatría",
        resultado: "Amplió sus conocimientos en estética",
        media: {
            tipo: "video",
            src: "/testimonios/tercero.webm",
            poster: "/testimonios/tercero.webp",
        },
    },
    {
        id: "4",
        nombre: "Daniela Flores",
        pais: "BO",
        profesion: "Maquilladora profesional",
        testimonio:
            "Ha sido una experiencia muy bonita. Hemos aprendido mucho y disfrutado cada etapa del aprendizaje. Sin duda, invitamos a otras personas a animarse y formar parte de la Academia Élite.",
        aprendio: "Maquillaje Profesional",
        resultado: "Impulsó su desarrollo profesional",
    },
];