import { apiService } from "@/api/api";
import {
    Certificado,
    CertificadoAdminResponse,
    CertificadoSchema,
    VerificarCertificado,
    VerificarCertificadoSchema,
} from "../Schema/CertificadoSchema";

export async function MisCertificados(): Promise<Certificado[]> {
    const response = await apiService.get(
        "/certificados/mis-certificados",
    );

    return response.data;
}

export async function obtenerCertificadosAdmin(
    page = 1,
    limit = 10,
    buscar = "",
): Promise<CertificadoAdminResponse> {
    const response = await apiService.get(
        "/certificados",
        {
            params: {
                page,
                limit,
                buscar: buscar || undefined,
            },
        },
    );

    return response.data;
}

export async function actualizarNombreCertificado(
    idCertificado: string,
    nombreCertificado: string,
) {
    const response = await apiService.patch(
        `/certificados/${idCertificado}/nombre`,
        {
            nombreCertificado,
        },
    );

    return response.data;
}

export async function descargarCertificado(
    idCertificado: string,
): Promise<Blob> {
    const response = await apiService.get(
        `/certificados/${idCertificado}/descargar`,
        {
            responseType: "blob",
        },
    );

    return response.data;
}

export async function verificarCertificado(
    codigo: string,
): Promise<VerificarCertificado> {
    const response = await apiService.get(
        `/certificados/verificar/${encodeURIComponent(codigo)}`,
        {
            skipAuth: true,
            skipAuthRedirect: true,
        },
    );

    return VerificarCertificadoSchema.parse(
        response.data,
    );
}

export async function emitirCertificadoModulo(
    inscripcionId: string,
    nombreCertificado: string,
) {
    const response = await apiService.post(
        `/certificados/modulo/${inscripcionId}/emitir`,
        {
            nombreCertificado,
        },
    );

    return response.data;
}

export async function emitirCertificadoCurso(
    cursoId: string,
    nombreCertificado: string,
) {
    const response = await apiService.post(
        `/certificados/curso/${cursoId}/emitir`,
        {
            nombreCertificado,
        },
    );

    return response.data;
}

export async function obtenerCertificadoPorId(
    idCertificado: string,
) {
    const response = await apiService.get(
        `/certificados/${idCertificado}`,
    );

    return CertificadoSchema.parse(response.data,);
}