import { prisma, PrismaClient } from '@monteiro/db';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient;
    }
}

export const registerPrisma = fp(async (app: FastifyInstance) => {
    await prisma.$connect();

    app.decorate('prisma', prisma);

    app.addHook('onClose', async (instance) => {
        await instance.prisma.$disconnect();
    });
});
