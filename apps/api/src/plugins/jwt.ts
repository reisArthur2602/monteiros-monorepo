import { env } from '@/env.js';
import jwt from '@fastify/jwt';
import { UserRole } from '@monteiro/db';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { z } from 'zod';

export const jwtPayloadSchema = z.object({
    userId: z.string().uuid(),
    email: z.string().email(),
    role: z.nativeEnum(UserRole),
});

export type JwtPayload = z.infer<typeof jwtPayloadSchema>;

declare module '@fastify/jwt' {
    interface FastifyJWT {
        payload: JwtPayload;
        user: JwtPayload;
    }
}

declare module 'fastify' {
    interface FastifyInstance {
        authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    }
}

export const registerJwt = fp(async (app: FastifyInstance) => {
    await app.register(jwt, {
        secret: env.JWT_SECRET,
        sign: {
            expiresIn: env.JWT_EXPIRES_IN,
        },
    });

    app.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify();
        } catch (error) {
            let code = 'INVALID_TOKEN';
            let message = 'Token inválido';

            if (error instanceof Error && error.message.includes('expired')) {
                code = 'TOKEN_EXPIRED';
                message = 'Token expirado';
            } else if (error instanceof Error && error.message.includes('missing')) {
                code = 'MISSING_TOKEN';
                message = 'Token não fornecido';
            }

            await reply.status(401).send({
                error: 'Unauthorized',
                code,
                message,
            });
        }
    });

    app.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
        const publicRoutes = ['/health', '/docs', '/auth/login'];

        if (publicRoutes.some((route) => request.url.startsWith(route))) {
            return;
        }

        await app.authenticate(request, reply);
    });
});
