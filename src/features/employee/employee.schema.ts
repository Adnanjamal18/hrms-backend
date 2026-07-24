import { z } from "zod";

export const createEmployeeSchema = z.object({
  experience: z.number(),
  resumeLink: z.string().optional(),
  linkedinUrl: z.string().optional(),
  address: z.string().optional(),
  accountNumber: z.string().optional(),
  ifscCode: z.string().optional(),
  bankName: z.string().optional(),
  branch: z.string().optional(),
  username: z.string(),
  fullName: z.string(),
  email: z.string(),
  password: z.string(),
  mobile: z.string(),
  roleId: z.number(),
});

export const updateEmployeeSchema = z.object({
  experience: z.number().optional(),
  resumeLink: z.string().optional(),
  linkedinUrl: z.string().optional(),
  address: z.string().optional(),
  accountNumber: z.string().optional(),
  ifscCode: z.string().optional(),
  bankName: z.string().optional(),
  branch: z.string().optional(),
  username: z.string().optional(),
  fullName: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  mobile: z.number().optional(),
  roleId: z.number().optional(),
});

export const assignDepartmentSchema = z.object({
  departmentId: z.number(),
});
