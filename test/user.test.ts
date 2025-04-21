import request from "supertest";
import app from "../src/app";
import * as userService from "../src/api/v1/services/userService";
jest.mock("../src/api/v1/middleware/authenticate");
jest.mock("../src/api/v1/middleware/authorize");


jest.mock("../src/api/v1/services/userService");

describe("User API", () => {
  const mockUser = {
    id: "user123",
    name: "Elusiyan Mathew Eluwole",
    email: "engrwolesax@gmail.com",
    role: "attendee"
  };

  beforeEach(() => {
    (userService.fetchAllUsers as jest.Mock).mockResolvedValue([mockUser]);
    (userService.addUser as jest.Mock).mockResolvedValue(mockUser);
    (userService.modifyUser as jest.Mock).mockResolvedValue(mockUser);
    (userService.removeUser as jest.Mock).mockResolvedValue(mockUser);
  });

  it("GET /users - fetch all users", async () => {
    const res = await request(app).get("/api/v1/users");

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([mockUser]);
    expect(res.body.message).toMatch(/fetched/i);
  });

  it("POST /users - create a new user", async () => {
    const res = await request(app)
      .post("/api/v1/users")
      .send({
        name: "Elusiyan Mathew Eluwole",
        email: "engrwolesax@gmail.com",
        role: "attendee"
      });

    expect(res.status).toBe(201);
    expect(res.body.data).toEqual(mockUser);
    expect(userService.addUser).toHaveBeenCalledWith(
      "Elusiyan Mathew Eluwole",
      "engrwolesax@gmail.com",
      "attendee"
    );
  });

  it("PUT /users/:id - update a user", async () => {
    const res = await request(app)
      .put("/api/v1/users/user123")
      .send({ name: "Updated Name" });

    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("Elusiyan Mathew Eluwole");
    expect(userService.modifyUser).toHaveBeenCalledWith("user123", "Updated Name");
  });

  it("DELETE /users/:id - delete a user", async () => {
    const res = await request(app).delete("/api/v1/users/user123");

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
    expect(userService.removeUser).toHaveBeenCalledWith("user123");
  });

  it("PUT /users/:id - user not found", async () => {
    (userService.modifyUser as jest.Mock).mockResolvedValue(null);

    const res = await request(app)
      .put("/api/v1/users/invalidId")
      .send({ name: "Ghost User" });

    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });

  it("DELETE /users/:id - user not found", async () => {
    (userService.removeUser as jest.Mock).mockResolvedValue(null);

    const res = await request(app).delete("/api/v1/users/invalidId");

    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });
});
