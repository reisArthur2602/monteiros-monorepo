import { UserRole } from '@monteiro/db';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

export type AuthorizeHandler = (request: FastifyRequest, reply: FastifyReply) => Promise<void>;

declare module 'fastify' {
    interface FastifyInstance {
        authorize: (allowedRoles: UserRole[]) => AuthorizeHandler;
    }
}

export const registerAuthorize = fp(async (app: FastifyInstance) => {
    app.decorate('authorize', (allowedRoles: UserRole[]) => {
        return async (request: FastifyRequest, reply: FastifyReply) => {
            const userRole = request.user?.role;

            if (!userRole) {
                await reply.status(401).send({
                    error: 'Unauthorized',
                    code: 'MISSING_TOKEN',
                    message: 'Token não fornecido',
                });
                return;
            }

            if (!allowedRoles.includes(userRole)) {
                await reply.status(403).send({
                    error: 'Forbidden',
                    code: 'INSUFFICIENT_PERMISSIONS',
                    message: 'Você não tem permissão para acessar este recurso',
                });
            }
        };
    });
});
