import { ClientStatus, PersonType } from '@monteiro/db';
import { z } from 'zod';

export const clientResponseSchema = z.object({
    id: z.string().uuid(),
    personType: z.nativeEnum(PersonType),
    name: z.string(),
    document: z.string().nullable(),
    secondaryId: z.string().nullable(),
    birthDate: z.coerce.date().nullable(),
    maritalStatus: z.string().nullable(),
    occupation: z.string().nullable(),
    phone: z.string().nullable(),
    whatsapp: z.string().nullable(),
    email: z.string().nullable(),
    zipCode: z.string().nullable(),
    street: z.string().nullable(),
    number: z.string().nullable(),
    complement: z.string().nullable(),
    neighborhood: z.string().nullable(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    notes: z.string().nullable(),
    status: z.nativeEnum(ClientStatus),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export const errorSchema = z.object({
    error: z.string(),
    code: z.string(),
    message: z.string(),
});

export const clientIdParamsSchema = z.object({
    id: z.string().uuid(),
});
