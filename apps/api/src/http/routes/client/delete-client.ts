import { NotFoundError } from '@/lib/errors.js';
import { prisma } from '@monteiro/db';
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { clientIdParamsSchema } from './client.schemas.js';

export const deleteClient = async (app: FastifyInstance) => {
    const server = app.withTypeProvider<ZodTypeProvider>();

    server.delete(
        '/clients/:id',
        {
            schema: {
                operationId: 'deleteClient',
                tags: ['Clients'],
                summary: 'Remove um cliente',
                params: clientIdParamsSchema,
                response: {
                    204: z.void(),
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

            await prisma.client.delete({ where: { id: request.params.id } });

            return reply.status(204).send();
        },
    );
};
