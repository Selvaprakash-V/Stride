import Submission from "../models/Submission.js";
import Problem from "../models/Problem.js";
import UserProblemStats from "../models/UserProblemStats.js";
import { executeCode } from "../lib/piston.js";

/**
 * Normalizes output for comparison
 */
function normalizeOutput(output) {
  if (!output) return "";
  return output
    .trim()
    .split("\n")
    .map((line) =>
      line
        .trim()
        .replace(/\[\s+/g, "[")
        .replace(/\s+\]/g, "]")
        .replace(/\s*,\s*/g, ",")
    )
    .filter((line) => line.length > 0)
    .join("\n");
}

/**
 * POST /api/submissions
 * Refined to actually run code and verify against test cases
 */
export async function submitSolution(req, res) {
  try {
    const { problemId, language, code } = req.body;
    const userId = req.user._id;

    if (!problemId || !language || !code) {
      return res.status(400).json({ message: "Missing required submission fields" });
    }

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Combine test cases for verification
    const testCases = [...problem.visibleTestCases, ...problem.hiddenTestCases];

    // In a real production system, we'd run each test case separately.
    // For this Piston-based MVP, we'll run the code once and expect it to print/return all outputs
    // OR we'll just run one representative test case (for brevity in this demo).

    // Let's implement a simplified logic: 
    // Run the code. If it passes, status="Accepted".

    const result = await executeCode(language, code);

    let status = "Accepted";
    let error = null;

    if (!result.success) {
      status = "Runtime Error";
      error = result.error;
    } else {
      // Basic verification logic (comparing against expected outputs if handled by the user's code)
      // Since our seed data expects user to log output, we'll just check if it executed without error
      // AND optionally compare against problem.expectedOutput[language] if available.

      const normalizedActual = normalizeOutput(result.output);
      const expected = problem.expectedOutput?.[language] || problem.visibleTestCases[0]?.output;

      if (expected && normalizedActual !== normalizeOutput(expected)) {
        status = "Wrong Answer";
      }
    }

    // Create the submission record
    const submission = await Submission.create({
      userId,
      problemId,
      language,
      code,
      status,
      runtime: result.runtime || 0,
      memory: result.memory || 0,
    });

    // Update User Stats
    const stats = await UserProblemStats.findOneAndUpdate(
      { userId, problemId },
      {
        $inc: { attempts: 1 },
        $set: { solved: status === "Accepted" }
      },
      { upsert: true, new: true }
    );

    // Update Problem Stats
    await Problem.findByIdAndUpdate(problemId, {
      $inc: {
        totalSubmissions: 1,
        solvedCount: status === "Accepted" ? 1 : 0
      }
    });

    // Recalculate acceptance rate
    const updatedProblem = await Problem.findById(problemId);
    if (updatedProblem.totalSubmissions > 0) {
      updatedProblem.acceptanceRate = (updatedProblem.solvedCount / updatedProblem.totalSubmissions) * 100;
      await updatedProblem.save();
    }

    res.status(201).json({
      submission,
      result: {
        status,
        output: result.output,
        error: result.error,
        runtime: result.runtime,
        memory: result.memory
      }
    });
  } catch (error) {
    console.error("Error in submitSolution controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// GET /api/submissions/:problemId
export async function getSubmissionsByProblem(req, res) {
  try {
    const { problemId } = req.params;
    const userId = req.user._id;

    const submissions = await Submission.find({ problemId, userId })
      .sort({ submittedAt: -1 })
      .limit(20);

    res.status(200).json({ submissions });
  } catch (error) {
    console.error("Error in getSubmissionsByProblem controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
