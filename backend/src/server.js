import express from "express";
import path from "path";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";
import problemRoutes from "./routes/problemRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { ensureProblemsSeeded } from "./lib/seedProblems.js";

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

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});

const startServer = async () => {
  try {
    console.log("Starting backend server...");
    if (!ENV.MONGO_URI) console.warn("MONGO_URI not set — using in-memory fallback if available");
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
