import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

// Applies Clerk data to a user doc; returns true if any field changed
export function applyClerkData(user, { firstName, lastName, fullName, email, profileImage }) {
  let changed = false;
  const check = (field, val, guard = true) => {
    if (guard && val && user[field] !== val) { user[field] = val; changed = true; }
  };
  check("firstName", firstName);
  check("lastName", lastName);
  check("name", fullName);
  check("email", email, email && !email.includes("@example.com"));
  check("profileImage", profileImage);
  return changed;
}

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const { userId: clerkId, sessionClaims } = req.auth();
      if (!clerkId) return res.status(401).json({ message: "Unauthorized - invalid token" });

      const firstName = sessionClaims?.given_name || "";
      const lastName = sessionClaims?.family_name || "";
      const fullName = [firstName, lastName].filter(Boolean).join(" ");
      const email = sessionClaims?.email || sessionClaims?.email_address || sessionClaims?.email_addresses?.[0]?.email_address;
      const profileImage = sessionClaims?.image_url || "";

      let user = await User.findOne({ clerkId });

      if (!user) {
        user = await User.create({
          clerkId,
          firstName: firstName || "User",
          lastName,
          name: fullName || "User",
          email: email || `${clerkId}@example.com`,
          profileImage,
        });
      } else {
        const changed = applyClerkData(user, { firstName, lastName, fullName, email, profileImage });
        if (changed) await user.save();
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Error in protectRoute middleware", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];
