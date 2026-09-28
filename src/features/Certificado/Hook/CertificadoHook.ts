import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    descargarCertificado,
    emitirCertificadoCurso,
    emitirCertificadoModulo,
    MisCertificados,
    verificarCertificado,
} from "../Service/CerticadoService";

export function useMisCertificados() {
    return useQuery({
        queryKey: ["certificados", "mis-certificados"],
        queryFn: MisCertificados,
    });
}

export function useDescargarCertificado() {
    return useMutation({
        mutationFn: descargarCertificado,

        onSuccess: (blob) => {
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "certificado.pdf";

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        },
    });
}

export function useVerificarCertificado(
    codigo: string | undefined,
) {
    return useQuery({
        queryKey: ["certificados", "verificar", codigo],

        queryFn: () => verificarCertificado(codigo!),

        enabled: Boolean(codigo),

        retry: false,
    });
}

export function useEmitirCertificadoModulo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            inscripcionId,
            nombreCertificado,
        }: {
            inscripcionId: string;
            nombreCertificado: string;
        }) =>
            emitirCertificadoModulo(
                inscripcionId,
                nombreCertificado,
            ),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["certificados", "mis-certificados"],
            });
        },
    });
}

export function useEmitirCertificadoCurso() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            cursoId,
            nombreCertificado,
        }: {
            cursoId: string;
            nombreCertificado: string;
        }) =>
            emitirCertificadoCurso(
                cursoId,
                nombreCertificado,
            ),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["certificados", "mis-certificados"],
            });
        },
    });
}