import { Request, Response, NextFunction } from "express";
import {
  fetchAllTickets,
  bookTicket,
  modifyTicket,
  cancelTicket,
} from "./../services/ticketService";

// GET /tickets
export const getAllTickets = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const tickets = await fetchAllTickets();
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
      const { event_id, user_id } = req.body;
      const newTicket = await bookTicket({ event_id, user_id });
      res.status(201).json({ message: "Ticket booked", data: newTicket });
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
        res.status(404).json({ message: "Ticket not found" });
        return;
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
        res.status(404).json({ message: "Ticket not found" });
        return;
      }
  
      res.status(200).json({ message: "Ticket canceled", data: deleted });
    } catch (error) {
      next(error);
    }
  };