import express from "express";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import testRoutes from "./routes/test.routes.js";
import taskRoutes from "./routes/task.routes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

// middleware
app.use(express.json());
app.use(cookieParser());


// routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/tasks", taskRoutes);

// test route
app.get("/", (req, res) => {
  res.json({ message: "API running!!" });
});

export default app;