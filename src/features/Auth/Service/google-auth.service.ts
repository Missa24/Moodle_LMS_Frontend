import { apiService, } from "@/api/api";
import { LoginResponseType } from "../Schema/AuthSchema";


export async function GoogleAuth(
    credential: string
): Promise<LoginResponseType> {
    const { data } =
        await apiService.post<LoginResponseType>("/auth/google", { credential, }
        );

    return data;
}