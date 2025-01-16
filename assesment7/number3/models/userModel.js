const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ["student", "instructor"], required: true },
  profile: {
    preferences: { type: [String] },
    bio: { type: String },
    socialLinks: [
      {
        platform: { type: String },
        url: { type: String },
      },
    ],
  },
});

module.exports = mongoose.model("User", userSchema);
