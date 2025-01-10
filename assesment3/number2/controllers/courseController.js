const courseService = require("../services/courseService");

const getCourses = async (req, res) => {
  try {
    const { title, description, level } = req.query;
    const { page = 1, limit = 5 } = req.query;

    const { courses, total } = await courseService.getCourses(
      { title, description, level },
      page,
      limit
    );
    res.status(200).json({ courses, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const updatedCourse = await courseService.updateCourse(courseId, req.body);
    res.status(200).json(updatedCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getCoursesSummary = async (req, res) => {
  try {
    const summary = await courseService.getCoursesSummary();
    res.status(200).json(summary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCourses, updateCourse, getCoursesSummary };
