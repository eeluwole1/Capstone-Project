import request from "supertest";
import app from "../src/app";

describe("Ticket API Validation Tests", () => {
  describe("POST /api/v1/tickets", () => {
    it("should return 400 if event_id is missing", async () => {
      const res = await request(app).post("/api/v1/tickets").send({
        user_id: 101,
      });

      expect(res.status).toBe(400);
      expect(res.body.status).toBe("error");
      expect(res.body.message).toBe("Validation failed");
      expect(res.body).toHaveProperty("details");
    });

    it("should return 400 if user_id is missing", async () => {
      const res = await request(app).post("/api/v1/tickets").send({
        event_id: 101,
      });

      expect(res.status).toBe(400);
      expect(res.body.status).toBe("error");
      expect(res.body.message).toBe("Validation failed");
      expect(res.body).toHaveProperty("details");
    });

    it("should return 201 and ticket if data is valid", async () => {
      const res = await request(app).post("/api/v1/tickets").send({
        event_id: 101,
        user_id: 202,
      });

      expect(res.status).toBe(201);
      expect(res.body.message).toBe("Ticket booked");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("event_id", 101);
      expect(res.body.data).toHaveProperty("user_id", 202);
    });
  });

  describe("PUT /api/v1/tickets/:id", () => {
    it("should return 200 and update ticket if status is valid", async () => {
      // Create a valid ticket
      const createRes = await request(app).post("/api/v1/tickets").send({
        event_id: 999,
        user_id: 888,
      });

      expect(createRes.status).toBe(201);

      const ticketId = createRes.body.data.id;

      //Update the status of the created ticket
      const updateRes = await request(app)
        .put(`/api/v1/tickets/${ticketId}`)
        .send({ status: "canceled" });

      expect(updateRes.status).toBe(200);
      expect(updateRes.body.message).toBe("Ticket updated");
      expect(updateRes.body.data.status).toBe("canceled");

    });
  });
});
