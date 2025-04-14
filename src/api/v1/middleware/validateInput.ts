
import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { ValidationError } from "../errors/errors";

/**
 * Middleware to validate incoming request body using Joi schema.
 * Throws a ValidationError if validation fails.
 *
 * @param schema Joi schema to validate against
 */
export const validateInput = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const details = error.details.map(detail => detail.message);
      return next(new ValidationError("Validation failed", details));
    }

    next();
  };
};
