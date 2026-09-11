import { z } from "zod";

export const createTaskSchema = z.object({
  taskName: z.string().min(1, "Task name is required"),
  taskDescription: z.string().optional(),
  storyPoint: z.number().int().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  projectId: z.number().int(),
  assignedTo: z.string().min(1, "Assignee is required"),
});

export const updateTaskSchema = z.object({
  taskName: z.string().optional(),
  taskDescription: z.string().optional(),
  storyPoint: z.number().int().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "REVIEW", "DONE"]).optional(),
  assignedTo: z.string().optional(),
  duration: z.number().int().optional(),
});
