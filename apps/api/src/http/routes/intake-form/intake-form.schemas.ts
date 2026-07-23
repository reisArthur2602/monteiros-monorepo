import { IntakeFormStatus, UrgencyLevel, ViabilityStatus } from '@monteiro/db';
import { z } from 'zod';

export const intakeFormResponseSchema = z.object({
    id: z.string().uuid(),
    clientId: z.string().uuid(),
    lawyerId: z.string().uuid().nullable(),
    attendantId: z.string().uuid().nullable(),
    serviceDate: z.coerce.date(),
    clientStatement: z.string(),
    preliminaryAnalysis: z.string().nullable(),
    legalArea: z.string().nullable(),
    urgency: z.nativeEnum(UrgencyLevel).nullable(),
    viability: z.nativeEnum(ViabilityStatus).nullable(),
    status: z.nativeEnum(IntakeFormStatus),
    recommendation: z.string().nullable(),
    pendingDocumentsNote: z.string().nullable(),
    pdfUrl: z.string().nullable(),
    emailSent: z.boolean(),
    finalizedAt: z.coerce.date().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export const errorSchema = z.object({
    error: z.string(),
    code: z.string(),
    message: z.string(),
});

export const intakeFormIdParamsSchema = z.object({
    id: z.string().uuid(),
});
