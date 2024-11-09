import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../database';
import { list } from '../database/schema';
import { defineController } from '../server';
import { authUser } from '../user/user.auth';

const CreateListSchema = z.object({
  name: z.string().max(255),
  content: z.string(),
  description: z.string().optional(),
  type: z.enum(['bullet', 'check', 'numbered']),
});

const EditListSchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(255).optional(),
  content: z.string().optional(),
  description: z.string().optional(),
  type: z.enum(['bullet', 'check', 'numbered']).optional(),
});

const DeleteListSchema = z.object({
  id: z.string().uuid(),
});

export const ListController = defineController(http => {
  http.get('/v1/lists', async (request, reply) => {
    const { id } = authUser(request.headers);

    const lists = await db.select().from(list).where(eq(list.user_id, id));

    return reply.send(lists);
  });

  http.post('/v1/list/create', async (request, reply) => {
    const { id } = authUser(request.headers);
    const { name, content, type, description } = CreateListSchema.parse(request.body);

    // TODO: receive tags, create them if they don't exist and associate

    const [existingList] = await db
      .select({ id: list.id })
      .from(list)
      .where(and(eq(list.user_id, id), eq(list.name, name)))
      .limit(1);

    if (existingList) {
      return reply.status(409).send({
        message: 'The user already has a list with this name.',
      });
    }

    const [newList] = await db
      .insert(list)
      .values({
        name,
        content,
        type,
        description,
        user_id: id,
      })
      .returning();

    return reply.status(201).send(newList);
  });

  http.put('/v1/list/edit', async (request, reply) => {
    const { id: user_id } = authUser(request.headers);
    const { id, name, content, type, description } = EditListSchema.parse(request.body);

    // TODO: receive tags

    // TODO: validate type x content
    // if type == 'bullet' then content should only contain -/*/+ at the begin of each line

    const [existingList] = await db
      .select()
      .from(list)
      .where(and(eq(list.id, id), eq(list.user_id, user_id)))
      .limit(1);

    if (!existingList) {
      return reply.status(409).send({
        message: 'The list does not exist.',
      });
    }

    const [editedList] = await db
      .update(list)
      .set({
        name,
        content,
        type,
        description,
      })
      .where(and(eq(list.id, id), eq(list.user_id, user_id)))
      .returning();

    if (!editedList) {
      return reply.send(500).send({
        message: 'Failed to edit list details.',
      });
    }

    return reply.status(200).send(editedList);
  });

  http.delete('/v1/list/delete', async (request, reply) => {
    const { id: user_id } = authUser(request.headers);
    const { id } = DeleteListSchema.parse(request.body);

    const [existingList] = await db
      .select()
      .from(list)
      .where(and(eq(list.id, id), eq(list.user_id, user_id)))
      .limit(1);

    if (!existingList) {
      return reply.status(409).send({
        message: 'The list does not exist.',
      });
    }

    const { rowCount } = await db.delete(list).where(eq(list.id, id));

    if (rowCount === 0) {
      return reply.status(500).send({
        message: 'Failed to delete list.',
      });
    }

    return reply.status(204).send();
  });
});
