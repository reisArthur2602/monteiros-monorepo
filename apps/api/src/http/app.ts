import { loggerOptions } from '@/lib/logger';
import { registerCors } from '@/plugins/cors';
import { registerErrorHandler } from '@/plugins/error-handler';
import { registerJwt } from '@/plugins/jwt';
import { registerDocs } from '@/plugins/docs';
import { registerRateLimit } from '@/plugins/rate-limit';
import Fastify from 'fastify';
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod';

export const buildApp = async () => {
    const app = Fastify({ logger: loggerOptions }).withTypeProvider<ZodTypeProvider>();

    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    await registerErrorHandler(app);
    await registerCors(app);
    await registerRateLimit(app);
    await registerJwt(app);
    await registerDocs(app);

    app.get('/health', async () => ({ ok: true }));

    return app;
};
