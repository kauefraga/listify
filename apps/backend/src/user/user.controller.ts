import argon2 from 'argon2';
import { eq, or } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { db } from '../database';
import { user } from '../database/schema';
import { env } from '../env';
import { defineController } from '../server';
import { authUser } from './user.auth';

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

const EditUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(50).optional(),
  email: z.string().email().optional(),
});

export const UserController = defineController(http => {
  http.post('/v1/user/create', async (request, reply) => {
    const { name, email, password } = CreateUserSchema.parse(request.body);

    const passwordHash = await argon2.hash(password);

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
      return reply.status(409).send({
        message: 'The user does not exist.',
      });
    }

    const isPasswordMatching = await argon2.verify(existingUser.password, password);
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

  http.put('/v1/user/edit', async (request, reply) => {
    const { id } = authUser(request.headers);
    const { name, email } = EditUserSchema.parse(request.body);

    const [existingUser] = await db.select().from(user).where(eq(user.id, id)).limit(1);

    if (!existingUser) {
      return reply.status(409).send({
        message: 'The user does not exist.',
      });
    }

    const [editedUser] = await db
      .update(user)
      .set({
        name,
        email,
      })
      .where(eq(user.id, id))
      .returning({
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
      });

    if (!editedUser) {
      return reply.send(500).send({
        message: 'Failed to edit user details.',
      });
    }

    return reply.status(200).send(editedUser);
  });

  http.delete('/v1/user/delete', async (request, reply) => {
    const { id } = authUser(request.headers);

    const [existingUser] = await db.select().from(user).where(eq(user.id, id)).limit(1);

    if (!existingUser) {
      return reply.status(409).send({
        message: 'The user does not exist.',
      });
    }

    const { rowCount } = await db.delete(user).where(eq(user.id, id));

    if (rowCount === 0) {
      return reply.send(500).send({
        message: 'Failed to delete user.',
      });
    }

    return reply.status(204).send();
  });
});
