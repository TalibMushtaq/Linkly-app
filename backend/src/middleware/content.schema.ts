import * as z from "zod";

export const createContentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.string().min(1, "type is required"),
  link: z.string().url("Invalid URL"),
  tags: z.array(z.string()).optional(),
});

export const updateContentSchema = createContentSchema.partial();

export type CreateContentInput = z.infer<typeof createContentSchema>;
export type UpdateContentInput = z.infer<typeof updateContentSchema>;
