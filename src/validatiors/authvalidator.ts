import { z } from "zod";

//! THIS CODE WILL DESCRIBE THE SCHEMA STRUCTURE TYPES ,RULES THAT INCOMING DATA MUST FOLLOW
//? registerSchema is not a function.
//? It is a ZodObject instance returned by z.object(),
//*registerSchema
//*↓
//*ZodObject Instance
//? used to validate the incoming request body.
export const registerSchema = z.object({
fullName : z.string().min(6,"Name is required"),
password: z.string().min(6,"Too short"),
email:z.email("Please enter a valid email")
})
export const loginschema=z.object({
 email : z.email("Email is required"),
 password : z.string().min(5,"Password is required"),
})