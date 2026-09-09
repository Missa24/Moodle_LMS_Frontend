"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppTitle } from "@/components/common/Apptittle";
import { NoPermission } from "@/components/common/NoPermission";
import { QueryState } from "@/components/common/QueryState";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";

import { UsuarioColumns } from "@/features/Usuario/Components/usuario-columns";
import { DialogUsuario } from "@/features/Usuario/Components/DialogUsuario";

import { useGetUsers, useDeleteUser, } from "@/features/Usuario/Hook/UsuarioHook";

import type { UsuarioIndexType, } from "@/features/Usuario/Schema/UsuarioSchema";

import { useModulePermissions } from "@/hooks/useModulePermissions";
import { PERMISSIONS } from "@/utils/constants";

export default function UsuarioPage() {
    const [page, setPage] = useState(1);

    const [selectedUser, setSelectedUser,] = useState<UsuarioIndexType | undefined>(undefined);

    const [dialogOpen, setDialogOpen,] = useState(false);

    const navigate = useNavigate();

    const perPage = 10;

    const { puedeVer, puedeCrear, puedeEliminar, } = useModulePermissions(PERMISSIONS.USUARIOS,);

    const { data, isLoading, isError, error, } = useGetUsers(page, perPage,);

    const deleteUser = useDeleteUser();
    const handleCreate = () => {
        setSelectedUser(undefined,);

        setDialogOpen(true,);
    };

    const handleDelete = (id: string,) => {
        deleteUser.mutate(id,);
    };

    const columns =
        UsuarioColumns({
            onView: (id: string,) =>
                navigate(`/panel/usuario/${id}`,),

            onDelete: handleDelete,

            canDelete: puedeEliminar,
        });

    const usuarios = data?.data ?? [];

    const totalPages = data?.meta.totalPages ?? 1;

    const currentPage = data?.meta.page ?? page;

    const totalUsers = data?.meta.total ?? 0;

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
                <AppTitle
                    title="Usuarios"
                    subtitle="Administra y gestiona a los usuarios"
                />

                {puedeCrear && (
                    <Button
                        onClick={handleCreate}
                    >
                        Nuevo Usuario
                    </Button>
                )}
            </div>

            {!puedeVer ? (
                <NoPermission
                    message="No tienes permisos para ver los usuarios"
                />
            ) : (
                <QueryState
                    isLoading={isLoading}
                    isError={isError}
                    error={error}
                >
                    <DataTable
                        columns={columns}
                        data={usuarios}
                        filterColumn="username"
                        filterPlaceholder="Buscar usuario..."
                        pageCount={totalPages}
                        pageIndex={currentPage - 1}
                        totalRows={totalUsers}
                        onPaginationChange={(newPage,) =>
                            setPage(newPage + 1,)
                        }
                    />
                </QueryState>
            )}

            <DialogUsuario
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                mode={selectedUser ? "edit" : "create"}
                userId={selectedUser?.id}
            />
        </div>
    );
}