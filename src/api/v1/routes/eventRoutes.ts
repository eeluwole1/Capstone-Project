import express, { Express } from "express";
import {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent
} from "../controllers/eventControllers";

const router = express.Router();
router.get('/events', getAllEvents);
router.post('/events', createEvent);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);
