const Course = require("../models/course");

exports.searchCourses = async ({ title, description, level, page, limit }) => {
  const query = {};
  if (title) query.title = { $regex: title, $options: "i" };
  if (description) query.description = { $regex: description, $options: "i" };
  if (level) query.level = level;

  const skip = (page - 1) * limit;
  const courses = await Course.find(query).skip(skip).limit(Number(limit));
  return courses;
};

exports.getSummary = async () => {
  const totalCourses = await Course.countDocuments();
  const averageEnrollments = await Course.aggregate([
    { $group: { _id: null, avgEnrollments: { $avg: "$enrollments" } } },
  ]);
  const averageDuration = await Course.aggregate([
    { $group: { _id: null, avgDuration: { $avg: "$duration" } } },
  ]);

  return {
    totalCourses,
    averageEnrollments: averageEnrollments[0]?.avgEnrollments || 0,
    averageDuration: averageDuration[0]?.avgDuration || 0,
  };
};

exports.updateCourse = async (courseId, courseData) => {
  const { title, description, level, enrollments } = courseData;
  if (!title || !description || !level || typeof enrollments !== "number") {
    throw new Error("Invalid course data");
  }

  const updatedCourse = await Course.findByIdAndUpdate(courseId, courseData, {
    new: true,
  });
  return updatedCourse;
};
