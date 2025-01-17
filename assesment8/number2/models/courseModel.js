const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  enrollmentCount: Number,
  duration: Number, // in hours
});

module.exports = mongoose.model("Course", courseSchema);
