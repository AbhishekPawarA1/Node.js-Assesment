const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  level: { type: String, required: true },
  duration: { type: Number, required: true }, 
  enrollments: { type: Number, default: 0 }, 
});

module.exports = mongoose.model("Course", courseSchema);