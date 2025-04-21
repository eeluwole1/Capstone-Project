import express from "express";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/userController";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: API for managing users (organizers, attendees, artists)
 */

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", authenticate, authorize({ hasRole: ["admin"] }), getAllUsers);

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authenticate, authorize({ hasRole: ["admin"] }), createUser);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authenticate, authorize({ hasRole: ["admin"] }), updateUser);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authenticate, authorize({ hasRole: ["admin"] }), deleteUser);

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 */

export default router;
