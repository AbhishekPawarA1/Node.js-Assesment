const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  category: String, 
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
