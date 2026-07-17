import { z } from "zod";

// This chunk of code defines a "Schema" using Zod.
// A schema describes the exact structure, types, and rules that incoming data must follow.
export const registerSchema = z.object({
  // We expect a string. min(1) ensures it's not empty, and provides a custom error message.
  name: z.string().min(1, "Name is required"),
  // We expect a valid email format. Zod has a built-in email() validator!
  email: z.string().email("Invalid email format"),
  // Password must be a string of at least 6 characters.
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// This chunk of code defines the schema for the Login route.
// It's similar, but we only need email and password.
export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});
