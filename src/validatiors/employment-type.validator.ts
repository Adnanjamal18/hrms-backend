import z from "zod";

export const employmentTypeSchema = z.object({
  type: z.string().min(1, "Employment type is required"),
  description: z.string().optional(),
});
