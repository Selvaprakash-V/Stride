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
