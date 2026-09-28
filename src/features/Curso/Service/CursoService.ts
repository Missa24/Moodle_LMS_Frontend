import { apiService } from "@/api/api";
import {
    CategoriaCreateType,
    CategoriaType,
    CategoriasResponseType,
    CursoCreateType,
    CursoDetailType,
    CursoType,
    CursoUpdateType,
    CursosResponseType,
    MisCursoInscritoType,
    ConfiguracionVentaCursoSchema,
    ConfigurarVentaCursoResponseSchema,
    CursoPrecioSchema,

    type ConfiguracionVentaCursoType,
    type ConfigurarVentaCursoResponseType,
    type ConfigurarVentaCursoType,
    type CursoPrecioType,
} from "../Schema/CursoSchema";
import { buildFormData } from "@/utils/buildFormData";

interface GetCursosParams {
    page?: number;
    limit?: number;
    search?: string;
    categoriaId?: string;
}

export async function GetPaginatedCourses({
    page = 1, limit = 10, search, categoriaId,
}: GetCursosParams): Promise<CursosResponseType> {

    const params = new URLSearchParams();

    params.set("page", String(page));
    params.set("limit", String(limit));

    if (search?.trim()) {
        params.set("search", search.trim());
    }

    if (categoriaId) {
        params.set("categoriaId", categoriaId);
    }

    const response = await apiService.get(`/curso?${params.toString()}`);

    return response.data;
}

export async function GetCourseById(id: string): Promise<CursoType> {
    const response = await apiService.get(`/curso/${id}`);

    return response.data;
}

export async function GetCourseCategories(): Promise<CategoriasResponseType> {
    const response = await apiService.get("/categoria");
    return response.data;
}

export async function GetCourseSubCategories(categoriaId: string): Promise<CategoriasResponseType> {
    const response = await apiService.get(`/categoria/${categoriaId}/subcategorias`);
    return response.data;
}

export async function CreateCurso(data: CursoCreateType): Promise<CursoDetailType> {
    const formData = buildFormData({
        nombre: data.nombre,
        categoriaId: data.categoriaId,
        slug: data.slug,
        descripcionCorta: data.descripcionCorta,
        descripcionCompleta: data.descripcionCompleta,
        estado: data.estado,
        duracionHoras: data.duracionHoras,
        creadoPor: data.creadoPor,
        rutaPortada: data.portada,
        rutaImagenSecundaria: data.imagenSecundaria,
    });
    const response = await apiService.post("/curso", formData);
    return response.data;
}

export async function UpdateCurso(id: string, data: CursoUpdateType): Promise<CursoDetailType> {
    const formData = buildFormData({
        nombre: data.nombre,
        categoriaId: data.categoriaId,
        slug: data.slug,
        descripcionCorta: data.descripcionCorta,
        descripcionCompleta: data.descripcionCompleta,
        estado: data.estado,
        duracionHoras: data.duracionHoras,
        creadoPor: data.creadoPor,
        rutaPortada: data.portada,
        rutaImagenSecundaria: data.imagenSecundaria,
    });
    const response = await apiService.patch(`/curso/${id}`, formData);
    return response.data;
}

export async function DeleteCurso(id: string): Promise<ResponseType> {
    const response = await apiService.delete(`/curso/${id}`);
    return response.data;
}

export async function GetMisInscripcionesEnCursos(estudianteId: string): Promise<MisCursoInscritoType[]> {
    const response = await apiService.get(`/inscripciones/estudiante/${estudianteId}`);
    return response.data;
}

export async function CreateCategoria(data: CategoriaCreateType): Promise<CategoriaType> {
    const response = await apiService.post("/categoria", data);
    return response.data;
}

export async function GetCursoPrecio(
    cursoId: string,
): Promise<CursoPrecioType> {
    const response =
        await apiService.get(
            `/curso/${cursoId}/precio`,
        );

    return CursoPrecioSchema.parse(
        response.data,
    );
}

export async function GetConfiguracionVentaCurso(
    cursoId: string,
): Promise<ConfiguracionVentaCursoType | null> {
    const response =
        await apiService.get(
            `/curso/${cursoId}/configuracion-venta`,
        );

    if (
        response.data ===
        null
    ) {
        return null;
    }

    return ConfiguracionVentaCursoSchema.parse(
        response.data,
    );
}

export async function ConfigurarVentaCurso(
    cursoId: string,
    data: ConfigurarVentaCursoType,
): Promise<ConfigurarVentaCursoResponseType> {
    const formData =
        new FormData();

    formData.append(
        "tipoDescuento",
        data.tipoDescuento,
    );

    if (
        data.porcentaje !==
        undefined
    ) {
        formData.append(
            "porcentaje",
            String(
                data.porcentaje,
            ),
        );
    }

    if (
        data.moduloDescuentoId
    ) {
        formData.append(
            "moduloDescuentoId",
            data.moduloDescuentoId,
        );
    }

    formData.append(
        "urlPago",
        data.urlPago ?? "",
    );

    formData.append(
        "habilitado",
        String(
            data.habilitado ??
            true,
        ),
    );

    if (
        data.qrPagoBolivia
    ) {
        formData.append(
            "qrPagoBolivia",
            data.qrPagoBolivia,
        );
    }

    const response =
        await apiService.patch(
            `/curso/${cursoId}/configuracion-venta`,
            formData,
        );

    return ConfigurarVentaCursoResponseSchema.parse(
        response.data,
    );
}