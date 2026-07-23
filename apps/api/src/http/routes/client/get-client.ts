import { NotFoundError } from '@/lib/errors.js';
import { prisma } from '@monteiro/db';
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { clientIdParamsSchema, clientResponseSchema } from './client.schemas.js';

export const getClient = async (app: FastifyInstance) => {
    const server = app.withTypeProvider<ZodTypeProvider>();

    server.get(
        '/clients/:id',
        {
            schema: {
                operationId: 'getClient',
                tags: ['Clients'],
                summary: 'Retorna os detalhes básicos de um cliente',
                params: clientIdParamsSchema,
                response: {
                    200: clientResponseSchema,
                },
            },
        },
        async (request, reply) => {
            const client = await prisma.client.findUnique({
                where: { id: request.params.id },
            });

            if (!client) {
                throw new NotFoundError('Cliente não encontrado');
            }

            return reply.send(client);
        },
    );
};
