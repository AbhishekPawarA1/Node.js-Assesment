const Course = require("../models/course");

exports.createCourse = async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.status(201).json(course);
};

exports.filterCourses = async (req, res) => {
  const filters = req.query;
  const courses = await Course.find(filters);
  res.json(courses);
};
