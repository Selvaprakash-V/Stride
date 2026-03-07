import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getMe, updateMe, searchUsers, syncAllUsersFromClerk, updateProfile, getSubscription, subscribe, cancelSubscription, getUserStats } from "../controllers/userController.js";

const router = express.Router();

router.get("/me", protectRoute, getMe);
router.get("/me/stats", protectRoute, getUserStats);
router.put("/me", protectRoute, updateMe);
router.post("/me/profile", protectRoute, updateProfile);
router.get("/search", protectRoute, searchUsers);
router.post("/sync-from-clerk", protectRoute, syncAllUsersFromClerk);
router.get("/me/subscription", protectRoute, getSubscription);
router.post("/me/subscribe", protectRoute, subscribe);
router.post("/me/cancel-subscription", protectRoute, cancelSubscription);

export default router;
