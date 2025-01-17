const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "instructor", "admin"],
    required: true,
  },
  preferences: [{ type: String }],
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  registrationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
