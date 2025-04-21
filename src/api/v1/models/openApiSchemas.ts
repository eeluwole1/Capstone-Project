/**
 * @openapi
 * components:
 *   schemas:
 *     Artist:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "abc123"
 *         name:
 *           type: string
 *           example: "Royal Wolesax"
 *         genre:
 *           type: string
 *           example: "Jazz"
 *         event_id:
 *           type: number
 *           example: 1
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         date:
 *           type: string
 *           format: date
 *         location:
 *           type: string
 *         organizer:
 *           type: string
 *     Ticket:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         event_id:
 *           type: number
 *         user_id:
 *           type: number
 *         status:
 *           type: string
 *           enum: [booked, canceled, available]
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *           enum: [organizer, attendee]
 */
