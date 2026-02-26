import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true },
  language: { type: String, required: true },
  code: { type: String, required: true },
  status: { type: String, enum: ["Accepted", "Wrong Answer", "TLE", "Runtime Error"], required: true },
  runtime: { type: Number },
  memory: { type: Number },
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Submission", submissionSchema);
