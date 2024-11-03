import 'dotenv/config';
import { z } from 'zod';

const EnvSchema = z.object({
  DATABASE_URL: z.string().startsWith('postgres://'),
});

export const env = EnvSchema.parse(process.env);
