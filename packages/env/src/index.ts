import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { config } from 'dotenv';
import { z } from 'zod';

/*
 * Resolvido relativo a este arquivo (não ao process.cwd() de quem importa),
 * pois esse pacote pode ser carregado tanto pela API (cwd apps/api) quanto
 * pelo Prisma CLI (cwd packages/db) — dotenv sozinho usa cwd e resolveria
 * para o .env errado dependendo de quem importou primeiro.
 */
const envFilePath = resolve(__dirname, '..', '.env');

if (existsSync(envFilePath)) {
    config({ path: envFilePath });
}

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
    PORT: z.coerce.number().int().positive().default(3000),
    LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
    CORS_ORIGIN: z.string().default('*'),
    JWT_SECRET: z.string().default('dev-secret-change-in-production'),
    JWT_EXPIRES_IN: z.string().default('24h'),
    SMTP_HOST: z.string().default('localhost'),
    SMTP_PORT: z.coerce.number().int().positive().default(587),
    SMTP_SECURE: z.coerce.boolean().default(false),
    SMTP_USER: z.string().optional(),
    SMTP_PASSWORD: z.string().optional(),
    SMTP_FROM: z.string().default('Monteiro Sociedade de Advogados <no-reply@monteiro.adv.br>'),
    DATABASE_URL: z.string().min(1, 'DATABASE_URL é obrigatório'),
});

type Env = z.infer<typeof envSchema>;

let env: Env;

try {
    env = envSchema.parse(process.env);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.error('❌ Invalid environment variables:');
        error.issues.forEach((issue) => {
            console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
        });
    }
    process.exit(1);
}

export { env };
