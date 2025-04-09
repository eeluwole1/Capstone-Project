import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { TicketData } from "../types/ticketTypes";


export const generateTicketPDF = async (ticket: TicketData): Promise<string> => {
  const doc = new PDFDocument();
  const filename = `ticket-${ticket.ticketId}.pdf`;
  const filePath = path.join(__dirname, "..", "generated", filename);

  // Ensure the folder exists
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  doc.fontSize(20).text("Event Ticket", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`Ticket ID: ${ticket.ticketId}`);
  doc.text(`Name: ${ticket.userName}`);
  doc.text(`Event: ${ticket.eventName}`);
  doc.text(`Date: ${ticket.date}`);
  doc.text(`Location: ${ticket.location}`);
  doc.text("Status: BOOKED");

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
};
