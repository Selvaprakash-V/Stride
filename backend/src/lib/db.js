import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import { ENV } from "./env.js";

export const connectDB = async () => {
  // Try using provided DB_URL first (local or remote). If that fails,
  // fall back to an in-memory MongoDB for local development.
  try {
    if (ENV.DB_URL) {
      const conn = await mongoose.connect(ENV.DB_URL, {
        // better defaults for connection pooling in production
        maxPoolSize: 20,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      console.log("✅ Connected to MongoDB:", conn.connection.host);
      return;
    }
  } catch (error) {
    console.warn("⚠️ Failed to connect using ENV.DB_URL, will try in-memory DB:", error.message);
  }

  try {
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    const conn = await mongoose.connect(uri);
    console.log("✅ Connected to in-memory MongoDB (fallback)", conn.connection.host);
  } catch (error) {
    console.error("❌ Error starting in-memory MongoDB", error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.warn("Error during MongoDB disconnect", err.message);
  }
};
