import { UnauthorizedError } from '@/lib/errors.js';
import { prisma, UserRole } from '@monteiro/db';
import bcrypt from 'bcryptjs';
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const responseSchema = z.object({
    token: z.string(),
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

export const authenticateUser = async (app: FastifyInstance) => {
    const server = app.withTypeProvider<ZodTypeProvider>();

    server.post(
        '/auth/login',
        {
            schema: {
                operationId: 'authenticateUser',
                tags: ['Auth'],
                summary: 'Autentica um usuário e retorna um token JWT',
                body: bodySchema,
                response: {
                    200: responseSchema,
                    401: errorSchema,
                },
            },
        },
        async (request, reply) => {
            const { email, password } = request.body;

            const user = await prisma.user.findUnique({ where: { email } });

            if (!user || !user.isActive) {
                throw new UnauthorizedError('Credenciais inválidas');
            }

            const passwordMatches = await bcrypt.compare(password, user.passwordHash);

            if (!passwordMatches) {
                throw new UnauthorizedError('Credenciais inválidas');
            }

            const token = await reply.jwtSign({
                userId: user.id,
                email: user.email,
                role: user.role,
            });

            return reply.send({
                token,
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
