import mongoose from "mongoose";

const userProblemStatsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true },
  solved: { type: Boolean, default: false },
  attempts: { type: Number, default: 0 },
});

userProblemStatsSchema.index({ userId: 1, problemId: 1 }, { unique: true });

export default mongoose.model("UserProblemStats", userProblemStatsSchema);
