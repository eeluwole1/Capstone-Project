import express, { Express } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";

dotenv.config();

import setupSwagger from "../config/swagger";
import eventRoutes from "./api/v1/routes/eventRoutes";
import artistRoutes from "./api/v1/routes/artistRoutes";
import ticketRoutes from "./api/v1/routes/ticketRoutes";
import userRoutes from "./api/v1/routes/userRoutes";
import errorHandler from "./api/v1/middleware/errorHandler";


const app: Express = express();

app.use(helmet());

app.use(cors());

// app.use(
//     cors({
//         origin: "https://yourfrontend.com", // Allow only this origin
//         methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
//         allowedHeaders: ["Content-Type", "Authorization"], // Define allowed headers
//         credentials: true, // Enable cookies and HTTP authentication
//     })
// );


// app.use(
//     helmet({
//         contentSecurityPolicy: {
//             directives: {
//                 defaultSrc: ["'self'"],
//                 scriptSrc: ["'self'", "https://trusted-scripts.com"],
//                 styleSrc: ["'self'", "https://trusted-styles.com"],
//             },
//         },
//         referrerPolicy: { policy: "no-referrer" },
//         crossOriginResourcePolicy: { policy: "same-origin" }, // Controls CORS for resources
//     })
// );

// setup swagger for api documentation
setupSwagger(app);

app.use(morgan("combined"));
app.use(express.json());

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