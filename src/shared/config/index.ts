import { z } from 'zod';

export const configSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  GQL_URL: z.url(),
  AUTH_SECRET: z.string(),
});

export const config = configSchema.parse(process.env);
