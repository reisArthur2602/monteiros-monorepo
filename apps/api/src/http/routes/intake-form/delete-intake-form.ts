import { NotFoundError } from '@/lib/errors.js';
import { prisma } from '@monteiro/db';
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { intakeFormIdParamsSchema } from './intake-form.schemas.js';

export const deleteIntakeForm = async (app: FastifyInstance) => {
    const server = app.withTypeProvider<ZodTypeProvider>();

    server.delete(
        '/intake-forms/:id',
        {
            schema: {
                operationId: 'deleteIntakeForm',
                tags: ['Intake Forms'],
                summary: 'Remove uma ficha de atendimento',
                params: intakeFormIdParamsSchema,
                response: {
                    204: z.void(),
                },
            },
        },
        async (request, reply) => {
            const existingIntakeForm = await prisma.intakeForm.findUnique({
                where: { id: request.params.id },
            });

            if (!existingIntakeForm) {
                throw new NotFoundError('Ficha de atendimento não encontrada');
            }

            await prisma.intakeForm.delete({ where: { id: request.params.id } });

            return reply.status(204).send();
        },
    );
};
