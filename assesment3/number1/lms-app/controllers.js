const courses = require("./models");

const getCourses = (req, res) => {
  const { available } = req.query;
  if (available) {
    const filteredCourses = courses.filter(
      (course) => course.available.toString() === available
    );
    return res.json(filteredCourses);
  }
  res.json(courses);
};

const getCourseById = (req, res) => {
  const { id } = req.params;
  const course = courses.find((course) => course.id === parseInt(id));
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  res.json(course);
};

const rootRoute = (req, res) => {
  res.send("Welcome to the Courses API");
};

module.exports = { getCourses, getCourseById, rootRoute };
