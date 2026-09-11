import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  managerId: z.string().min(1, "Manager ID is required"),
  teamLeadId: z.string().min(1, "Team Lead ID is required"),
  departmentId: z.number().or(z.string().regex(/^\d+$/).transform(Number)),
});5

export const assignProjectManagerSchema = z.object({
  id: z.number().or(z.string().regex(/^\d+$/).transform(Number)),
  managerId: z.string().min(1, "Manager ID is required"),
  departmentId: z.number().or(z.string().regex(/^\d+$/).transform(Number)),
});

export const assignProjectEmployeeSchema = z.object({
  projectId: z.number().or(z.string().regex(/^\d+$/).transform(Number)),
  employeeUserId: z.string().min(1, "Employee User ID is required"),
});
