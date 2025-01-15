const Course = require("../models/course");

exports.createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).send(course);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.addStudentToCourse = async (req, res) => {
  try {
    const { courseId, userId } = req.body;
    const course = await Course.findById(courseId);
    await course.addStudent(userId);
    res.status(200).send("Student enrolled");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.removeStudentFromCourse = async (req, res) => {
  try {
    const { courseId, userId } = req.body;
    const course = await Course.findById(courseId);
    await course.removeStudent(userId);
    res.status(200).send("Student unenrolled");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    await course.deleteOne();
    res.status(200).send("Course deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
