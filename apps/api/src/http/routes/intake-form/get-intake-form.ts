import { NotFoundError } from '@/lib/errors.js';
import { prisma } from '@monteiro/db';
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { intakeFormIdParamsSchema, intakeFormResponseSchema } from './intake-form.schemas.js';

export const getIntakeForm = async (app: FastifyInstance) => {
    const server = app.withTypeProvider<ZodTypeProvider>();

    server.get(
        '/intake-forms/:id',
        {
            schema: {
                operationId: 'getIntakeForm',
                tags: ['Intake Forms'],
                summary: 'Retorna os detalhes de uma ficha de atendimento',
                params: intakeFormIdParamsSchema,
                response: {
                    200: intakeFormResponseSchema,
                },
            },
        },
        async (request, reply) => {
            const intakeForm = await prisma.intakeForm.findUnique({
                where: { id: request.params.id },
            });

            if (!intakeForm) {
                throw new NotFoundError('Ficha de atendimento não encontrada');
            }

            return reply.send(intakeForm);
        },
    );
};
