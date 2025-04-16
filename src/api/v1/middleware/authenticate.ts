import { Request, Response, NextFunction } from "express";
import { DecodedIdToken } from "firebase-admin/auth";
import { auth } from "../../../../config/firebaseConfig";
import { AuthenticationError } from "../errors/errors";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AuthenticationError("Unauthorized: No token provided", "TOKEN_NOT_FOUND");
  }

  try {
    const decoded: DecodedIdToken = await auth.verifyIdToken(token);
    res.locals.uid = decoded.uid;
    res.locals.role = decoded.role || "user";
    return next();
  } catch {
    throw new AuthenticationError("Unauthorized: Invalid token", "TOKEN_INVALID");
  }
};

export default authenticate;
