import cors from '@fastify/cors';
import type { FastifyInstance } from 'fastify';
import { env } from '@monteiro/env';

export const registerCors = async (app: FastifyInstance) => {
    await app.register(cors, {
        origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN.split(','),
    });
};
