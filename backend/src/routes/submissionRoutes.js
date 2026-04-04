import express from "express";
import { submitSolution, getSubmissionsByProblem, getSubmissionActivity } from "../controllers/submissionController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, submitSolution); // POST /submissions
router.get("/activity", protectRoute, getSubmissionActivity); // GET /submissions/activity?year=YYYY
router.get("/:problemId", protectRoute, getSubmissionsByProblem); // GET /submissions/:problemId

export default router;
