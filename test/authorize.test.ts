import { Request, Response, NextFunction } from "express";
import authorize from ".././src/api/v1/middleware/authorize";
import { AuthorizationError } from ".././src/api/v1/errors/errors";

describe("authorize middleware", () => {
  const req = {} as Request;
  const next = jest.fn();

  it("should allow access if role matches", () => {
    const res = { locals: { role: "admin" } } as unknown as Response;
    const middleware = authorize({ hasRole: ["admin"] });

    middleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("should throw error if role does not match", () => {
    const res = { locals: { role: "user" } } as unknown as Response;
    const middleware = authorize({ hasRole: ["admin"] });

    expect(() => middleware(req, res, next)).toThrow(AuthorizationError);
  });

  it("should throw error if no role found", () => {
    const res = { locals: {} } as unknown as Response;
    const middleware = authorize({ hasRole: ["admin"] });

    expect(() => middleware(req, res, next)).toThrow("Forbidden: No role found");
  });
});
