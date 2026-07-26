import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from '@tanstack/react-router';
import { Copy, Ellipsis, Pencil } from 'lucide-react';

export type ModelStatus = 'active' | 'draft' | 'inactive';

export type DocumentModel = {
    id: string;
    name: string;
    description: string;
    category: string;
    area: string;
    version: string;
    usage: number;
    status: ModelStatus;
    updatedAtLabel: string;
};

const statusBadge: Record<
    ModelStatus,
    { label: string; variant: 'success' | 'warning' | 'neutral' }
> = {
    active: { label: 'Ativo', variant: 'success' },
    draft: { label: 'Rascunho', variant: 'warning' },
    inactive: { label: 'Inativo', variant: 'neutral' },
};

const paperLineWidths = ['100%', '72%', '86%', '100%', '66%', '100%', '78%'];

type ModelCardProps = {
    model: DocumentModel;
    onDuplicate?: (model: DocumentModel) => void;
};

export const ModelCard = ({ model, onDuplicate }: ModelCardProps) => {
    const badge = statusBadge[model.status];

    return (
        <Card interactive className="grid grid-rows-[auto_1fr_auto] gap-0 overflow-hidden py-0">
            <div className="relative grid min-h-32 place-items-center overflow-hidden border-b border-subtle bg-surface-subtle p-5 [background-image:radial-gradient(circle_at_20%_15%,rgba(200,147,24,0.09),transparent_45%)]">
                <Badge variant={badge.variant} className="absolute top-3 right-3">
                    {badge.label}
                </Badge>

                <div
                    aria-hidden="true"
                    className="w-[5.15rem] border border-[#d8dce3] bg-white p-[0.55rem] shadow-[0_8px_16px_rgba(16,24,40,0.12)]"
                    style={{ aspectRatio: '210 / 297' }}
                >
                    {paperLineWidths.map((width, index) => (
                        <div
                            key={index}
                            className="mb-[0.3rem] h-[0.22rem] rounded-full bg-[#d8dde5]"
                            style={{ width }}
                        />
                    ))}
                </div>
            </div>

            <div className="grid content-start gap-4 p-5">
                <div>
                    <h2 className="font-display text-lg leading-snug font-medium">{model.name}</h2>
                    <p className="mt-2 text-sm text-secondary-text">{model.description}</p>
                </div>

                <dl className="grid grid-cols-2 gap-3">
                    <div>
                        <dt className="text-xs text-tertiary-text">Categoria</dt>
                        <dd className="mt-0.5 text-sm font-medium text-primary-text">
                            {model.category}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-xs text-tertiary-text">Área</dt>
                        <dd className="mt-0.5 text-sm font-medium text-primary-text">
                            {model.area}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-xs text-tertiary-text">Versão</dt>
                        <dd className="mt-0.5 text-sm font-medium text-primary-text">
                            {model.version}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-xs text-tertiary-text">Utilizações</dt>
                        <dd className="mt-0.5 text-sm font-medium text-primary-text">
                            {model.usage}
                        </dd>
                    </div>
                </dl>
            </div>

            <footer className="flex items-center justify-between gap-3 border-t border-subtle bg-surface-subtle px-5 py-4">
                <span className="text-xs text-secondary-text">{model.updatedAtLabel}</span>
                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        aria-label="Duplicar"
                        onClick={() => onDuplicate?.(model)}
                    >
                        <Copy />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon-sm"
                        aria-label="Editar"
                        render={<Link to="/models" />}
                    >
                        <Pencil />
                    </Button>
                    <Button type="button" variant="outline" size="icon-sm" aria-label="Mais ações">
                        <Ellipsis />
                    </Button>
                </div>
            </footer>
        </Card>
    );
};
