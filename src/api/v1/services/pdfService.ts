import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

// Define a reusable type
interface TicketData {
  ticketId: string;
  eventName: string;
  date: string;
  userName: string;
  location: string;
}

/**
 * Generates a PDF ticket and returns the file path
 */
export const generateTicketPDF = async (ticket: TicketData): Promise<string> => {
  const doc = new PDFDocument();
  const filename = `ticket-${ticket.ticketId}.pdf`;
  const filePath = path.join(__dirname, "..", "..", "..", "generated", filename);

  // Ensure the directory exists
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  doc.fontSize(20).text("🎫 Ticket Confirmation", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`Event: ${ticket.eventName}`);
  doc.text(`Date: ${ticket.date}`);
  doc.text(`Attendee: ${ticket.userName}`);
  doc.text(`Location: ${ticket.location}`);
  doc.text(`Ticket ID: ${ticket.ticketId}`);

  doc.end();

  return new Promise((resolve, reject) => {
    writeStream.on("finish", () => resolve(filePath));
    writeStream.on("error", reject);
  });
};
