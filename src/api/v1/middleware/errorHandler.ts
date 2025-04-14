import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ValidationError, NotFoundError, DatabaseError, AppError } from "../errors/errors";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { errorResponse } from "../models/responseModel";

/**
 * Global error-handling middleware for an Express application.
 * Catches all errors passed to next() and formats them into a consistent response format.
 *
 * @param err - The error object passed from previous middleware or route handlers
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log the error message for debugging
  console.error(`Error: ${err.message}`);

  // Handle Validation Errors
  if (err instanceof ValidationError) {
    const details = err.details || [];
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      code: err.code,
      details
    });
    return;
  }

  // Handle Not Found Errors
  if (err instanceof NotFoundError) {
    res.status(err.statusCode).json(errorResponse(err.message, err.code));
    return;
  }

  // Handle Database Errors
  if (err instanceof DatabaseError) {
    res.status(err.statusCode).json(errorResponse(err.message, err.code));
    return;
  }

  // Handle General Application Errors
  if (err instanceof AppError) {
    res.status(err.statusCode).json(errorResponse(err.message, err.code));
    return;
  }

  // Handle Unknown or Unhandled Errors
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
    errorResponse("An unexpected error occurred", "UNKNOWN_ERROR")
  );
};

export default errorHandler;
