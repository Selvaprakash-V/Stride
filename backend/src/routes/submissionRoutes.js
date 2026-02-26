import express from "express";
import { submitSolution, getSubmissionsByProblem } from "../controllers/submissionController.js";

const router = express.Router();

router.post("/", submitSolution); // POST /submissions
router.get("/:problemId", getSubmissionsByProblem); // GET /submissions/:problemId

export default router;
