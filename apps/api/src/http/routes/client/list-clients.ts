import { prisma } from '@monteiro/db';
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { clientResponseSchema } from './client.schemas.js';

const querySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    pageSize: z.coerce.number().int().positive().max(100).default(20),
    search: z.string().optional(),
});

const responseSchema = z.object({
    data: z.array(clientResponseSchema),
    meta: z.object({
        page: z.number(),
        pageSize: z.number(),
        total: z.number(),
    }),
});

export const listClients = async (app: FastifyInstance) => {
    const server = app.withTypeProvider<ZodTypeProvider>();

    server.get(
        '/clients',
        {
            schema: {
                operationId: 'listClients',
                tags: ['Clients'],
                summary: 'Lista os clientes cadastrados',
                querystring: querySchema,
                response: {
                    200: responseSchema,
                },
            },
        },
        async (request, reply) => {
            const { page, pageSize, search } = request.query;

            const where = search
                ? {
                      name: {
                          contains: search,
                          mode: 'insensitive' as const,
                      },
                  }
                : undefined;

            const [data, total] = await Promise.all([
                prisma.client.findMany({
                    where,
                    orderBy: { name: 'asc' },
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                }),
                prisma.client.count({ where }),
            ]);

            return reply.send({
                data,
                meta: { page, pageSize, total },
            });
        },
    );
};
