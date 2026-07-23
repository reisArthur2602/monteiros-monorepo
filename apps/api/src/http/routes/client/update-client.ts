import { NotFoundError } from '@/lib/errors.js';
import { ClientStatus, PersonType, prisma } from '@monteiro/db';
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { clientIdParamsSchema, clientResponseSchema } from './client.schemas.js';

const bodySchema = z.object({
    personType: z.nativeEnum(PersonType).optional(),
    name: z.string().min(2).max(200).optional(),
    document: z.string().max(20).optional(),
    secondaryId: z.string().max(30).optional(),
    birthDate: z.coerce.date().optional(),
    maritalStatus: z.string().max(50).optional(),
    occupation: z.string().max(100).optional(),
    phone: z.string().max(30).optional(),
    whatsapp: z.string().max(30).optional(),
    email: z.string().email().max(150).optional(),
    zipCode: z.string().max(20).optional(),
    street: z.string().optional(),
    number: z.string().max(20).optional(),
    complement: z.string().max(100).optional(),
    neighborhood: z.string().max(100).optional(),
    city: z.string().max(100).optional(),
    state: z.string().max(2).optional(),
    notes: z.string().optional(),
    status: z.nativeEnum(ClientStatus).optional(),
});

export const updateClient = async (app: FastifyInstance) => {
    const server = app.withTypeProvider<ZodTypeProvider>();

    server.patch(
        '/clients/:id',
        {
            schema: {
                operationId: 'updateClient',
                tags: ['Clients'],
                summary: 'Atualiza os dados de um cliente',
                params: clientIdParamsSchema,
                body: bodySchema,
                response: {
                    200: clientResponseSchema,
                },
            },
        },
        async (request, reply) => {
            const existingClient = await prisma.client.findUnique({
                where: { id: request.params.id },
            });

            if (!existingClient) {
                throw new NotFoundError('Cliente não encontrado');
            }

            const client = await prisma.client.update({
                where: { id: request.params.id },
                data: request.body,
            });

            return reply.send(client);
        },
    );
};
