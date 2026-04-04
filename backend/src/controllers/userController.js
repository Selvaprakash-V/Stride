import Session from "../models/Session.js";
import User from "../models/User.js";
import SolvedProblem from "../models/SolvedProblem.js";
import Submission from "../models/Submission.js";
import { applyClerkData } from "../middleware/protectRoute.js";
import { ENV } from "../lib/env.js";

const formatUser = (user) => ({
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  name: user.name,
  email: user.email,
  profileImage: user.profileImage,
  clerkId: user.clerkId,
  role: user.role,
  createdAt: user.createdAt,
});

export async function searchUsers(req, res) {
  try {
    const { query } = req.query;
    const currentUserId = req.user._id;

    if (!query || query.trim().length < 2) {
      return res.status(400).json({ message: "Search query must be at least 2 characters" });
    }

    // Search users by name, firstName, lastName, or email (case-insensitive)
    const users = await User.find({
      _id: { $ne: currentUserId }, // Exclude current user
      $or: [
        { name: { $regex: query, $options: "i" } },
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    })
      .select("firstName lastName name email profileImage clerkId")
      .limit(10);

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error in searchUsers controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getMe(req, res) {
  try {
    const user = req.user; // attached by protectRoute

    // basic stats about user's work/sessions
    const [hostedCount, participantCount, completedHostedCount, completedParticipantCount] =
      await Promise.all([
        Session.countDocuments({ host: user._id }),
        Session.countDocuments({ participant: user._id }),
        Session.countDocuments({ host: user._id, status: "completed" }),
        Session.countDocuments({ participant: user._id, status: "completed" }),
      ]);

    res.status(200).json({
      user: formatUser(user),
      stats: {
        hostedSessions: hostedCount,
        participatedSessions: participantCount,
        completedHostedSessions: completedHostedCount,
        completedParticipatedSessions: completedParticipantCount,
      },
    });
  } catch (error) {
    console.error("Error in getMe controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateMe(req, res) {
  try {
    const authUser = req.user; // attached by protectRoute
    const { role } = req.body;

    // Role is immutable and should be set only during onboarding/profile completion.
    if (role) {
      return res.status(403).json({ message: "Role cannot be changed after onboarding" });
    }

    const user = await User.findById(authUser._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Only allow other updatable fields here in the future (e.g., subscription updates)
    await user.save();

    res.status(200).json({ user: formatUser(user) });
  } catch (error) {
    console.error("Error in updateMe controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateProfile(req, res) {
  try {
    const authUser = req.user; // attached by protectRoute

    // Only allow creating profile once
    if (authUser.profileCompleted) {
      return res.status(400).json({ message: "Profile already completed" });
    }

    const { profileType, profileData } = req.body;
    const allowedTypes = ["student", "company"];
    if (!profileType || !allowedTypes.includes(profileType)) {
      return res.status(400).json({ message: "Invalid or missing profileType" });
    }

    // Apply submitted profile data
    authUser.profileType = profileType;
    authUser.profileData = profileData || {};
    authUser.profileCompleted = true;

    // Optionally derive role for app behavior: companies are treated as hosts
    if (profileType === "company") {
      authUser.role = "host";
    }

    await authUser.save();

    res.status(200).json({ user: {
      id: authUser._id,
      name: authUser.name,
      email: authUser.email,
      profileType: authUser.profileType,
      profileData: authUser.profileData,
      profileCompleted: authUser.profileCompleted,
      role: authUser.role,
    } });
  } catch (error) {
    console.error("Error in updateProfile controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get current user's subscription info
export async function getSubscription(req, res) {
  try {
    const user = req.user;
    res.status(200).json({
      subscription: {
        plan: user.subscriptionPlan || null,
        status: user.subscriptionStatus || "none",
        providerId: user.subscriptionProviderId || null,
        startsAt: user.subscriptionStartsAt || null,
        endsAt: user.subscriptionEndsAt || null,
      },
    });
  } catch (error) {
    console.error("Error in getSubscription:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Subscribe the current user to a plan (placeholder payment handling)
export async function subscribe(req, res) {
  try {
    const user = req.user;
    const { plan, paymentToken } = req.body;

    const allowedPlans = ["starter", "pro", "enterprise"];
    if (!plan || !allowedPlans.includes(plan)) {
      return res.status(400).json({ message: "Invalid plan selected" });
    }

    // NOTE: Payment processing should be integrated here (Stripe, Paddle, etc.).
    // For now, accept a paymentToken as a placeholder and mark subscription active.

    user.subscriptionPlan = plan;
    user.subscriptionStatus = "active";
    user.subscriptionProviderId = paymentToken || "local-test";
    user.subscriptionStartsAt = new Date();
    // Set a 30-day renewal for pro trial example
    if (plan === "pro") {
      user.subscriptionEndsAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    } else {
      user.subscriptionEndsAt = null;
    }

    await user.save();

    res.status(200).json({ message: "Subscription successful", subscription: {
      plan: user.subscriptionPlan,
      status: user.subscriptionStatus,
      startsAt: user.subscriptionStartsAt,
      endsAt: user.subscriptionEndsAt,
    } });
  } catch (error) {
    console.error("Error in subscribe:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Cancel current user's subscription (soft cancel)
export async function cancelSubscription(req, res) {
  try {
    const user = req.user;
    if (!user.subscriptionPlan || user.subscriptionStatus !== "active") {
      return res.status(400).json({ message: "No active subscription to cancel" });
    }

    user.subscriptionStatus = "canceled";
    // keep endsAt as now or leave as-is depending on policy; set to now
    user.subscriptionEndsAt = new Date();
    await user.save();

    res.status(200).json({ message: "Subscription canceled" });
  } catch (error) {
    console.error("Error in cancelSubscription:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// GET /users/me/stats
export async function getUserStats(req, res) {
  try {
    const user = req.user;
    const userId = user._id;

    // Solved problems
    const solved = await SolvedProblem.find({ user: userId }).sort({ solvedAt: -1 }).select("solvedAt difficulty problem");
    const solvedCount = solved.length;

    // Submissions for accuracy
    const submissions = await Submission.find({ userId }).select("status submittedAt");
    const totalSub = submissions.length;
    const accepted = submissions.filter((s) => String(s.status).toLowerCase() === "accepted").length;
    const accuracy = totalSub > 0 ? Math.round((accepted / totalSub) * 100) : 0;

    // Compute streak: consecutive days up to today with at least one accepted solve
    const acceptedDates = new Set(
      solved
        .filter((s) => s.solvedAt)
        .map((s) => {
          const d = new Date(s.solvedAt);
          // Normalize to yyyy-mm-dd in UTC
          return d.toISOString().slice(0, 10);
        })
    );

    // Count consecutive days backwards from today
    let streak = 0;
    const today = new Date();
    for (let i = 0; ; i++) {
      const day = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - i));
      const key = day.toISOString().slice(0, 10);
      if (acceptedDates.has(key)) {
        streak++;
      } else {
        break;
      }
    }

    res.status(200).json({ stats: { solvedCount, accuracy, streak } });
  } catch (error) {
    console.error("Error in getUserStats:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function syncAllUsersFromClerk(req, res) {
  try {
    if (!ENV.CLERK_SECRET_KEY) return res.status(500).json({ message: "Clerk secret key not configured" });

    const dbUsers = await User.find({});
    let updatedCount = 0;
    const errors = [];

    for (const dbUser of dbUsers) {
      try {
        const clerkRes = await fetch(`https://api.clerk.com/v1/users/${dbUser.clerkId}`, {
          headers: { Authorization: `Bearer ${ENV.CLERK_SECRET_KEY}` },
        });
        if (!clerkRes.ok) { errors.push(`Failed to fetch Clerk user ${dbUser.clerkId}`); continue; }

        const c = await clerkRes.json();
        const firstName = c.first_name || "";
        const lastName = c.last_name || "";
        const changed = applyClerkData(dbUser, {
          firstName,
          lastName,
          fullName: [firstName, lastName].filter(Boolean).join(" "),
          email: c.email_addresses?.[0]?.email_address || dbUser.email,
          profileImage: c.image_url || "",
        });
        if (changed) { await dbUser.save(); updatedCount++; }
      } catch (err) {
        errors.push(`Error updating user ${dbUser.clerkId}: ${err.message}`);
      }
    }

    res.status(200).json({
      message: `Synced ${updatedCount} users from Clerk`,
      totalUsers: dbUsers.length,
      updatedCount,
      ...(errors.length && { errors }),
    });
  } catch (error) {
    console.error("Error in syncAllUsersFromClerk:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
