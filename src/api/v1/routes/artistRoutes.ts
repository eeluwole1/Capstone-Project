import express from "express";
import {
  getAllArtists,
  createArtist,
  updateArtist,
  deleteArtist
} from "../controllers/artistController";

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
router.get('/', getAllArtists);

/**
 * @openapi
 * /artists:
 *   post:
 *     summary: Register a new artist
 *     tags: [Artists]
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
router.post('/', createArtist);

/**
 * @openapi
 * /artists/{id}:
 *   put:
 *     summary: Update an existing artist
 *     tags: [Artists]
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
router.put('/:id', updateArtist);

/**
 * @openapi
 * /artists/{id}:
 *   delete:
 *     summary: Delete an artist
 *     tags: [Artists]
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
router.delete('/:id', deleteArtist);

/**
 * @openapi
 * components:
 *   schemas:
 *     Artist:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: DJ Beats
 *         genre:
 *           type: string
 *           example: EDM
 *         event_id:
 *           type: integer
 *           example: 2
 */

export default router;
