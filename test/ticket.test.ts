import request from "supertest";
import app from "../src/app";
import * as ticketService from "../src/api/v1/services/ticketService";
import * as pdfService from "../src/api/v1/services/pdfService";

//Corrected mock paths (only go up one level)
jest.mock("../src/api/v1/services/ticketService");
jest.mock("../src/api/v1/services/pdfService");

describe("Ticket API", () => {
  const mockTicket = {
    id: "abc123",
    event_id: 1,
    user_id: 1,
    status: "booked"
  };

  const mockPdfPath = "/generated/ticket-abc123.pdf";

  beforeEach(() => {
    (ticketService.fetchAllTickets as jest.Mock).mockResolvedValue([mockTicket]);
    (ticketService.bookTicket as jest.Mock).mockResolvedValue(mockTicket);
    (ticketService.modifyTicket as jest.Mock).mockResolvedValue(mockTicket);
    (ticketService.cancelTicket as jest.Mock).mockResolvedValue(mockTicket);
    (pdfService.generateTicketPDF as jest.Mock).mockResolvedValue(mockPdfPath);
  });

  it("GET /tickets - fetch all", async () => {
    const res = await request(app).get("/api/v1/tickets");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([mockTicket]);
  });

  it("POST /tickets - create a ticket", async () => {
    const res = await request(app)
      .post("/api/v1/tickets")
      .send({ event_id: 1, user_id: 1 });

    expect(res.status).toBe(201);
    expect(res.body.data).toEqual(mockTicket);
    expect(res.body.pdf).toBe(mockPdfPath);
  });

  it("PUT /tickets/:id - update a ticket", async () => {
    const res = await request(app)
      .put("/api/v1/tickets/abc123")
      .send({ status: "canceled" });

    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe("booked");
  });

  it("DELETE /tickets/:id - cancel a ticket", async () => {
    const res = await request(app).delete("/api/v1/tickets/abc123");
    expect(res.status).toBe(200);
    expect(res.body.message.toLowerCase()).toContain("canceled");
  });
});
