import express from "express";
import path from "path";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./lib/env.js";
import { connectDB, disconnectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";
import { errorHandler } from "./middleware/errorHandler.js";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";
import problemRoutes from "./routes/problemRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import { ensureProblemsSeeded } from "./lib/seedProblems.js";
import { executeCode } from "./lib/piston.js";

const app = express();

const __dirname = path.resolve();

// middleware
app.use(express.json());

// Configure CORS to allow the frontend origin with credentials
const allowedOrigins = [ENV.CLIENT_URL, "http://localhost:5173"].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(clerkMiddleware()); // this adds auth field to request object: req.auth()

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/submissions", submissionRoutes);

// Code execution proxy — avoids exposing Piston directly to browser
app.post("/api/execute", async (req, res) => {
  const { language, code } = req.body;
  if (!language || !code) return res.status(400).json({ message: "language and code are required" });
  const result = await executeCode(language, code);
  res.status(200).json(result);
});

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Stride backend is running",
    health: "/health",
    apiBase: "/api",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});

// Global error handler
app.use(errorHandler);

const startServer = async () => {
  try {
    console.log("Starting backend server...");
    if (!ENV.DB_URL) console.warn("DB_URL not set — using in-memory fallback if available");
    await connectDB();
    await ensureProblemsSeeded();
    const port = ENV.PORT || 4000;
    app.listen(port, () => console.log(`Server is running on port: ${port}`));
  } catch (error) {
    console.error("💥 Error starting the server", error);
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("SIGINT received: shutting down gracefully");
  try {
    await disconnectDB();
  } catch (err) {
    console.warn("Error during disconnect:", err);
  }
  process.exit(0);
});
