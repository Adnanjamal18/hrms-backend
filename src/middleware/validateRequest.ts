import type { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { logger } from "../utils/logger.js";

// This chunk of code is a "higher-order function" - a function that returns a middleware function.
// We pass a z.ZodTypeAny to it, and it gives us back a middleware ready to validate requests against that schema.
export const validateRequest = (schema: z.ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // schema.parse() checks if req.body matches the structure we defined in our Zod schema.
      // If it doesn't match, it throws a ZodError, which is caught by the catch block.
    req.body = schema.parse(req.body);
      
      // If parsing succeeds, the data is valid, so we call next() to proceed to the controller.
      next();
    } catch (error) {
      // If the error is a validation error from Zod
      if (error instanceof ZodError) {
        logger.warn(`Validation failed for [${req.method}] ${req.originalUrl}`);
        
        // We format the Zod errors into a user-friendly response array
        const formattedErrors = error.issues.map((err: z.ZodIssue) => ({
          field: err.path.join("."), // e.g., "password"
          message: err.message       // e.g., "Password must be at least 6 characters long"
        }));

        res.status(400).json({
          error: "Validation Error",
          details: formattedErrors
        });
      } else {
        // If it's some other unexpected error, pass it to the global error handler
        next(error);
      }
    }
  };
};
