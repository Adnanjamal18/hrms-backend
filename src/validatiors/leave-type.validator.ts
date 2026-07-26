import z from "zod";

export const leaveTypeSchema = z.object({
  type: z.string().min(1, "Leave type is required"),
  description: z.string().optional(),
});
