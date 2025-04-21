import { Request, Response, NextFunction } from "express";
import { DecodedIdToken } from "firebase-admin/auth";
import { auth } from "../../../../config/firebaseConfig";
import { AuthenticationError } from "../errors/errors";


/**
 * Middleware to authenticate requests using Firebase ID token.
 *
 * - Extracts bearer token from Authorization header
 * - Verifies token with Firebase Admin SDK
 * - Attaches `uid` and `role` to `res.locals`
 */

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AuthenticationError("Unauthorized: No token provided", "TOKEN_NOT_FOUND");
    }

    const token = authHeader.split(" ")[1];
    const decoded: DecodedIdToken = await auth.verifyIdToken(token);

    // Store UID and role in res.locals for downstream use
    res.locals.uid = decoded.uid;
    res.locals.role = decoded.role || "user";

    next();
  } catch (err) {
    console.error("Authentication failed:", err);
    throw new AuthenticationError("Unauthorized: Invalid token", "TOKEN_INVALID");
  }
};

export default authenticate;

