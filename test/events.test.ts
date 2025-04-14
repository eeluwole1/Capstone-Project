import request from "supertest";
import app from "../src/app";

describe("Events API", () => {
  let eventId = "";

  const eventData = {
    name: "Test Event",
    date: "2025-06-01",
    location: "Test City",
    organizer: "Royal Wolesax"
  };

  it("should create a new event", async () => {
    const response = await request(app)
      .post("/api/v1/events")
      .send(eventData);

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data.name).toBe(eventData.name);
    eventId = response.body.data.id;
  });

  it("should fetch all events", async () => {
    const response = await request(app).get("/api/v1/events");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should update an event", async () => {
    const response = await request(app)
      .put(`/api/v1/events/${eventId}`)
      .send({ name: "Updated Event Name" });

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("Updated Event Name");
  });

  it("should delete an event", async () => {
    const response = await request(app).delete(`/api/v1/events/${eventId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(/deleted/i);
  });
});
