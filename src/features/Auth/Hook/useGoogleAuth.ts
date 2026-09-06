import {
    useMutation,
} from "@tanstack/react-query";

import {
    useNavigate,
} from "react-router-dom";

import {
    toast,
} from "sonner";

import {
    useAuthStore,
} from "@/store/authStore";
import { GoogleAuth } from "../Service/google-auth.service";
import { LoginResponseType } from "../Schema/AuthSchema";



const POST_LOGIN_REDIRECT_KEY =
    "elite_post_login_redirect";

export function useGoogleAuth() {
    const login = useAuthStore(
        (state) => state.login
    );

    const navigate =
        useNavigate();

    return useMutation({
        mutationFn: GoogleAuth,

        onSuccess: (
            response:
                LoginResponseType
        ) => {
            login(response);

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
                "No se pudo continuar con Google"
            );
        },
    });
}