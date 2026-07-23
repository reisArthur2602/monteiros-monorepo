import swagger from '@fastify/swagger';
import scalarApiReference from '@scalar/fastify-api-reference';
import type { FastifyInstance } from 'fastify';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

export const registerDocs = async (app: FastifyInstance) => {
    await app.register(swagger, {
        openapi: {
            info: {
                title: 'Monteiro API',
                description:
                    'Plataforma de gestão completa para o escritório de advocacia Monteiro Sociedade de Advogados',
                version: '1.0.0',
                // contact: {
                //     name: 'Monteiro Sociedade de Advogados',
                //     email: 'support@monteiro.adv.br',
                // },
                license: {
                    name: 'Proprietary',
                },
            },
            // servers: [
            //     {
            //         url: 'http://localhost:3000',
            //         description: 'Local Development',
            //     },
            //     {
            //         url: 'https://api.monteiro.adv.br',
            //         description: 'Production',
            //     },
            // ],
        },
        transform: jsonSchemaTransform,
    });

    await app.register(scalarApiReference, {
        routePrefix: '/docs',
    });
};
