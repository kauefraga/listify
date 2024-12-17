import { z } from 'zod';

export const symbolToType = {
  '*': 'bullet',
  '-': 'bullet',
  '+': 'bullet',
  '0.': 'numbered',
  '1.': 'numbered',
  '0)': 'numbered',
  '1)': 'numbered',
  '[': 'check', // when '[ ]'
  '[]': 'check',
  '[x]': 'check',
};

export const ListSchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(255),
  content: z.string(),
  description: z.string().optional(),
  type: z.enum(['bullet', 'check', 'numbered']),
  created_at: z.date().default(new Date()),
  updated_at: z.date().optional(),
});

export type List = z.infer<typeof ListSchema>;
