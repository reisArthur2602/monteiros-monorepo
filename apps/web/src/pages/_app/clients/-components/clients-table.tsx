import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Ellipsis, ExternalLink } from 'lucide-react';
import type { Client } from './mock-clients';

type ClientsTableProps = {
    clients: Client[];
};

const statusVariant = (status: Client['status']) => {
    switch (status) {
        case 'active':
            return { label: 'Ativo', variant: 'success' as const };
        case 'incomplete':
            return { label: 'Incompleto', variant: 'warning' as const };
        case 'inactive':
            return { label: 'Inativo', variant: 'neutral' as const };
    }
};

const typeLabel = (type: Client['type']) => (type === 'PF' ? 'Pessoa física' : 'Pessoa jurídica');

const getInitials = (name: string) =>
    name
        .split(' ')
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('');

export const ClientsTable = ({ clients }: ClientsTableProps) => {
    return (
        <div className="overflow-hidden rounded-lg border border-subtle bg-surface shadow-xs">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr>
                            <th className="bg-surface-subtle px-4 py-3 text-left font-mono text-2xs font-medium uppercase tracking-wide text-tertiary-text">
                                Cliente
                            </th>
                            <th className="bg-surface-subtle px-4 py-3 text-left font-mono text-2xs font-medium uppercase tracking-wide text-tertiary-text">
                                CPF/CNPJ
                            </th>
                            <th className="bg-surface-subtle px-4 py-3 text-left font-mono text-2xs font-medium uppercase tracking-wide text-tertiary-text">
                                Contato
                            </th>
                            <th className="bg-surface-subtle px-4 py-3 text-left font-mono text-2xs font-medium uppercase tracking-wide text-tertiary-text">
                                Processos
                            </th>
                            <th className="bg-surface-subtle px-4 py-3 text-left font-mono text-2xs font-medium uppercase tracking-wide text-tertiary-text">
                                Status
                            </th>
                            <th className="bg-surface-subtle px-4 py-3 text-left font-mono text-2xs font-medium uppercase tracking-wide text-tertiary-text">
                                Atualizado em
                            </th>
                            <th className="bg-surface-subtle px-4 py-3 text-right font-mono text-2xs font-medium uppercase tracking-wide text-tertiary-text">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client) => {
                            const status = statusVariant(client.status);
                            return (
                                <tr key={client.id} className="border-b border-subtle transition-colors hover:bg-registry-50/60">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="grid size-[2.35rem] shrink-0 place-items-center rounded-full border border-subtle bg-surface-subtle font-mono text-xs font-medium text-ink-700">
                                                {getInitials(client.name)}
                                            </div>
                                            <div className="min-w-0">
                                                <a href={`/clients/${client.id}`} className="block truncate font-semibold text-primary-text hover:text-link">
                                                    {client.name}
                                                </a>
                                                <span className="block truncate text-xs text-tertiary-text">
                                                    {typeLabel(client.type)} · Cliente desde {client.joinedAt}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 font-mono text-sm text-primary-text">
                                        {client.documentFormatted}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="text-sm text-primary-text">{client.contact.email}</div>
                                        <div className="text-xs text-tertiary-text">{client.contact.phone}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="text-sm text-secondary-text">
                                            <strong className="text-primary-text">{client.processCount}</strong>{' '}
                                            {client.processCount === 1 ? 'ativo' : 'ativos'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge variant={status.variant}>{status.label}</Badge>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-primary-text">{client.updatedAt}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-1">
                                            <Button
                                                variant="outline"
                                                size="icon-sm"
                                                aria-label={`Abrir ${client.name}`}
                                                render={<a href={`/clients/${client.id}`} />}
                                            >
                                                <ExternalLink />
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon-sm"
                                                aria-label={`Mais ações para ${client.name}`}
                                            >
                                                <Ellipsis />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
