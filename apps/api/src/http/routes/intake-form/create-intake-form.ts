import { NotFoundError } from '@/lib/errors.js';
import { prisma, UrgencyLevel, ViabilityStatus } from '@monteiro/db';
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { intakeFormResponseSchema } from './intake-form.schemas.js';

const bodySchema = z.object({
    clientId: z.string().uuid(),
    lawyerId: z.string().uuid().optional(),
    attendantId: z.string().uuid().optional(),
    clientStatement: z.string().min(1),
    preliminaryAnalysis: z.string().optional(),
    legalArea: z.string().max(100).optional(),
    urgency: z.nativeEnum(UrgencyLevel).optional(),
    viability: z.nativeEnum(ViabilityStatus).optional(),
    recommendation: z.string().optional(),
    pendingDocumentsNote: z.string().optional(),
});

export const createIntakeForm = async (app: FastifyInstance) => {
    const server = app.withTypeProvider<ZodTypeProvider>();

    server.post(
        '/intake-forms',
        {
            schema: {
                operationId: 'createIntakeForm',
                tags: ['Intake Forms'],
                summary: 'Cria uma nova ficha de atendimento',
                body: bodySchema,
                response: {
                    201: intakeFormResponseSchema,
                },
            },
        },
        async (request, reply) => {
            const client = await prisma.client.findUnique({
                where: { id: request.body.clientId },
            });

            if (!client) {
                throw new NotFoundError('Cliente não encontrado');
            }

            const intakeForm = await prisma.intakeForm.create({
                data: {
                    ...request.body,
                    createdById: request.user.userId,
                },
            });

            return reply.status(201).send(intakeForm);
        },
    );
};
