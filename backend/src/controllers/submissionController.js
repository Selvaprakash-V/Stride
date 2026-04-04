import Submission from "../models/Submission.js";
import Problem from "../models/Problem.js";
import UserProblemStats from "../models/UserProblemStats.js";
import { executeCode } from "../lib/piston.js";

/**
 * Normalizes output for comparison — trims whitespace and spaces around brackets/commas,
 * and lowercases booleans so Python "True"/"False" matches JS/seed "true"/"false".
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
        .replace(/\bTrue\b/g, "true")
        .replace(/\bFalse\b/g, "false")
        .replace(/\bNone\b/g, "null")
    )
    .filter((line) => line.length > 0)
    .join("\n");
}

/**
 * Extract the entry-point function name from starter code.
 * JS:  "function twoSum(...)" → "twoSum"
 * Py:  "def twoSum(...):"     → "twoSum"
 */
function extractFunctionName(language, starterCode) {
  if (!starterCode) return null;
  if (language === "javascript") {
    const m = starterCode.match(/^function\s+(\w+)/m);
    return m?.[1] || null;
  }
  if (language === "python") {
    const m = starterCode.match(/^def\s+(\w+)/m);
    return m?.[1] || null;
  }
  return null;
}

/**
 * Build runnable code that appends test-harness calls for JS / Python.
 * For compiled languages (Java, C, C++) the starter main() already prints test[0] output.
 * Returns { codeToRun, expectedOutput } — expectedOutput is multi-line, one result per line.
 */
function buildTestHarness(language, userCode, starterCode, testCases) {
  const fnName = extractFunctionName(language, starterCode);
  const expectedLines = testCases.map((tc) => normalizeOutput(tc.output));
  const expected = expectedLines.join("\n");

  if (language === "javascript" && fnName) {
    const calls = testCases
      .map(
        (tc) =>
          `try{const __r=${fnName}(${tc.input});` +
          `console.log(Array.isArray(__r)?JSON.stringify(__r):` +
          `typeof __r==='boolean'?String(__r):String(__r));}` +
          `catch(__e){process.stderr.write(__e.message+\"\\n\");}`
      )
      .join("\n");
    return { codeToRun: userCode + "\n" + calls, expected };
  }

  if (language === "python" && fnName) {
    const calls = testCases
      .map(
        (tc) =>
          `try:\n` +
          `  __args=eval("["+${JSON.stringify(tc.input)}+"]")\n` +
          `  __r=${fnName}(*__args)\n` +
          `  import json as __j\n` +
          `  print(str(__r).lower() if isinstance(__r,bool) else __j.dumps(__r) if isinstance(__r,(list,dict)) else __r)\n` +
          `except Exception as __e:\n` +
          `  import sys;print(str(__e),file=sys.stderr)`
      )
      .join("\n");
    return { codeToRun: userCode + "\n" + calls, expected };
  }

  // Java / C / C++ — starter main() already tests visibleTestCases[0]
  return {
    codeToRun: userCode,
    expected: normalizeOutput(testCases[0]?.output || ""),
  };
}

function classifyExecutionFailure(errorMessage = "") {
  const err = String(errorMessage).toLowerCase();

  if (err.includes("time limit")) return "Time Limit Exceeded";
  if (err.includes("memory limit")) return "Memory Limit Exceeded";
  if (err.includes("compile") || err.includes("compilation") || err.includes("syntaxerror") || err.includes("syntax error")) {
    return "Compilation Error";
  }

  return "Runtime Error";
}

/**
 * POST /api/submissions
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

    // All test cases (visible + hidden)
    const testCases = [...(problem.visibleTestCases || []), ...(problem.hiddenTestCases || [])];

    // For compiled languages only test against visible[0] (main() already handles it)
    const isCompiled = ["java", "c", "cpp"].includes(language);
    const casesToTest = isCompiled ? (problem.visibleTestCases?.slice(0, 1) || []) : testCases;

    // Get starter code from the Mongoose Map
    const starterCode =
      typeof problem.starterCode?.get === "function"
        ? problem.starterCode.get(language)
        : problem.starterCode?.[language];

    const { codeToRun, expected } = buildTestHarness(language, code, starterCode, casesToTest);

    const result = await executeCode(language, codeToRun);

    let status = "Accepted";
    let outputToShow = result.output;

    if (!result.success) {
      status = classifyExecutionFailure(result.error);
    } else if (expected) {
      const normalizedActual = normalizeOutput(result.output);
      if (normalizedActual !== expected) {
        status = "Wrong Answer";
      }
    }

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
    await UserProblemStats.findOneAndUpdate(
      { userId, problemId },
      { $inc: { attempts: 1 }, $set: { solved: status === "Accepted" } },
      { upsert: true, new: true }
    );

    // Update Problem Stats
    await Problem.findByIdAndUpdate(
      problemId,
      { $inc: { totalSubmissions: 1, solvedCount: status === "Accepted" ? 1 : 0 } },
      { runValidators: false, new: true }
    ).then(async (updated) => {
      if (updated?.totalSubmissions > 0) {
        const rate = (updated.solvedCount / updated.totalSubmissions) * 100;
        await Problem.findByIdAndUpdate(problemId, { $set: { acceptanceRate: rate } }, { runValidators: false });
      }
    });

    res.status(201).json({
      submission,
      result: {
        status,
        output: outputToShow,
        error: result.error,
        runtime: result.runtime,
        memory: result.memory,
      },
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
