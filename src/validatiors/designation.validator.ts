import z from "zod";

export const designationSchema = z.object({
  post: z.string().min(1, "Post name is required"),
  description: z.string().optional(),
});
