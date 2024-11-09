import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../database';
import { list_tag, tag } from '../database/schema';
import { defineController } from '../server';
import { authUser } from '../user/user.auth';

const CreateTagSchema = z.object({
  name: z.string().max(50),
});

const EditTagSchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(50),
});

const DeleteTagSchema = z.object({
  id: z.string().uuid(),
});

const ListIdParamSchema = z.object({
  list_id: z.string().uuid(),
});

const TagIdParamSchema = z.object({
  tag_id: z.string().uuid(),
});

const ListTagParamsSchema = z.object({
  list_id: z.string().uuid(),
  tag_id: z.string().uuid(),
});

export const TagController = defineController(http => {
  http.get('/v1/tags', async (request, reply) => {
    const { id } = authUser(request.headers);

    const tags = await db.select().from(tag).where(eq(tag.user_id, id));

    return reply.send(tags);
  });

  http.get('/v1/list/:list_id/tags', async (request, reply) => {
    const { id: user_id } = authUser(request.headers);
    const { list_id } = ListIdParamSchema.parse(request.params);

    const tags = await db
      .select({
        id: tag.id,
        name: tag.name,
        user_id: tag.user_id,
        created_at: tag.created_at,
      })
      .from(list_tag)
      .innerJoin(tag, eq(tag.id, list_tag.tag_id))
      .where(and(eq(list_tag.list_id, list_id), eq(tag.user_id, user_id)));

    return reply.send(tags);
  });

  http.post('/v1/tag/create', async (request, reply) => {
    const { id } = authUser(request.headers);
    const { name } = CreateTagSchema.parse(request.body);

    const [existingTag] = await db
      .select({ id: tag.id })
      .from(tag)
      .where(and(eq(tag.user_id, id), eq(tag.name, name)))
      .limit(1);

    if (existingTag) {
      return reply.status(409).send({
        message: 'A tag with this name already exists.',
      });
    }

    const [newTag] = await db
      .insert(tag)
      .values({
        name,
        user_id: id,
      })
      .returning();

    return reply.status(201).send(newTag);
  });

  http.put('/v1/tag/edit', async (request, reply) => {
    const { id: user_id } = authUser(request.headers);
    const { id, name } = EditTagSchema.parse(request.body);

    const [existingTag] = await db
      .select()
      .from(tag)
      .where(and(eq(tag.id, id), eq(tag.user_id, user_id)))
      .limit(1);

    if (!existingTag) {
      return reply.status(409).send({
        message: 'The tag does not exist.',
      });
    }

    const [editedTag] = await db
      .update(tag)
      .set({ name })
      .where(and(eq(tag.id, id), eq(tag.user_id, user_id)))
      .returning();

    if (!editedTag) {
      return reply.status(500).send({
        message: 'Failed to edit tag details.',
      });
    }

    return reply.send(editedTag);
  });

  http.delete('/v1/tag/delete', async (request, reply) => {
    const { id: user_id } = authUser(request.headers);
    const { id } = DeleteTagSchema.parse(request.body);

    const [existingTag] = await db
      .select()
      .from(tag)
      .where(and(eq(tag.id, id), eq(tag.user_id, user_id)))
      .limit(1);

    if (!existingTag) {
      return reply.status(409).send({
        message: 'The tag does not exist.',
      });
    }

    await db.delete(list_tag).where(eq(list_tag.tag_id, id));

    const { rowCount } = await db.delete(tag).where(and(eq(tag.id, id), eq(tag.user_id, user_id)));

    if (rowCount === 0) {
      return reply.status(500).send({
        message: 'Failed to delete tag.',
      });
    }

    return reply.status(204).send();
  });

  http.delete('/v1/list/:list_id/tag/:tag_id', async (request, reply) => {
    const { id: user_id } = authUser(request.headers);
    const { list_id, tag_id } = ListTagParamsSchema.parse(request.params);

    const [existingTag] = await db
      .select()
      .from(tag)
      .where(and(eq(tag.id, tag_id), eq(tag.user_id, user_id)))
      .limit(1);

    if (!existingTag) {
      return reply.status(404).send({
        message: 'Tag not found.',
      });
    }

    const { rowCount } = await db
      .delete(list_tag)
      .where(and(eq(list_tag.list_id, list_id), eq(list_tag.tag_id, tag_id)));

    if (rowCount === 0) {
      return reply.status(409).send({
        message: 'Failed to delete tag from this list.',
      });
    }

    return reply.status(204).send();
  });
});
