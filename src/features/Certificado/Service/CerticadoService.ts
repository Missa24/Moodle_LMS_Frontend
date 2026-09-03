import { apiService } from "@/api/api";
import { Certificado, VerificarCertificado, VerificarCertificadoSchema } from "../Schema/CertificadoSchema";

export async function MisCertificados(): Promise<Certificado[]> {
    const response = await apiService.get("/certificados/mis-certificados");
    return response.data;
}

export async function descargarCertificado(idCertificado: string): Promise<Blob> {
    const response = await apiService.get(`/certificados/${idCertificado}/descargar`,
        { responseType: "blob", }
    );

    return response.data;
}

export async function verificarCertificado(codigo: string): Promise<VerificarCertificado> {
    const response = await apiService.get(`/certificados/verificar/${encodeURIComponent(codigo)}`, {
        skipAuth: true,
        skipAuthRedirect: true,
    });


    return VerificarCertificadoSchema.parse(response.data);
}