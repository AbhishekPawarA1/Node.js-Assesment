const Course = require("../models/courseModel");


const getCourses = async (filters, page = 1, limit = 5) => {
  const skip = (page - 1) * limit;
  const query = {};

  if (filters.title) query.title = new RegExp(filters.title, "i");
  if (filters.description)
    query.description = new RegExp(filters.description, "i");
  if (filters.level) query.level = filters.level;

  const courses = await Course.find(query).skip(skip).limit(limit);
  const total = await Course.countDocuments(query);

  return { courses, total };
};

const updateCourse = async (courseId, updateData) => {
  if (!updateData.title || !updateData.description || !updateData.level) {
    throw new Error("All fields are required.");
  }

  if (updateData.title.length < 3 || updateData.description.length < 10) {
    throw new Error(
      "Title must be at least 3 characters and description at least 10 characters."
    );
  }

  const course = await Course.findByIdAndUpdate(courseId, updateData, {
    new: true,
  });
  return course;
};


const getCoursesSummary = async () => {
  const totalCourses = await Course.countDocuments();
  const avgEnrollments = await Course.aggregate([
    { $group: { _id: null, avgEnrollments: { $avg: "$enrollments" } } },
  ]);
  const avgDuration = await Course.aggregate([
    { $group: { _id: null, avgDuration: { $avg: "$duration" } } },
  ]);

  return {
    totalCourses,
    avgEnrollments: avgEnrollments[0] ? avgEnrollments[0].avgEnrollments : 0,
    avgDuration: avgDuration[0] ? avgDuration[0].avgDuration : 0,
  };
};

module.exports = { getCourses, updateCourse, getCoursesSummary };
