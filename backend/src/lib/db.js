import mongoose from "mongoose";
import { ENV } from "./env.js";
import { MongoMemoryServer } from "mongodb-memory-server";

let _mongod = null;

export const connectDB = async () => {
  // Try explicit DB_URL first when provided
  if (ENV.DB_URL) {
    try {
      const conn = await mongoose.connect(ENV.DB_URL, {
        maxPoolSize: 20,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      console.log("✅ Connected to MongoDB:", conn.connection.host);
      return;
    } catch (error) {
      console.error("❌ Failed to connect to MongoDB using DB_URL:", error.message || error);
      // fall through to possible in-memory fallback for development
    }
  }

  // If we reach here, DB_URL either wasn't set or failed to connect.
  // Allow an in-memory fallback in development only.
  if (ENV.NODE_ENV === "development") {
    try {
      console.warn("DB_URL not set or unreachable — starting in-memory MongoDB for development");
      _mongod = await MongoMemoryServer.create();
      const uri = _mongod.getUri();
      const conn = await mongoose.connect(uri, {
        maxPoolSize: 20,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      console.log("✅ Connected to in-memory MongoDB");
      return;
    } catch (err) {
      console.error("❌ Failed to start in-memory MongoDB:", err.message || err);
      process.exit(1);
    }
  }

  console.error("❌ DB_URL is not set. Please configure a MongoDB connection string (MongoDB Atlas or local) in backend/.env as DB_URL.");
  process.exit(1);
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    if (_mongod) {
      await _mongod.stop();
      _mongod = null;
    }
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.warn("Error during MongoDB disconnect", err.message);
  }
};
