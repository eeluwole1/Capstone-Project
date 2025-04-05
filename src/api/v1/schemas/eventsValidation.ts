import Joi from "joi";

// Artist Schema
export const artistSchema = Joi.object({
  name: Joi.string().required(),
  genre: Joi.string().required(),
  event_id: Joi.number().required(),
});

// Ticket Schema
export const ticketSchema = Joi.object({
  event_id: Joi.number().required(),
  user_id: Joi.number().required(),
});

export const updateTicketStatusSchema = Joi.object({
  status: Joi.string().valid("booked", "canceled", "available").required(),
});

// Event Schema
export const eventSchema = Joi.object({
  name: Joi.string().required(),
  date: Joi.string().isoDate().required(),
  location: Joi.string().required(),
  organizer: Joi.string().required(),
});

// 👤 User Schema
export const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("organizer", "attendee").required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().required()
});
