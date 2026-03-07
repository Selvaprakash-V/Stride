import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["host", "participant"],
      default: "participant",
    },
    // Profile type collects the onboarding intent: student or company
    profileType: {
      type: String,
      enum: ["student", "company", "unknown"],
      default: "unknown",
    },
    // Whether user has completed the one-time onboarding profile
    profileCompleted: {
      type: Boolean,
      default: false,
    },
    // Freeform profile data that stores either student or company details
    profileData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    // Subscription information
    subscriptionPlan: {
      type: String,
      enum: ["starter", "pro", "enterprise", null],
      default: null,
    },
    subscriptionStatus: {
      type: String,
      enum: ["active", "canceled", "trial", "none"],
      default: "none",
    },
    subscriptionProviderId: {
      type: String,
      default: "",
    },
    subscriptionStartsAt: {
      type: Date,
    },
    subscriptionEndsAt: {
      type: Date,
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

// Indexes for fast lookup
// `unique: true` on fields already creates indexes; avoid duplicate index declarations

// Convenience virtual
userSchema.virtual("displayName").get(function () {
  return this.name || `${this.firstName} ${this.lastName}`.trim();
});

const User = mongoose.model("User", userSchema);

export default User;
