import Submission from "../models/Submission.js";

// POST /api/submissions
export async function submitSolution(req, res) {
  try {
    const { userId, problemId, language, code, status, runtime, memory } = req.body;

    if (!userId || !problemId || !language || !code || !status) {
      return res.status(400).json({ message: "Missing required submission fields" });
    }

    const validStatuses = ["Accepted", "Wrong Answer", "TLE", "Runtime Error"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Must be one of: ${validStatuses.join(", ")}` });
    }

    const submission = await Submission.create({
      userId,
      problemId,
      language,
      code,
      status,
      runtime: runtime ?? null,
      memory: memory ?? null,
    });

    res.status(201).json({ submission });
  } catch (error) {
    console.error("Error in submitSolution controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// GET /api/submissions/:problemId
export async function getSubmissionsByProblem(req, res) {
  try {
    const { problemId } = req.params;

    if (!problemId) {
      return res.status(400).json({ message: "Problem ID is required" });
    }

    const submissions = await Submission.find({ problemId })
      .sort({ submittedAt: -1 })
      .limit(50)
      .select("-code -__v"); // Exclude code from list view for performance

    res.status(200).json({ submissions });
  } catch (error) {
    console.error("Error in getSubmissionsByProblem controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
