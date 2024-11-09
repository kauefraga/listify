import 'dotenv/config';
import { z } from 'zod';

const EnvSchema = z.object({
  DATABASE_URL: z.string().startsWith('postgres://'),
  JWT_SECRET: z.string().min(15),
});

export const env = EnvSchema.parse(process.env);
