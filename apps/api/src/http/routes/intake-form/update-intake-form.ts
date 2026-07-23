import { NotFoundError } from '@/lib/errors.js';
import {
    IntakeFormStatus,
    prisma,
    UrgencyLevel,
    ViabilityStatus,
} from '@monteiro/db';
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { intakeFormIdParamsSchema, intakeFormResponseSchema } from './intake-form.schemas.js';

const bodySchema = z.object({
    lawyerId: z.string().uuid().optional(),
    attendantId: z.string().uuid().optional(),
    clientStatement: z.string().min(1).optional(),
    preliminaryAnalysis: z.string().optional(),
    legalArea: z.string().max(100).optional(),
    urgency: z.nativeEnum(UrgencyLevel).optional(),
    viability: z.nativeEnum(ViabilityStatus).optional(),
    status: z.nativeEnum(IntakeFormStatus).optional(),
    recommendation: z.string().optional(),
    pendingDocumentsNote: z.string().optional(),
    pdfUrl: z.string().optional(),
    emailSent: z.boolean().optional(),
    finalizedAt: z.coerce.date().optional(),
});

export const updateIntakeForm = async (app: FastifyInstance) => {
    const server = app.withTypeProvider<ZodTypeProvider>();

    server.patch(
        '/intake-forms/:id',
        {
            schema: {
                operationId: 'updateIntakeForm',
                tags: ['Intake Forms'],
                summary: 'Atualiza uma ficha de atendimento',
                params: intakeFormIdParamsSchema,
                body: bodySchema,
                response: {
                    200: intakeFormResponseSchema,
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

            const intakeForm = await prisma.intakeForm.update({
                where: { id: request.params.id },
                data: request.body,
            });

            return reply.send(intakeForm);
        },
    );
};
