import { hash, verify } from 'argon2';
import { eq, or } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { db } from '../database';
import { user } from '../database/schema';
import { env } from '../env';
import { defineController } from '../server';

const CreateUserSchema = z.object({
  name: z.string().max(50),
  email: z.string().email(),
  password: z.string(),
});

const AuthUserSchema = z.object({
  name: z.string().max(50).optional(),
  email: z.string().email().optional(),
  password: z.string(),
});

export const UserController = defineController(http => {
  http.post('/v1/user/create', async (request, reply) => {
    const { name, email, password } = CreateUserSchema.parse(request.body);

    const passwordHash = await hash(password);

    const [newUser] = await db.insert(user).values({ name, email, password: passwordHash }).returning({
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    });

    if (!newUser) {
      return reply.status(400).send({ message: 'Failed to create user.' });
    }

    const token = jwt.sign({ id: newUser.id, name: newUser.name }, env.JWT_SECRET, { expiresIn: '1d' });

    return reply.status(201).send({
      user: newUser,
      token,
    });
  });

  http.post('/v1/user/auth', async (request, reply) => {
    const { name, email, password } = AuthUserSchema.parse(request.body);

    const isIdentifierMissing = !(name || email);
    if (isIdentifierMissing) {
      return reply.status(400).send({
        message: 'An user identifier should be specified at least, name or e-mail.',
      });
    }

    const [existingUser] = await db
      .select()
      .from(user)
      .where(or(eq(user.name, name ?? ''), eq(user.email, email ?? '')))
      .limit(1);

    if (!existingUser) {
      return reply.status(400).send({
        message: 'The user does not exist.',
      });
    }

    const isPasswordMatching = await verify(existingUser.password, password);
    if (!isPasswordMatching) {
      return reply.status(400).send({
        message: 'The password does not match.',
      });
    }

    const token = jwt.sign({ id: existingUser.id, name: existingUser.name }, env.JWT_SECRET, { expiresIn: '1d' });

    return reply.status(200).send({
      user: { ...existingUser, password: undefined },
      token,
    });
  });
});
