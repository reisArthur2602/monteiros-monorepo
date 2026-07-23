import { PersonType, prisma } from '@monteiro/db';
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { clientResponseSchema } from './client.schemas.js';

const bodySchema = z.object({
    personType: z.nativeEnum(PersonType).default(PersonType.INDIVIDUAL),
    name: z.string().min(2).max(200),
    document: z.string().max(20).optional(),
    secondaryId: z.string().max(30).optional(),
    birthDate: z.coerce.date().optional(),
    maritalStatus: z.string().max(50).optional(),
    occupation: z.string().max(100).optional(),
    phone: z.string().max(30).optional(),
    whatsapp: z.string().max(30).optional(),
    email: z.string().email().max(150).optional(),
    zipCode: z.string().max(20).optional(),
    street: z.string().optional(),
    number: z.string().max(20).optional(),
    complement: z.string().max(100).optional(),
    neighborhood: z.string().max(100).optional(),
    city: z.string().max(100).optional(),
    state: z.string().max(2).optional(),
    notes: z.string().optional(),
});

export const createClient = async (app: FastifyInstance) => {
    const server = app.withTypeProvider<ZodTypeProvider>();

    server.post(
        '/clients',
        {
            schema: {
                operationId: 'createClient',
                tags: ['Clients'],
                summary: 'Cria um novo cliente',
                body: bodySchema,
                response: {
                    201: clientResponseSchema,
                },
            },
        },
        async (request, reply) => {
            const client = await prisma.client.create({
                data: {
                    ...request.body,
                    createdById: request.user.userId,
                },
            });

            return reply.status(201).send(client);
        },
    );
};
