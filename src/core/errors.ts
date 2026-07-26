import type { Request, Response, NextFunction ,} from "express";
import { logger } from "../utils/logger.js";

// This chunk of code is the Global Error Handler middleware.
// Notice it has FOUR arguments instead of three: (err, req, res, next).
// Express recognizes middleware with 4 arguments as an error handler.
const errorhandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  logger.error(`Error processing [${req.method}] ${req.originalUrl}: ${err.message}`);
  logger.error(err.stack || err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Prisma Error Handling
  if (err.code === "P2002") {
    statusCode = 400;
    const target = Array.isArray(err.meta?.target) ? err.meta.target.join(", ") : "field";
    message = `A record with this ${target} already exists. Please use a unique value.`;
  } else if (err.code === "P2003") {
    statusCode = 400;
    const fieldName = typeof err.meta?.field_name === "string" ? err.meta.field_name : "";
    if (fieldName.includes("role") || err.message?.includes("users_role_id_fkey")) {
      message = "The selected Role ID does not exist in the database.";
    } else if (fieldName.includes("department") || err.message?.includes("department_id")) {
      message = "The selected Department ID does not exist.";
    } else {
      message = "Referenced relation does not exist in the system.";
    }
  } else if (err.code === "P2025") {
    statusCode = 404;
    message = "The requested record could not be found.";
  }

  res.status(statusCode).json({
    error: message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
};

export { errorhandler };
