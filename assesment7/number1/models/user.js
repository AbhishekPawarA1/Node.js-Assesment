const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ["student", "instructor"], required: true },
  profile: {
    bio: { type: String },
    socialLinks: [{ platform: String, url: String }],
    preferences: { preferredLanguage: String },
  },
});

module.exports = mongoose.model("User", userSchema);
