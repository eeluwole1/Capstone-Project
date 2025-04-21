import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { ValidationError } from "../errors/errors";

/**
 * Middleware to validate request input using a Joi schema.
 *
 * @param schema Joi schema to validate against
 * @param source Request object property: 'body', 'params', or 'query'
 */
export const validateInput = (
  schema: ObjectSchema,
  source: "body" | "params" | "query" = "body"
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req[source], { abortEarly: false });

    if (error) {
      const details = error.details.map(detail => detail.message);
      return next(new ValidationError("Validation failed", details));
    }

    next();
  };
};
