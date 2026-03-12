import Problem from "../models/Problem.js";
import { PROBLEMS } from "../data/problems.js";

function titleCase(str) {
  return String(str || "")
    .split(/\s+|_|-/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(" ")
    .trim();
}

function deriveTags(p) {
  // If problem already has tags array, normalize and return them
  if (Array.isArray(p.tags) && p.tags.length > 0) {
    return p.tags.map((t) => titleCase(t.replace(/\s*•\s*/g, " ")));
  }

  // Otherwise, derive tags from category string (which may include bullets like "Array • Hash Table")
  if (p.category) {
    return String(p.category)
      .split(/\u2022|•|,|\/|\||\band\b|\•/) // split on bullets, commas, slashes, pipes, 'and'
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => titleCase(t.replace(/[^a-zA-Z0-9 ]+/g, " ")));
  }

  // Fallback: try to infer from difficulty or empty
  return [];
}

export async function ensureProblemsSeeded() {
  try {
    // Always upsert all problems from the data file to ensure DB matches the seed
    for (const p of PROBLEMS) {
      const doc = {
        id: String(p.id || p.slug || p.title).trim(),
        slug: String(p.slug || p.id || p.title).trim(),
        title: p.title || p.id || "Untitled",
        difficulty: (p.difficulty || "Easy").toString(),
        category: p.category || "",
        description: p.description && p.description.text ? p.description : { text: String(p.description || "") },
        examples: p.examples || [],
        constraints: p.constraints || [],
        starterCode: p.starterCode || {},
        expectedOutput: p.expectedOutput || {},
        visibleTestCases: p.visibleTestCases || p.visibleTestCases || [],
        hiddenTestCases: p.hiddenTestCases || [],
        acceptanceRate: p.acceptanceRate || 0,
        tags: deriveTags(p),
      };

      await Problem.findOneAndUpdate({ id: doc.id }, { $set: doc }, { upsert: true, setDefaultsOnInsert: true });
      console.log(`Upserted problem: ${doc.id}`);
    }

    console.log("✅ Seeded problems collection (upsert complete)");
  } catch (error) {
    console.error("Error seeding problems:", error);
  }
}
