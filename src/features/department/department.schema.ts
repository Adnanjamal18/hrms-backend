import {z} from "zod"

export const createDepartmentSchema = z.object({
    departmentName: z.string(),
    departmentCode: z.number(),
    departmentUrl: z.string().optional()
})