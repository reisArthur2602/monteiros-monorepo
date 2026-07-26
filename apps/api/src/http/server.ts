import { env } from '@monteiro/env';
import { buildApp } from './app.js';

const main = async () => {
    const app = await buildApp();

    try {
        await app.listen({ port: env.PORT, host: '0.0.0.0' });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

main();
