const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  enrollmentCount: Number, // number of users enrolled
  duration: Number, // course duration in hours
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
