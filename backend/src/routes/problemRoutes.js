import express from "express";
import {
  getProblems,
  getProblemById,
  createProblem,
  markProblemSolved,
  getMySolvedProblems,
  searchProblems,
} from "../controllers/problemController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// GET /api/problems?search=&difficulty=&tags=&page=&limit=
router.get("/", getProblems);

// GET /api/problems/search?q=...  (must be before /:id)
router.get("/search", searchProblems);

// GET /api/problems/my-solved  (must be before /:id)
router.get("/my-solved", protectRoute, getMySolvedProblems);

// POST /api/problems/solved
router.post("/solved", protectRoute, markProblemSolved);

// POST /api/problems  (host-only, create a problem)
router.post("/", protectRoute, createProblem);

// GET /api/problems/:id  (get by custom id e.g. "two-sum")
router.get("/:id", getProblemById);

export default router;
