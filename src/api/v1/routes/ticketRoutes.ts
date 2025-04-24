import express from "express";
import {
  getAllTickets,
  createTicket,
  updateTicket,
  deleteTicket
} from "../controllers/ticketController";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";
import { validateInput } from "../middleware/validateInput";
import {
  ticketSchema,
  updateTicketStatusSchema
} from "../schemas/validationSchemas";


const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Tickets
 *   description: API for managing ticket bookings
 */

/**
 * @openapi
 * /tickets:
 *   get:
 *     summary: Get all tickets
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Ticket'
 */
router.get("/", authenticate, getAllTickets);

/**
 * @openapi
 * /tickets:
 *   post:
 *     summary: Book a ticket
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - event_id
 *               - user_id
 *             properties:
 *               event_id:
 *                 type: integer
 *                 example: 2
 *               user_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Ticket booked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Ticket'
 */
router.post("/", authenticate, validateInput(ticketSchema), createTicket);

/**
 * @openapi
 * /tickets/{id}:
 *   put:
 *     summary: Update a ticket
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ticket ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: canceled
 *     responses:
 *       200:
 *         description: Ticket updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Ticket'
 */
router.put("/:id", authenticate,authorize({hasRole: ["admin"]}), validateInput(updateTicketStatusSchema), updateTicket);

/**
 * @openapi
 * /tickets/{id}:
 *   delete:
 *     summary: Cancel a ticket
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ticket ID
 *     responses:
 *       200:
 *         description: Ticket canceled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Ticket'
 */
router.delete("/:id", authenticate, authorize({hasRole: ["admin"]}), deleteTicket);

/**
 * @openapi
 * components:
 *   schemas:
 *     Ticket:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 101
 *         event_id:
 *           type: integer
 *           example: 2
 *         user_id:
 *           type: integer
 *           example: 1
 *         status:
 *           type: string
 *           example: booked
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-04-15T22:31:42.855Z"
 */

export default router;
