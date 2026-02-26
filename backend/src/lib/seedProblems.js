import Problem from "../models/Problem.js";
import { PROBLEMS } from "../data/problems.js";

export async function ensureProblemsSeeded() {
  try {
    const count = await Problem.estimatedDocumentCount();
    if (count > 0) return; // already seeded

    // Insert problems but avoid duplicate ids if present in PROBLEMS
    for (const p of PROBLEMS) {
      const exists = await Problem.findOne({ id: p.id });
      if (!exists) await Problem.create(p);
    }
    console.log("✅ Seeded problems collection (idempotent)");
  } catch (error) {
    console.error("Error seeding problems:", error);
  }
}
