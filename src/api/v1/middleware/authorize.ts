import { Request, Response, NextFunction } from "express";
import { AuthorizationOptions } from "../models/authorizationOptions";
import { MiddlewareFunction } from "../types/expressTypes";
import { AuthorizationError } from "../errors/errors";

/**
 * Middleware to authorize users based on their role.
 *
 * @param hasRole - Array of allowed roles (e.g., ["admin", "user"])
 * @returns Middleware function that allows or denies access
 *
 * Usage:
 * router.get("/admin", authenticate, authorize({ hasRole: ["admin"] }), handler);
 */
const authorize =
  ({ hasRole }: AuthorizationOptions): MiddlewareFunction =>
  (req: Request, res: Response, next: NextFunction): void => {
    const userRole = res.locals.role;

    // Check if the role is attached
    if (!userRole) {
      throw new AuthorizationError("Forbidden: No role found", "NO_ROLE");
    }

    // Validate that the user’s role is permitted
    if (!hasRole.includes(userRole)) {
      throw new AuthorizationError("Forbidden: Access denied", "FORBIDDEN");
    }

    next();
  };

export default authorize;
