import express from "express";
import {
  getAllArtists,
  createArtist,
  updateArtist,
  deleteArtist
} from "../controllers/artistController";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Artists
 *   description: API for managing artists performing at events
 */

/**
 * @openapi
 * /artists:
 *   get:
 *     summary: Get all artists
 *     tags: [Artists]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of artists
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
 *                     $ref: '#/components/schemas/Artist'
 */
router.get("/", authenticate, getAllArtists);

/**
 * @openapi
 * /artists:
 *   post:
 *     summary: Register a new artist
 *     tags: [Artists]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - genre
 *               - event_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: DJ Beats
 *               genre:
 *                 type: string
 *                 example: EDM
 *               event_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Artist registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Artist'
 */
router.post("/", authenticate, authorize({ hasRole: ["admin"] }), createArtist);

/**
 * @openapi
 * /artists/{id}:
 *   put:
 *     summary: Update an existing artist
 *     tags: [Artists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The artist ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - genre
 *             properties:
 *               name:
 *                 type: string
 *                 example: DJ Beats Updated
 *               genre:
 *                 type: string
 *                 example: House
 *     responses:
 *       200:
 *         description: Artist updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Artist'
 */
router.put("/:id", authenticate, authorize({ hasRole: ["admin"] }), updateArtist);

/**
 * @openapi
 * /artists/{id}:
 *   delete:
 *     summary: Delete an artist
 *     tags: [Artists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The artist ID
 *     responses:
 *       200:
 *         description: Artist deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Artist'
 */
router.delete("/:id", authenticate, authorize({ hasRole: ["admin"] }), deleteArtist);

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
 *           type: integer
 *           example: 101
 */

export default router;
