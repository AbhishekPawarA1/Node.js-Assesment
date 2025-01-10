const courseService = require("../services/courseService");

exports.getCourses = async (req, res) => {
  try {
    const { title, description, level, page = 1, limit = 5 } = req.query;
    const courses = await courseService.searchCourses({
      title,
      description,
      level,
      page,
      limit,
    });
    res.json(courses);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getCourseSummary = async (req, res) => {
  try {
    const summary = await courseService.getSummary();
    res.json(summary);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const courseData = req.body;
    const updatedCourse = await courseService.updateCourse(
      courseId,
      courseData
    );
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
