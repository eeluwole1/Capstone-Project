import request from "supertest";
import app from "../src/app";

jest.mock("../src/api/v1/middleware/authenticate", () => ({
  __esModule: true,
  default: (_req: any, res: any, next: any) => {
    res.locals.uid = "mock-user";
    res.locals.role = "admin";
    next();
  }
}));

jest.mock("../src/api/v1/middleware/authorize", () => ({
  __esModule: true,
  default: () => (_req: any, _res: any, next: any) => {
    next();
  }
}));

describe("Artists API", () => {
  let artistId = "";

  // CREATE
  it("should create a new artist", async () => {
    const response = await request(app).post("/api/v1/artists").send({
      name: "John Doe",
      genre: "Jazz",
      event_id: 1,
    });

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("id");

    artistId = response.body.data.id;
  });

  // READ
  it("should fetch all artists", async () => {
    const response = await request(app).get("/api/v1/artists");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  // UPDATE
  it("should update the artist", async () => {
    const response = await request(app)
      .put(`/api/v1/artists/${artistId}`)
      .send({
        name: "John Smith",
        genre: "Rock",
      });

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("John Smith");
    expect(response.body.data.genre).toBe("Rock");
  });

  // DELETE
  it("should delete the artist", async () => {
    const response = await request(app).delete(`/api/v1/artists/${artistId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Artist deleted");
  });

  // FAIL CASE (Update non-existing)
  it("should return 404 for updating non-existing artist", async () => {
    const response = await request(app)
      .put("/api/v1/artists/fake-id")
      .send({ name: "No One", genre: "None" });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Artist not found");
  });
});
