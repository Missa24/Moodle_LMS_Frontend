import { apiService } from "@/api/api";
import { CrearInscripcionSchemaType, MiInscripcionModuloSchema, MiInscripcionModuloType } from "../Schema/InscripcionSchema";
import { CrearEstudianteSchemaType } from "../Schema/EstudianteSchema";

export async function CrearInscripcion(data: CrearInscripcionSchemaType) {
    const response = await apiService.post("/inscripciones/multiple", data);
    return response.data;
}

export async function ObtenerInscripciones(page: number, limit: number = 10, search?: string) {
    const response = await apiService.get(`/inscripciones/paginated?page=${page}&limit=${limit}&search=${search}`);
    return response.data;
}

export async function ObtenerCursos() {
    const response = await apiService.get("/curso/curso-modulos");
    return response.data;
}

export async function ObtenerEstudiantes() {
    const response = await apiService.get("/user/estudiantes");
    return response.data;
}

export async function CrearEstudiante(data: CrearEstudianteSchemaType) {
    const response = await apiService.post("/user/crear-estudiante", data);
    return response.data;
}

export async function ObtenerInscripcionPorEstudiante(estudianteId: string) {
    const response = await apiService.get(`/inscripciones/estudiante/${estudianteId}`);
    return response.data;
}

export async function AgregarCursoInscripcion(data: CrearInscripcionSchemaType) {
    const response = await apiService.post("/inscripciones/multiple", data);
    return response.data;
}

export async function EliminarCursoInscripcion(estudianteId: string, cursoId: string) {
    const response = await apiService.delete(`/inscripciones/${estudianteId}/cursos/${cursoId}`);
    return response.data;
}

export async function EliminarModuloInscripcion(inscripcionId: string, cursoId: string, moduloId: string) {
    const response = await apiService.delete(`/inscripciones/${inscripcionId}/cursos/${cursoId}/modulos/${moduloId}`);
    return response.data;
}

export async function EliminarInscripcionesPorEstudiante(estudianteId: string) {
    const response = await apiService.delete(`/inscripciones/all/${estudianteId}`);
    return response.data;
}

export async function GetMiInscripcionModulo(moduloId: string,): Promise<MiInscripcionModuloType> {
    const response = await apiService.get(`/inscripciones/me/modulo/${moduloId}`,);
    return MiInscripcionModuloSchema.parse(response.data,);
}