import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  // Require a real MongoDB connection string (e.g. MongoDB Atlas).
  // Do not fall back to an in-memory server in production or CI.
  if (!ENV.DB_URL) {
    console.error("❌ DB_URL is not set. Please configure a MongoDB connection string (MongoDB Atlas or local) in backend/.env as DB_URL.");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(ENV.DB_URL, {
      // sensible defaults for pooling and timeouts
      maxPoolSize: 20,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("✅ Connected to MongoDB:", conn.connection.host);
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB using DB_URL:", error.message || error);
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
