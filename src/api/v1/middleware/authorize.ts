import { Request, Response, NextFunction } from "express";
import { AuthorizationOptions } from "../models/authorizationOptions";
import { MiddlewareFunction } from "../types/expressTypes";
import { AuthorizationError } from "../errors/errors";


const authorize =
  ({ hasRole }: AuthorizationOptions): MiddlewareFunction =>
  (req, res, next) => {
    if (!hasRole.includes(res.locals.role)) {
      throw new AuthorizationError("Forbidden: Access denied", "FORBIDDEN");
    }
    next();
  };

export default authorize;
