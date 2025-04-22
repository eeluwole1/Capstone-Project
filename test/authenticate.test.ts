import { Request, Response, NextFunction } from "express";
import authenticate from ".././src/api/v1/middleware/authenticate";
import { AuthenticationError } from ".././src/api/v1/errors/errors";

jest.mock(".././config/firebaseConfig", () => ({
  auth: {
    verifyIdToken: jest.fn(),
  },
}));

const { auth } = require("../../src/config/firebaseConfig");

describe("authenticate middleware", () => {
  const mockReq = {
    headers: {
      authorization: "Bearer valid-token",
    },
  } as unknown as Request;

  const mockRes = {
    locals: {},
  } as Response;

  const next = jest.fn();

  it("should attach uid and role to res.locals", async () => {
    auth.verifyIdToken.mockResolvedValueOnce({
      uid: "user123",
      role: "admin",
    });

    await authenticate(mockReq, mockRes, next);

    expect(mockRes.locals.uid).toBe("user123");
    expect(mockRes.locals.role).toBe("admin");
    expect(next).toHaveBeenCalled();
  });

  it("should default role to 'user' if not provided", async () => {
    auth.verifyIdToken.mockResolvedValueOnce({ uid: "user456" });

    const res = { locals: {} } as Response;
    await authenticate(mockReq, res, next);

    expect(res.locals.uid).toBe("user456");
    expect(res.locals.role).toBe("user");
    expect(next).toHaveBeenCalled();
  });

  it("should throw TOKEN_NOT_FOUND if no token", async () => {
    const req = { headers: {} } as Request;

    await expect(authenticate(req, mockRes, next)).rejects.toThrow(AuthenticationError);
  });

  it("should throw TOKEN_INVALID if verification fails", async () => {
    auth.verifyIdToken.mockRejectedValueOnce(new Error("Invalid token"));

    await expect(authenticate(mockReq, mockRes, next)).rejects.toThrow(AuthenticationError);
  });
});
