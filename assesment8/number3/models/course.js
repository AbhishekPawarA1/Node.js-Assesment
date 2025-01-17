const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  enrollmentCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", CourseSchema);
