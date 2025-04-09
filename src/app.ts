import express, { Express } from "express";
import setupSwagger from "../config/swagger";
import eventRoutes from "./api/v1/routes/eventRoutes";
import artistRoutes from "./api/v1/routes/artistRoutes";
import ticketRoutes from "./api/v1/routes/ticketRoutes";
import userRoutes from "./api/v1/routes/userRoutes";
import errorHandler from "./api/v1/middleware/errorHandler";


const app: Express = express();

app.use(express.json());

setupSwagger(app);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/artists", artistRoutes);
app.use("/api/v1/tickets", ticketRoutes);
app.use("/api/v1/users", userRoutes);

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
  });

app.use(errorHandler);

export default app;