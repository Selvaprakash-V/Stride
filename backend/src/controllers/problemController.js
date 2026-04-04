import Problem from "../models/Problem.js";
import SolvedProblem from "../models/SolvedProblem.js";

// GET /problems?search=&difficulty=&tags=&page=&limit=
export async function getProblems(req, res) {
  try {
    const { search = "", difficulty, tags, page = 1, limit = 20 } = req.query;
    const query = {};
    if (search) {
      query.$text = { $search: search };
    }
    if (difficulty && difficulty !== "All") {
      query.difficulty = difficulty;
    }
    if (tags) {
      const tagsArr = Array.isArray(tags) ? tags : String(tags).split(",").map(t => t.trim()).filter(Boolean);
      if (tagsArr.length > 0) {
        query.tags = { $in: tagsArr }; // Changed from $all to $in for better discovery
      }
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Problem.countDocuments(query);
    const problems = await Problem.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select("-__v -hiddenTestCases -starterCode -expectedOutput");
    res.status(200).json({ problems, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    console.error("Error in getProblems controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// GET /problems/:id (id or slug)
export async function getProblemById(req, res) {
  try {
    const { id } = req.params;
    // Try finding by slug first, then by id
    let problem = await Problem.findOne({ slug: id }).select("-__v -hiddenTestCases");
    if (!problem) {
      problem = await Problem.findOne({ id }).select("-__v -hiddenTestCases");
    }

    if (!problem) return res.status(404).json({ message: "Problem not found" });

    res.status(200).json({ problem });
  } catch (error) {
    console.error("Error in getProblemById controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Mark a problem as solved
export async function markProblemSolved(req, res) {
  try {
    const userId = req.user._id;
    const { problem, problemId, difficulty, sessionId, code, language } = req.body;

    console.log("markProblemSolved called:", { userId, problem, difficulty, sessionId });

    if (!problem || !difficulty) {
      return res.status(400).json({ message: "Problem and difficulty are required" });
    }

    // Check if already solved - if so, update the record
    const existingSolved = await SolvedProblem.findOne({ user: userId, problem });

    if (existingSolved) {
      // Update with latest code if provided
      if (code) existingSolved.code = code;
      if (language) existingSolved.language = language;
      existingSolved.solvedAt = new Date();
      existingSolved.result = "passed"; // mark as solved
      await existingSolved.save();
      console.log("Problem already solved, record updated:", existingSolved._id);
      return res.status(200).json({ message: "Problem already solved, record updated", solvedProblem: existingSolved });
    }

    // Create new solved problem record
    const solvedProblem = await SolvedProblem.create({
      user: userId,
      problem,
      problemId: problemId || "",
      difficulty: difficulty.toLowerCase(),
      session: sessionId || null,
      code: code || "",
      language: language || "javascript",
      result: "passed",
    });

    console.log("New solved problem created:", solvedProblem._id);
    res.status(201).json({ message: "Problem marked as solved", solvedProblem });
  } catch (error) {
    console.error("Error in markProblemSolved controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get solved problems for a user
export async function getMySolvedProblems(req, res) {
  try {
    const userId = req.user._id;

    const solvedProblems = await SolvedProblem.find({ user: userId })
      .sort({ solvedAt: -1 })
      .select("-code -__v"); // Exclude code for list view

    // Count by difficulty
    const stats = {
      total: solvedProblems.length,
      easy: solvedProblems.filter(p => p.difficulty.toLowerCase() === "easy").length,
      medium: solvedProblems.filter(p => p.difficulty.toLowerCase() === "medium").length,
      hard: solvedProblems.filter(p => p.difficulty.toLowerCase() === "hard").length,
    };

    res.status(200).json({ solvedProblems, stats });
  } catch (error) {
    console.error("Error in getMySolvedProblems controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createProblem(req, res) {
  try {
    const user = req.user; // attached by protectRoute

    if (!user || user.role !== "host") {
      return res.status(403).json({ message: "Only hosts can create problems" });
    }

    const {
      id,
      title,
      difficulty,
      category,
      descriptionText,
      notes,
      examples,
      constraints,
      starterCode,
      expectedOutput,
    } = req.body;

    // Basic validation and sanitization
    if (!id || !title || !difficulty || !category || !descriptionText) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const clean = {
      id: String(id).trim(),
      title: String(title).trim(),
      difficulty: String(difficulty).trim().toLowerCase(),
      category: String(category).trim(),
      descriptionText: String(descriptionText).trim(),
    };

    if (clean.id.length < 2 || clean.title.length < 3) {
      return res.status(400).json({ message: "Invalid id or title" });
    }

    const existing = await Problem.findOne({ id: clean.id });
    if (existing) {
      return res.status(409).json({ message: "Problem with this id already exists" });
    }

    const problem = new Problem({
      id: clean.id,
      title: clean.title,
      difficulty: clean.difficulty,
      category: clean.category,
      description: {
        text: clean.descriptionText,
        notes: notes || [],
      },
      examples: examples || [],
      constraints: constraints || [],
      starterCode: starterCode || {},
      expectedOutput: expectedOutput || {},
    });

    await problem.save();

    res.status(201).json({ problem });
  } catch (error) {
    console.error("Error in createProblem controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Search problems by text using text index
export async function searchProblems(req, res) {
  try {
    const { q } = req.query;
    if (!q || q.trim().length < 2) return res.status(400).json({ message: "Query must be 2+ characters" });
    const results = await Problem.find({ $text: { $search: q } }).limit(50).select("-__v");
    res.status(200).json({ results });
  } catch (error) {
    console.error("Error in searchProblems:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
