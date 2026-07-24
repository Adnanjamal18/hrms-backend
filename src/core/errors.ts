import type { Request, Response, NextFunction ,} from "express";
import logger from "../utils/logger.js";

// This chunk of code is the Global Error Handler middleware.
// Notice it has FOUR arguments instead of three: (err, req, res, next).
// Express recognizes middleware with 4 arguments as an error handler.
const errorhandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  // We use our Winston logger to log the error message and the path where it happened
  logger.error(`Error processing [${req.method}] ${req.originalUrl}: ${err.message}`);
  
  // We also log the full stack trace (the technical path of the error in the code)
  logger.error(err.stack || err);

  // We determine the status code. If the error doesn't specify one, we default to 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Finally, we send a JSON response back to the client with the error details.
  res.status(statusCode).json({
    error: message,
    // It's a security best practice to hide the stack trace in production environments!
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
};

export { errorhandler };
