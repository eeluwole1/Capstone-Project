import { Request, Response } from "express";
import {
  fetchAllEvents,
  addEvent,
  modifyEvent,
  removeEvent,
} from "../services/eventService";

// GET /events
export const getAllEvents = (req: Request, res: Response): void => {
  const events = fetchAllEvents();
  res.status(200).json({ message: "Fetched all events", data: events });
};

// POST /events
export const createEvent = (req: Request, res: Response): void => {
  const event = req.body.name;
  const newEvent = addEvent(event);
  res.status(201).json({ message: "Event created", data: newEvent });
};

// PUT /events/:id
export const updateEvent = (req: Request, res: Response): void => {
  const { id } = req.params;
  const event = req.body.name;
  const updated = modifyEvent(Number(id), event);
  res.status(200).json({ message: "Event updated", data: updated });
};

// DELETE /events/:id
export const deleteEvent = (req: Request, res: Response): void => {
  const { id } = req.params;
  const deleted = removeEvent(Number(id));
  res.status(200).json({ message: "Event deleted", data: deleted });
};
