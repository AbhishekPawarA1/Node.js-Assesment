const User = require("../models/user");
const Course = require("../models/course");

// User Engagement Analytics
const userEngagement = async (req, res) => {
  try {
    const engagement = await User.aggregate([
      { $unwind: "$preferences" },
      { $group: { _id: "$preferences", totalCount: { $sum: 1 } } },
      { $project: { _id: 0, preferenceType: "$_id", totalCount: 1 } },
      { $skip: 0 }, // Skip for pagination
      { $limit: 10 }, // Limit for pagination
    ]);
    res.json(engagement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Course Analytics
const courseSummary = async (req, res) => {
  try {
    const courseData = await Course.aggregate([
      {
        $group: {
          _id: "$category",
          totalCourses: { $sum: 1 },
          averageEnrollment: { $avg: "$enrollmentCount" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          totalCourses: 1,
          averageEnrollment: 1,
        },
      },
    ]);
    res.json(courseData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export controllers
module.exports = { userEngagement, courseSummary };
