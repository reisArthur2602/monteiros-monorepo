import { Button } from '@/components/ui/button';
import { Download, Plus } from 'lucide-react';

export const ClientsPageHeader = () => {
    return (
        <header className="docket-marker mb-8 flex items-start justify-between gap-6 pl-5">
            <div>
                <ol
                    aria-label="Breadcrumb"
                    className="flex flex-wrap items-center gap-2 text-sm text-tertiary-text"
                >
                    <li>Monteiro</li>
                    <li>/</li>
                    <li aria-current="page">Clientes</li>
                </ol>
                <h1 className="font-display mt-3 text-3xl leading-tight font-medium tracking-[-0.02em]">
                    Clientes
                </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <Button type="button" variant="secondary">
                    <Download />
                    Exportar
                </Button>
                <Button variant="default" render={<a href="/clients/new" />}>
                    <Plus />
                    Novo cliente
                </Button>
            </div>
        </header>
    );
};
