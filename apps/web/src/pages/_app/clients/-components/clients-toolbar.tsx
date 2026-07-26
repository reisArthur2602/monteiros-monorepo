import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { RotateCcw, Search } from 'lucide-react';

export type ClientFilters = {
    search: string;
    type: '' | 'PF' | 'PJ';
    status: '' | 'active' | 'incomplete' | 'inactive';
};

type ClientsToolbarProps = {
    filters: ClientFilters;
    onFiltersChange: (filters: ClientFilters) => void;
    resultCount: number;
};

const selectClassName =
    'h-(--control-md) min-w-0 cursor-pointer appearance-none rounded-md border border-default bg-surface-elevated px-3 pr-10 font-sans text-sm text-primary-text transition-colors duration-fast ease-standard [background-image:url("data:image/svg+xml,%3Csvg_xmlns=\'http://www.w3.org/2000/svg\'_width=\'16\'_height=\'16\'_viewBox=\'0_0_24_24\'_fill=\'none\'_stroke=\'%236d7771\'_stroke-width=\'1.8\'_stroke-linecap=\'round\'_stroke-linejoin=\'round\'%3E%3Cpath_d=\'m7_10_5_5_5-5\'/%3E%3C/svg%3E")] bg-[right_0.75rem_center] bg-no-repeat hover:border-strong focus-visible:border-focus focus-visible:shadow-focus focus-visible:outline-none';

export const ClientsToolbar = ({ filters, onFiltersChange, resultCount }: ClientsToolbarProps) => {
    const update = (patch: Partial<ClientFilters>) => onFiltersChange({ ...filters, ...patch });

    const handleClear = () =>
        onFiltersChange({ search: '', type: '', status: '' });

    return (
        <div className="mb-4 overflow-hidden rounded-lg border border-subtle bg-surface-elevated shadow-xs">
            <div className="grid grid-cols-[minmax(18rem,1fr)_minmax(10rem,auto)_minmax(10rem,auto)_auto] items-center gap-3 p-4">
                <div className="relative min-w-0">
                    <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3.5 z-10 size-4 -translate-y-1/2 text-tertiary-text" />
                    <Input
                        type="search"
                        placeholder="Buscar por nome, CPF, CNPJ ou e-mail"
                        aria-label="Buscar clientes"
                        value={filters.search}
                        onChange={(event) => update({ search: event.target.value })}
                        className="pl-10.5"
                    />
                </div>

                <select
                    aria-label="Tipo de cliente"
                    className={cn(selectClassName)}
                    value={filters.type}
                    onChange={(event) => update({ type: event.target.value as ClientFilters['type'] })}
                >
                    <option value="">Tipo: todos</option>
                    <option value="PF">Pessoa física</option>
                    <option value="PJ">Pessoa jurídica</option>
                </select>

                <select
                    aria-label="Status do cliente"
                    className={cn(selectClassName)}
                    value={filters.status}
                    onChange={(event) => update({ status: event.target.value as ClientFilters['status'] })}
                >
                    <option value="">Status: todos</option>
                    <option value="active">Ativo</option>
                    <option value="incomplete">Incompleto</option>
                    <option value="inactive">Inativo</option>
                </select>

                <button
                    type="button"
                    onClick={handleClear}
                    className="inline-flex h-(--control-md) items-center justify-center gap-1.5 rounded-md border border-transparent px-3.5 text-sm text-secondary-text transition-colors duration-fast ease-standard hover:border-subtle hover:bg-surface-subtle hover:text-primary-text"
                >
                    <RotateCcw className="size-3.5" />
                    Limpar
                </button>
            </div>

            <div className="flex min-h-11 items-center border-t border-subtle px-4 text-xs text-tertiary-text">
                {resultCount} {resultCount === 1 ? 'cliente' : 'clientes'}
            </div>
        </div>
    );
};
