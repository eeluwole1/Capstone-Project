import express, { Express } from "express";
import setupSwagger from "../config/swagger";
import eventRoutes from "./api/v1/routes/eventRoutes";


const app: Express = express();

app.use(express.json());

setupSwagger(app);

/**
 * @openapi
 * /events:
 *   get:
 *     summary: Retrieve a list of events
 *     tags: [Evnts]
 *     responses:
 *       200:
 *         description: List of events
 */

app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
      status: "OK",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      version: "1.0.0"
    });
  });
  

// Main API routes
app.use("/api/v1/events", eventRoutes);



export default app;