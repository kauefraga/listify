import { pgTable, serial, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
});

export const list = pgTable('list', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  content: text('content'),
  description: text('description'),
  type: text('type', { enum: ['bullet', 'check', 'numbered'] }).notNull(),
  user_id: uuid('user_id').references(() => user.id),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
});

export const tag = pgTable('tag', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  created_at: timestamp('created_at').notNull().defaultNow(),
});

export const list_tag = pgTable('list_tag', {
  id: serial('id').primaryKey(),
  list_id: uuid('list_id').references(() => list.id),
  tag_id: uuid('tag_id').references(() => tag.id),
});