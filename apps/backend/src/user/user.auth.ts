import type { IncomingHttpHeaders } from 'node:http';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { env } from '../env';

const AuthHeaderSchema = z.object({
  authorization: z.string({ message: 'Authorization header is required.' }),
});

const AuthPayloadSchema = z.object(
  {
    id: z.string().uuid(),
    name: z.string().max(50),
  },
  { message: 'Invalid token.' }
);

/**
 * Protect routes that require authorization and return user related data contained in the token.
 */
export function authUser(headers: IncomingHttpHeaders) {
  const { authorization } = AuthHeaderSchema.parse(headers);

  const [_, token] = authorization.split(' ');

  const decoded = jwt.verify(token, env.JWT_SECRET);

  return AuthPayloadSchema.parse(decoded);
}
