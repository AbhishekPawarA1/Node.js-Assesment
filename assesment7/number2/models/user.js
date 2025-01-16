const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String },
  profile: {
    preferences: { type: String },
  },
  socialLinks: [
    {
      platform: { type: String },
      link: { type: String },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
