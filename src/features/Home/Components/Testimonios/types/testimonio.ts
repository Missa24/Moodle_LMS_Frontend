export type TestimonioMedia =
    | {
        tipo: "imagen";
        src: string;
        alt: string;
    }
    | {
        tipo: "video";
        src: string;
        poster?: string;
    };

export type Testimonio = {
    id: string;
    nombre: string;
    pais?: string;
    profesion?: string;
    testimonio: string;
    aprendio?: string;
    resultado?: string;
    media?: TestimonioMedia;
};