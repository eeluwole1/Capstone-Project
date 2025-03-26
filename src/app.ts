import express, { Express } from "express";
import setupSwagger from "../config/swagger";

const app: Express = express();

setupSwagger(app);

/**
 * @openapi
 * /tasks:
 *   get:
 *     summary: Retrieve a list of tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: A list of tasks
 */
app.get("/tasks", (req, res) => {
	res.send("Retrieve tasks");
});

export default app;