export type ClientType = 'PF' | 'PJ';
export type ClientStatus = 'active' | 'incomplete' | 'inactive';

export type Client = {
    id: string;
    name: string;
    type: ClientType;
    document: string;
    documentFormatted: string;
    contact: {
        email: string;
        phone: string;
    };
    processCount: number;
    status: ClientStatus;
    joinedAt: string;
    updatedAt: string;
};

export const mockClients: Client[] = [
    {
        id: '1',
        name: 'João da Silva',
        type: 'PF',
        document: '12345678900',
        documentFormatted: '123.456.789-00',
        contact: { email: 'joao@exemplo.com', phone: '(11) 98765-4321' },
        processCount: 2,
        status: 'active',
        joinedAt: 'fev. 2024',
        updatedAt: '24 jul. 2026',
    },
    {
        id: '2',
        name: 'Acme Comércio Ltda.',
        type: 'PJ',
        document: '12345678000190',
        documentFormatted: '12.345.678/0001-90',
        contact: { email: 'juridico@acme.com.br', phone: '(11) 3200-4000' },
        processCount: 5,
        status: 'active',
        joinedAt: 'nov. 2023',
        updatedAt: '23 jul. 2026',
    },
    {
        id: '3',
        name: 'Helena Rocha',
        type: 'PF',
        document: '98765432100',
        documentFormatted: '987.654.321-00',
        contact: { email: 'helena.rocha@email.com', phone: '(21) 98877-4455' },
        processCount: 1,
        status: 'active',
        joinedAt: 'jan. 2025',
        updatedAt: '22 jul. 2026',
    },
    {
        id: '4',
        name: 'Grupo Horizonte S.A.',
        type: 'PJ',
        document: '45678901000122',
        documentFormatted: '45.678.901/0001-22',
        contact: { email: 'contato@horizonte.com.br', phone: '(31) 3550-7000' },
        processCount: 0,
        status: 'incomplete',
        joinedAt: 'Cadastro recente',
        updatedAt: '20 jul. 2026',
    },
    {
        id: '5',
        name: 'Marcos Almeida',
        type: 'PF',
        document: '74185296310',
        documentFormatted: '741.852.963-10',
        contact: { email: 'marcos.almeida@email.com', phone: '(41) 99122-3344' },
        processCount: 0,
        status: 'inactive',
        joinedAt: 'mai. 2022',
        updatedAt: '14 jul. 2026',
    },
    {
        id: '6',
        name: 'Oliveira Tecnologia e Serviços Ltda.',
        type: 'PJ',
        document: '88999000000144',
        documentFormatted: '88.999.000/0001-44',
        contact: { email: 'contato@oliveiratech.com.br', phone: '(51) 3400-9090' },
        processCount: 3,
        status: 'active',
        joinedAt: 'mar. 2026',
        updatedAt: '10 jul. 2026',
    },
];
