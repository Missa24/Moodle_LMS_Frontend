import { apiService } from "@/api/api";
import { ResponseType } from "@/utils/Schema/Response";
import { MiPerfilType, UpdateMiPerfilType, UserCreateType, UserIndexResponseType, UserUpdateType, UsuarioDetailType } from "../Schema/UsuarioSchema";


export async function GetPaginatedUsers(page: number, limit: number = 10): Promise<UserIndexResponseType> {
    const response = await apiService.get(`/user?page=${page}&limit=${limit}`);
    return response.data;
}

export async function GetUserById(id: string): Promise<UsuarioDetailType> {
    const response = await apiService.get(`/user/${id}`);
    return response.data;
}

export async function CreateUser(data: UserCreateType): Promise<ResponseType> {
    const response = await apiService.post("/user", data);
    return response.data;
}

export async function UpdateUser(id: string, data: UserUpdateType): Promise<ResponseType> {
    const response = await apiService.patch(`/user/${id}`, data);
    return response.data;
}
export async function DeleteUserLogically(id: string): Promise<ResponseType> {
    const response = await apiService.delete(`/user/${id}`);
    return response.data;
}

export async function SearchUsers(q: string) {
    const response = await apiService.get(`/user/search?q=${encodeURIComponent(q)}`);
    return response.data;
}

export async function GetMiPerfil(): Promise<MiPerfilType> {
    const response = await apiService.get("/user/mi-perfil");
    return response.data;
}

export async function UpdateMiPerfil(data: UpdateMiPerfilType): Promise<MiPerfilType> {
    const response = await apiService.patch("/user/mi-perfil", data);
    return response.data;
}

export async function ChangeMyPassword(data: { passwordActual: string; passwordNueva: string; }): Promise<ResponseType> {
    const response = await apiService.patch("/user/mi-password", data);
    return response.data;
}

export async function updateProfilePhoto(file: File,) {
    const formData = new FormData();

    formData.append("file", file);

    const { data } = await apiService.patch("/user/mi-perfil/foto", formData,);

    return data;
}