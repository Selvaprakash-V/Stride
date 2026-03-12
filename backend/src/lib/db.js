import mongoose from "mongoose";
import { ENV } from "./env.js";

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
      console.error("❌ Failed to connect to MongoDB Atlas:", error.message || error);
      console.error("👉 Make sure your IP (run: curl https://api.ipify.org) is whitelisted in Atlas → Security → Network Access.");
      process.exit(1);
    }
  }

  console.error("❌ DB_URL is not set. Please configure a MongoDB Atlas connection string in backend/.env as DB_URL.");
  process.exit(1);
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.warn("Error during MongoDB disconnect", err.message);
  }
};
