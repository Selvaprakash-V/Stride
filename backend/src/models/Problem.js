import mongoose from "mongoose";

const descriptionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    notes: [{ type: String }],
  },
  { _id: false }
);

const problemSchema = new mongoose.Schema(
  {
    // Human-readable unique identifier / slug (e.g. "two-sum")
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
    category: { type: String, default: "" },
    description: { type: descriptionSchema, required: true },
    examples: [
      {
        input: String,
        output: String,
        explanation: String,
      },
    ],
    constraints: [{ type: String }],
    // language -> starter code mapping (e.g. { javascript: "..." })
    starterCode: { type: Map, of: String },
    // language -> expected output mapping used for test validation
    expectedOutput: { type: Map, of: String },
    // Optional extra fields kept for compatibility with richer seed data
    tags: [{ type: String }],
    visibleTestCases: [{ input: String, output: String }],
    hiddenTestCases: [{ input: String, output: String }],
    acceptanceRate: { type: Number, default: 0 },
    solvedCount: { type: Number, default: 0 },
    totalSubmissions: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Text indexes for full-text search
problemSchema.index({ title: "text", category: "text", tags: "text" });

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
