"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { QueryState } from "@/components/common/QueryState";
import { DataTable } from "@/components/data-table/data-table";
import { Input } from "@/components/ui/input";


import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useModulePermissions } from "@/hooks/useModulePermissions";

import { PERMISSIONS } from "@/utils/constants";
import { useCertificadosAdmin } from "@/features/Certificado/Hook/CertificadoHook";
import { Certificado } from "@/features/Certificado/Schema/CertificadoSchema";
import { CertificadoColumns } from "@/features/Certificado/Components/certificado-columns";
import { useNavigate } from "react-router-dom";

export const CertificadosPage = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const perPage = 10;

    const searchDebounced = useDebouncedValue(
        search,
        500,
    );

    const { puedeEditar } = useModulePermissions(
        PERMISSIONS.CERTIFICADOS,
    );

    const {
        data,
        isLoading,
        isError,
        error,
    } = useCertificadosAdmin(
        page,
        perPage,
        searchDebounced,
    );

    const certificados = data?.data ?? [];
    const totalPages = data?.meta.totalPages ?? 1;
    const currentPage = data?.meta.page ?? page;
    const totalCertificados = data?.meta.total ?? 0;

    const navigate = useNavigate();
    const columns = useMemo(
        () =>
            CertificadoColumns({
                onView: (certificado) => {
                    navigate(
                        `/panel/gestion-certificados/${certificado.idCertificado}`,
                    );
                },
            }),
        [navigate],
    );

    return (
        <div className="space-y-6 p-6">
            <PageHeader
                title="Certificados"
                subtitle="Gestiona los certificados emitidos a los estudiantes."
            />

            <div className="relative w-62">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                    placeholder="Buscar certificado..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    className="pl-9"
                />
            </div>

            <QueryState
                isLoading={isLoading}
                isError={isError}
                error={error}
            >
                <DataTable
                    columns={columns}
                    data={certificados}
                    pageCount={totalPages}
                    pageIndex={currentPage - 1}
                    totalRows={totalCertificados}
                    onPaginationChange={(newPage) =>
                        setPage(newPage + 1)
                    }
                />
            </QueryState>
        </div>
    );
};
