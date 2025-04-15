import { Request, Response, NextFunction } from "express";
import {
  fetchAllTickets,
  bookTicket,
  modifyTicket,
  cancelTicket,
} from "./../services/ticketService";
import { generateTicketPDF } from "./../services/pdfService";
import { ServiceError } from "../errors/errors";
import { sendTicketEmail } from "../services/emailService";


// GET /tickets
export const getAllTickets = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { status, sortBy } = req.query;

    // Convert to string and build filters object
    const filters = {
      ...(status && { status: String(status) }),
      ...(sortBy && { sortBy: String(sortBy) }),
    };

    const tickets = await fetchAllTickets(filters);
    res.status(200).json({ message: "Fetched all tickets", data: tickets });
  } catch (error) {
    next(error);
  }
};


  // POST /tickets
  export const createTicket = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { event_id, user_id, email} = req.body;
      const newTicket = await bookTicket({ event_id, user_id });

       // Generate PDF
    const pdfPath = await generateTicketPDF({
      ticketId: newTicket.id,
      eventName: "Event Name Placeholder",
      date: new Date().toISOString(),
      userName: `User #${user_id}`, 
      location: "Venue Placeholder"
    });

// Send email with PDF
if (email) {
  await sendTicketEmail(
    email,
    "Your Ticket Confirmation",
    "Thank you for booking. Please find your ticket attached.",
    pdfPath
  );
}

res.status(201).json({
  message: "Ticket booked",
  data: newTicket,
  pdf: pdfPath,
  ...(email && { emailStatus: "Confirmation sent to " + email }),
});
} catch (error) {
next(error);
}
};
  
  // PUT /tickets/:id
  export const updateTicket = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updated = await modifyTicket(id, { status });
  
      if (!updated) {
        throw new ServiceError("Ticket not found", "NOT_FOUND");
    }
  
      res.status(200).json({ message: "Ticket updated", data: updated });
    } catch (error) {
      next(error);
    }
  };
  
  // DELETE /tickets/:id
  export const deleteTicket = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await cancelTicket(id);
  
      if (!deleted) {
        throw new ServiceError("Ticket not found", "NOT_FOUND");
      }
  
      res.status(200).json({ message: "Ticket canceled", data: deleted });
    } catch (error) {
      next(error);
    }
  };