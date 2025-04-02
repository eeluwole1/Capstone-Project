import { Request, Response, NextFunction } from "express";
import {
  fetchAllEvents,
  addEvent,
  modifyEvent,
  removeEvent,
} from "../services/eventService";

// GET /events
export const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await fetchAllEvents();
    res.status(200).json({ message: "Fetched all events", data: events });
  } catch (error) {
    next(error);
  }
};

// POST /events
export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, date, location, organizer } = req.body;
    const newEvent = await addEvent({ name, date, location, organizer });
    res.status(201).json({ message: "Event created", data: newEvent });
  } catch (error) {
    next(error);
  }
};

// PUT /events/:id
export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await modifyEvent(id, updates);
    res.status(200).json({ message: "Event updated", data: updated });
  } catch (error) {
    next(error);
  }
};

// DELETE /events/:id
export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deleted = await removeEvent(id);
    res.status(200).json({ message: "Event deleted", data: deleted });
  } catch (error) {
    next(error);
  }
};
