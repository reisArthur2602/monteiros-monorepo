import { Button } from '@/components/ui/button';
import { Plus, Upload } from 'lucide-react';

export const ModelsPageHeader = () => {
    return (
        <header className="docket-marker mb-8 flex items-start justify-between gap-6 pl-5">
            <div>
                <ol aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-tertiary-text">
                    <li>Monteiro</li>
                    <li>/</li>
                    <li aria-current="page">Modelos</li>
                </ol>
                <h1 className="font-display mt-3 text-3xl leading-tight font-medium tracking-[-0.02em]">
                    Modelos de documentos
                </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <Button type="button" variant="secondary">
                    <Upload />
                    Importar DOCX
                </Button>
                {/* Rota de criação de modelo ainda não existe — link estático até a página ser implementada. */}
                <Button variant="default" render={<a href="/models/new" />}>
                    <Plus />
                    Novo modelo
                </Button>
            </div>
        </header>
    );
};
