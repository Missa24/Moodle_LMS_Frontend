import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LoginResponseType } from "@/features/Auth/Schema/AuthSchema";

type Usuario = LoginResponseType["usuario"];
type Menu = LoginResponseType["usuario"]["menus"];
type Permisos = LoginResponseType["usuario"]["permisos"];
type Rol = LoginResponseType["usuario"]["rol"];

interface AuthState {
    token: string | null;
    usuario: Usuario | null;
    rol: Rol;
    permisos: Permisos;
    menu: Menu;

    login: (data: LoginResponseType) => void;
    logout: () => void;
    setRequiereCompletarPerfil: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            usuario: null,
            rol: [],
            permisos: [],
            menu: [],

            login: (data) => {
                const {
                    access_token,
                    usuario,
                } = data;

                set({
                    token: access_token,
                    usuario,
                    rol: usuario.rol,
                    permisos: usuario.permisos,
                    menu: usuario.menus,
                });
            },

            logout: () => {
                set({
                    token: null,
                    usuario: null,
                    rol: [],
                    permisos: [],
                    menu: [],
                });
            },
            setRequiereCompletarPerfil: (value) =>
                set((state) => ({
                    usuario: state.usuario
                        ? {
                            ...state.usuario,
                            requiereCompletarPerfil: value,
                        }
                        : null,
                })),
        }),
        {
            name: "auth-storage",
        }
    )
);