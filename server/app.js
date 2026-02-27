
import dotenv from "dotenv";
dotenv.config();
import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import testRoutes from "./routes/test.routes.js";
import taskRoutes from "./routes/task.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";



const app = express();

app.use(cors({
  origin: "https://task-management-application-livid.vercel.app", 
  credentials: true
}));

// middleware
app.use(express.json());
app.use(cookieParser());


// routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/tasks", taskRoutes);
app.use(errorHandler);

// test route
app.get("/", (req, res) => {
  res.json({ message: "API running!!" });
});

export default app;