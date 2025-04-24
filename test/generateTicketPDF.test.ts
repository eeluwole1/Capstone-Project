import fs from "fs";
import path from "path";
import { generateTicketPDF } from "../src/api/v1/utils/generateTicketPDF";

describe("generateTicketPDF", () => {
  const mockTicket = {
    ticketId: "test123",
    eventName: "Jazz Night",
    date: "2025-06-15",
    userName: "Elusiyan Mathew Eluwole",
    location: "Winnipeg Theatre",
  };

  const expectedPath = path.join(
    __dirname,
    "..",
    "src",
    "api",
    "v1",
    "generated",
    `ticket-${mockTicket.ticketId}.pdf`
  );

  afterAll(() => {
    // Clean up the file
    if (fs.existsSync(expectedPath)) {
      fs.unlinkSync(expectedPath);
    }
  });

  it("should generate a PDF and return the correct file path", async () => {
    const filePath = await generateTicketPDF(mockTicket);

    expect(filePath).toBe(expectedPath);
    expect(fs.existsSync(filePath)).toBe(true);
  });
});
