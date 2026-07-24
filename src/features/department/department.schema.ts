import {z} from "zod"

export const createDepartmentSchema = z.object({
    departmentName: z.string(),
    departmentCode: z.number(),
    departmentUrl: z.string().optional()
})

export const updateDepartmentSchema = z.object({
    departmentName: z.string().optional(),
    departmentCode: z.number().optional(),
    departmentUrl: z.string().optional()
})