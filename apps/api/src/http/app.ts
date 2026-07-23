import { authenticateUser } from '@/http/routes/auth/authenticate-user';
import { getProfile } from '@/http/routes/auth/get-profile';
import { createClient } from '@/http/routes/client/create-client';
import { deleteClient } from '@/http/routes/client/delete-client';
import { getClient } from '@/http/routes/client/get-client';
import { listClients } from '@/http/routes/client/list-clients';
import { updateClient } from '@/http/routes/client/update-client';
import { loggerOptions } from '@/lib/logger';
import { registerAuthorize } from '@/plugins/authorize';
import { registerCors } from '@/plugins/cors';
import { registerDocs } from '@/plugins/docs';
import { registerErrorHandler } from '@/plugins/error-handler';
import { registerJwt } from '@/plugins/jwt';
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
    await registerAuthorize(app);
    await registerDocs(app);

    app.get('/health', async () => ({ ok: true }));

    await app.register(authenticateUser);
    await app.register(getProfile);

    await app.register(createClient);
    await app.register(listClients);
    await app.register(getClient);
    await app.register(updateClient);
    await app.register(deleteClient);

    return app;
};
