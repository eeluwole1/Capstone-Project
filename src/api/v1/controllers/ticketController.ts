import { Request, Response } from "express";
import {
  fetchAllTickets,
  bookTicket,
  modifyTicket,
  cancelTicket,
} from "./../services/ticketService";

// GET /tickets
export const getAllTickets = (req: Request, res: Response): void => {
  const tickets = fetchAllTickets();
  res.status(200).json({ message: "Fetched all tickets", data: tickets });
};

// POST /tickets
export const createTicket = (req: Request, res: Response): void => {
  const { event_id, user_id } = req.body;
  const newTicket = bookTicket(event_id, user_id);
  res.status(201).json({ message: "Ticket booked", data: newTicket });
};

// PUT /tickets/:id
export const updateTicket = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = modifyTicket(Number(id), status);
  res.status(200).json({ message: "Ticket updated", data: updated });
};

// DELETE /tickets/:id
export const deleteTicket = (req: Request, res: Response): void => {
  const { id } = req.params;
  const deleted = cancelTicket(Number(id));
  res.status(200).json({ message: "Ticket canceled", data: deleted });
};
