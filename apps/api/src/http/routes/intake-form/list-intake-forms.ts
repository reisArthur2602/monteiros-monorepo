import { NotFoundError } from '@/lib/errors.js';
import { IntakeFormStatus, prisma } from '@monteiro/db';
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { intakeFormResponseSchema } from './intake-form.schemas.js';

const paramsSchema = z.object({
    clientId: z.string().uuid(),
});

const querySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    pageSize: z.coerce.number().int().positive().max(100).default(20),
    status: z.nativeEnum(IntakeFormStatus).optional(),
});

const responseSchema = z.object({
    data: z.array(intakeFormResponseSchema),
    meta: z.object({
        page: z.number(),
        pageSize: z.number(),
        total: z.number(),
    }),
});

export const listIntakeForms = async (app: FastifyInstance) => {
    const server = app.withTypeProvider<ZodTypeProvider>();

    server.get(
        '/clients/:clientId/intake-forms',
        {
            schema: {
                operationId: 'listIntakeForms',
                tags: ['Intake Forms'],
                summary: 'Lista as fichas de atendimento de um cliente',
                params: paramsSchema,
                querystring: querySchema,
                response: {
                    200: responseSchema,
                },
            },
        },
        async (request, reply) => {
            const { clientId } = request.params;
            const { page, pageSize, status } = request.query;

            const client = await prisma.client.findUnique({ where: { id: clientId } });

            if (!client) {
                throw new NotFoundError('Cliente não encontrado');
            }

            const where = {
                clientId,
                ...(status ? { status } : {}),
            };

            const [data, total] = await Promise.all([
                prisma.intakeForm.findMany({
                    where,
                    orderBy: { serviceDate: 'desc' },
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                }),
                prisma.intakeForm.count({ where }),
            ]);

            return reply.send({
                data,
                meta: { page, pageSize, total },
            });
        },
    );
};
