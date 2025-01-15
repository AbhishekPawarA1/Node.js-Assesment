const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  role: String, // student, instructor, etc.
  language: String, // preferred language
  isActive: Boolean, // active status
});

const User = mongoose.model("User", userSchema);

module.exports = User;
