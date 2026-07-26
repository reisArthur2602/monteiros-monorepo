import { Button } from '@/components/ui/button';
import { Files, RotateCcw } from 'lucide-react';

type ModelEmptyStateProps = {
    onClearFilters: () => void;
};

export const ModelEmptyState = ({ onClearFilters }: ModelEmptyStateProps) => {
    return (
        <div className="grid min-h-72 place-items-center gap-3 rounded-lg border border-dashed border-default bg-surface p-8 text-center">
            <div className="grid size-12 place-items-center rounded-full border border-subtle bg-surface-subtle text-brand-text">
                <Files className="size-5" />
            </div>
            <strong className="text-sm font-semibold text-primary-text">Nenhum modelo encontrado</strong>
            <span className="text-sm text-secondary-text">Revise a busca ou remova os filtros aplicados.</span>
            <Button type="button" variant="secondary" onClick={onClearFilters}>
                <RotateCcw />
                Limpar filtros
            </Button>
        </div>
    );
};
