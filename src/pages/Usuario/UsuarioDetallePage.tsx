"use client";

import { useNavigate, useParams } from "react-router-dom";
import { QueryState } from "@/components/common/QueryState";
import { UsuarioDetalle } from "@/features/Usuario/Components/UsuarioDetalle";
import { useGetUser } from "@/features/Usuario/Hook/UsuarioHook";

export default function UsuarioDetallePage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const {
        data,
        isLoading,
        isError,
        error,
    } = useGetUser(id ?? "", !!id);

    return (
        <div className="space-y-6 p-6">
            <QueryState
                isLoading={isLoading}
                isError={isError || !id}
                error={error}
                fallbackMessage="No se pudo cargar la información del usuario."
            >
                {data && (
                    <UsuarioDetalle
                        usuario={data}
                        onBack={() =>
                            navigate("/panel/usuario")
                        }
                    />
                )}
            </QueryState>
        </div>
    );
}
