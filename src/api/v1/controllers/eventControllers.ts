import { Request, Response } from "express";
import {
  getAllEventsService,
  createEventService,
  updateEventService,
  deleteEventService
} from "../services/eventServices";

// GET /events
export const getAllEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await getAllEventsService();
    res.status(200).json({ message: "Fetched all events", data: events });
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};

// POST /events
export const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const eventData = req.body;
    const newEvent = await createEventService(eventData);
    res.status(201).json({ message: "Event created", data: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
};

// PUT /events/:id
export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await updateEventService(id, updates);
    res.status(200).json({ message: "Event updated", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
};

// DELETE /events/:id
export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await deleteEventService(id);
    res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};
