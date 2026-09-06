import { ChangePassword, LoginUser, LogoutUser, MeProfile, RegisterUser } from "../Service/AuthService";
import { LoginResponseType } from "../Schema/AuthSchema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { RegisterPayload } from "../Schema/RegisterSchema";

const POST_LOGIN_REDIRECT_KEY =
    "elite_post_login_redirect";

export function useLogin() {
    const login = useAuthStore(
        (state) => state.login
    );

    const navigate = useNavigate();

    return useMutation({
        mutationFn: LoginUser,

        onSuccess: (
            response: LoginResponseType
        ) => {
            login(response);

            if (
                response.usuario.estado ===
                "pendiente"
            ) {
                navigate(
                    "/panel/cambiar-password",
                    {
                        replace: true,
                    }
                );

                return;
            }

            toast.success(
                "Bienvenido a Elite Academy"
            );

            const redirectPath =
                sessionStorage.getItem(
                    POST_LOGIN_REDIRECT_KEY
                );

            if (redirectPath) {
                sessionStorage.removeItem(
                    POST_LOGIN_REDIRECT_KEY
                );

                navigate(
                    redirectPath,
                    {
                        replace: true,
                    }
                );

                return;
            }

            navigate(
                "/panel/inicio",
                {
                    replace: true,
                }
            );
        },

        onError: () => {
            toast.error(
                "Credenciales incorrectas"
            );
        },
    });
}

export function useLogout() {
    const logout = useAuthStore(
        state => state.logout
    );
    const navigate = useNavigate();
    return useMutation({
        mutationFn: LogoutUser,
        onSettled: () => {
            logout();
            navigate("/login", { replace: true });
        }
    });
}

export function useChangePassword() {
    const logout = useAuthStore(
        state => state.logout
    );
    const navigate = useNavigate();
    return useMutation({
        mutationFn: ChangePassword,
        onSuccess: () => {
            logout();
            toast.success("Contraseña cambiada exitosamente");
            navigate("/login", { replace: true });
        },
        onError: () => {
            toast.error("Error al cambiar la contraseña");
        }
    });
}

export function useMeProfile() {
    const token = useAuthStore((state) => state.token);

    return useQuery({
        queryKey: ["auth", "me"],
        queryFn: MeProfile,
        enabled: !!token,
        staleTime: 1000 * 60 * 5,
        select: (response) => response.data,
    });
}

export function useRegister() {
    const login = useAuthStore(
        (state) => state.login
    );

    const navigate = useNavigate();

    return useMutation({
        mutationFn: (payload: RegisterPayload) =>
            RegisterUser(payload),

        onSuccess: (response: LoginResponseType
        ) => {
            login(response);

            toast.success("Cuenta creada correctamente. ¡Bienvenido a Elite Academy!");

            const redirectPath = sessionStorage.getItem(POST_LOGIN_REDIRECT_KEY);

            if (redirectPath) {
                sessionStorage.removeItem(
                    POST_LOGIN_REDIRECT_KEY
                );

                navigate(redirectPath, { replace: true, }
                );

                return;
            }

            navigate(
                "/panel/inicio",
                {
                    replace: true,
                }
            );
        },

        onError: (error) => {
            console.error(error);

            toast.error("No se pudo crear la cuenta");
        },
    });
}