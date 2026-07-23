import { prisma, UserRole } from '@monteiro/db';
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

const responseSchema = z.object({
    user: z.object({
        id: z.string().uuid(),
        name: z.string(),
        email: z.string().email(),
        role: z.nativeEnum(UserRole),
    }),
});

const errorSchema = z.object({
    error: z.string(),
    code: z.string(),
    message: z.string(),
});

export const getProfile = async (app: FastifyInstance) => {
    const server = app.withTypeProvider<ZodTypeProvider>();

    server.get(
        '/auth/me',
        {
            schema: {
                operationId: 'getProfile',
                tags: ['Auth'],
                summary: 'Retorna os dados do usuário autenticado',
                response: {
                    200: responseSchema,
                    401: errorSchema,
                },
            },
        },
        async (request, reply) => {
            const user = await prisma.user.findUnique({ where: { id: request.user.userId } });

            if (!user || !user.isActive) {
                return reply.status(401).send({
                    error: 'Unauthorized',
                    code: 'USER_NOT_FOUND',
                    message: 'Usuário não encontrado',
                });
            }

            return reply.send({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            });
        },
    );
};
