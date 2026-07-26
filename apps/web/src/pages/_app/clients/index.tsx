import { Button } from '#/components/ui/button';
import { createFileRoute } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ClientsEmptyState } from './-components/clients-empty-state';
import { ClientsPageHeader } from './-components/clients-page-header';
import { ClientsTable } from './-components/clients-table';
import { ClientsToolbar, type ClientFilters } from './-components/clients-toolbar';
import { mockClients } from './-components/mock-clients';

const DIACRITICS_PATTERN = new RegExp(
    `[${String.fromCharCode(0x0300)}-${String.fromCharCode(0x036f)}]`,
    'g'
);

const normalize = (value: string) =>
    value.toLocaleLowerCase('pt-BR').normalize('NFD').replace(DIACRITICS_PATTERN, '');

const PAGE_SIZE = 4;

const initialFilters: ClientFilters = {
    search: '',
    type: '',
    status: '',
};

const ClientsRoute = () => {
    const [filters, setFilters] = useState<ClientFilters>(initialFilters);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredClients = useMemo(() => {
        const term = normalize(filters.search.trim());

        return mockClients.filter((client) => {
            const searchableText = normalize(
                `${client.name} ${client.document} ${client.contact.email}`
            );
            const matchesSearch = !term || searchableText.includes(term);
            const matchesType = !filters.type || client.type === filters.type;
            const matchesStatus = !filters.status || client.status === filters.status;

            return matchesSearch && matchesType && matchesStatus;
        });
    }, [filters]);

    const totalPages = Math.max(1, Math.ceil(filteredClients.length / PAGE_SIZE));
    const displayPage = Math.min(currentPage, totalPages);
    const paginatedClients = filteredClients.slice(
        (displayPage - 1) * PAGE_SIZE,
        displayPage * PAGE_SIZE
    );

    const handleFiltersChange = (newFilters: ClientFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        setFilters(initialFilters);
        setCurrentPage(1);
    };

    return (
        <div>
            <ClientsPageHeader />

            <ClientsToolbar
                filters={filters}
                onFiltersChange={handleFiltersChange}
                resultCount={filteredClients.length}
            />

            {filteredClients.length > 0 ? (
                <>
                    <ClientsTable clients={paginatedClients} />

                    {totalPages > 1 && (
                        <div className="mt-4 flex items-center justify-between gap-4 rounded-lg border border-subtle bg-surface px-4 py-3 text-sm text-tertiary-text">
                            <span>
                                Mostrando {(displayPage - 1) * PAGE_SIZE + 1}–
                                {Math.min(displayPage * PAGE_SIZE, filteredClients.length)} de{' '}
                                {filteredClients.length} clientes
                            </span>

                            <nav
                                className="flex items-center gap-1"
                                aria-label="Paginação dos clientes"
                            >
                                <Button
                                    type="button"
                                    disabled={displayPage === 1}
                                    onClick={() => setCurrentPage(displayPage - 1)}
                                    aria-label="Página anterior"
                                    size="icon-sm"
                                >
                                    <ChevronLeft size={13} />
                                </Button>

                                <div className="flex gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                        (page) => (
                                            <Button
                                                key={page}
                                                type="button"
                                                onClick={() => setCurrentPage(page)}
                                                aria-label={`Ir para a página ${page}`}
                                                size="icon-sm"
                                                variant="outline"
                                                aria-current={
                                                    page === displayPage ? 'page' : undefined
                                                }
                                            >
                                                {page}
                                            </Button>
                                        )
                                    )}
                                </div>

                                <Button
                                    type="button"
                                    disabled={displayPage === totalPages}
                                    onClick={() => setCurrentPage(displayPage + 1)}
                                    size="icon-sm"
                                >
                                    <ChevronRight size={13} />
                                </Button>
                            </nav>
                        </div>
                    )}
                </>
            ) : (
                <ClientsEmptyState onClearFilters={handleClearFilters} />
            )}
        </div>
    );
};

export const Route = createFileRoute('/_app/clients/')({
    component: ClientsRoute,
});
