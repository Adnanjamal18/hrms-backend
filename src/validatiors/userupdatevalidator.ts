import z from "zod";
export const updateuserschema = z.object({
    fullname: z.string(),
    roleId:z.string()
})