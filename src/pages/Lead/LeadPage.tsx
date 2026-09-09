"use client";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppTitle } from "@/components/common/Apptittle";
import { QueryState } from "@/components/common/QueryState";
import { NoPermission } from "@/components/common/NoPermission";
import { DataTable } from "@/components/data-table/data-table";

import { LeadColumns } from "@/features/Lead/Components/LeadColumns";
import { useGetLeads } from "@/features/Lead/Hook/LeadHook";

import { useModulePermissions } from "@/hooks/useModulePermissions";
import { PERMISSIONS } from "@/utils/constants";

export default function LeadsPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    const { puedeVer } = useModulePermissions(PERMISSIONS.LEADS);

    const { data, isLoading, isError, error } = useGetLeads(
        page,
        10,
        search,
        puedeVer,
    );

    const columns = useMemo(
        () =>
            LeadColumns({
                onViewLead: (id) => navigate(`/panel/leads/${id}`),
                onViewUser: (usuarioId) => navigate(`/panel/leads/usuario/${usuarioId}`),
            }),
        [navigate],
    );

    const leads = data?.data ?? [];
    const pagination = data?.pagination;

    return (
        <div className="space-y-6 p-4 sm:p-6">
            <AppTitle
                title="Leads"
                subtitle="Personas interesadas en las formaciones de Elite Academy."
            />

            {!puedeVer ? (
                <NoPermission message="No tienes permisos para ver los leads" />
            ) : (
                <QueryState
                    isLoading={isLoading}
                    isError={isError}
                    error={error}
                    fallbackMessage="No se pudieron cargar los leads."
                >
                    <DataTable
                        columns={columns}
                        data={leads}
                        filterPlaceholder="Buscar estudiante, correo, curso o módulo..."
                        searchValue={search}
                        onSearchChange={(value) => {
                            setSearch(value);
                            setPage(1);
                        }}
                        pageCount={pagination?.totalPages ?? 1}
                        pageIndex={(pagination?.page ?? 1) - 1}
                        totalRows={pagination?.total ?? 0}
                        onPaginationChange={(newPage) => setPage(newPage + 1)}
                    />
                </QueryState>
            )}
        </div>
    );
}