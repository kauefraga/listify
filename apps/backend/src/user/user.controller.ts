import { hash } from 'argon2';
import { z } from 'zod';
import { db } from '../database';
import { user } from '../database/schema';
import { defineController } from '../server';

const CreateUserSchema = z.object({
  name: z.string().max(50),
  email: z.string().email(),
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

    return reply.status(201).send(newUser);
  });
});
