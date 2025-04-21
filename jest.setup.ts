// jest.setup.ts

jest.mock("./src/api/v1/middleware/authenticate", () => {
    return {
      __esModule: true,
      default: (_req: any, res: any, next: any) => {
        res.locals.uid = "mock-user";
        res.locals.role = "admin";
        next();
      }
    };
  });
  
  jest.mock("./src/api/v1/middleware/authorize", () => {
    return {
      __esModule: true,
      default: () => (_req: any, _res: any, next: any) => {
        next(); // Simply allow all
      }
    };
  });
  