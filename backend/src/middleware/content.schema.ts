import * as z from 'zod';

export const createContentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  Link: z.string().url("Invalid URL"),
  tags: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid tag ID")).optional(),
});

export const updateContentSchema = createContentSchema.partial();

export type CreateContentInput = z.infer<typeof createContentSchema>;
export type UpdateContentInput = z.infer<typeof updateContentSchema>;