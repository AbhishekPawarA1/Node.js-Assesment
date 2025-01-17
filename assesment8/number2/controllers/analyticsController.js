const User = require("../models/userModel");
const Course = require("../models/courseModel");

// User Language Preferences
exports.getUserLanguagePreferences = async (req, res) => {
  try {
    const data = await User.aggregate([
      { $group: { _id: "$preferredLanguage", userCount: { $sum: 1 } } },
      { $sort: { userCount: -1 } },
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Course Enrollment Stats
exports.getCourseEnrollmentStats = async (req, res) => {
  try {
    const data = await Course.aggregate([
      { $match: { enrollmentCount: { $gt: 0 } } },
      {
        $group: {
          _id: "$title",
          enrollmentCount: { $sum: "$enrollmentCount" },
        },
      },
      { $sort: { enrollmentCount: -1 } },
      { $limit: 3 },
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Course Duration Categories
exports.getCourseDurationCategories = async (req, res) => {
  try {
    const data = await Course.aggregate([
      {
        $addFields: {
          durationCategory: {
            $switch: {
              branches: [
                { case: { $lte: ["$duration", 20] }, then: "Short" },
                {
                  case: {
                    $and: [
                      { $gt: ["$duration", 20] },
                      { $lte: ["$duration", 50] },
                    ],
                  },
                  then: "Medium",
                },
                { case: { $gt: ["$duration", 50] }, then: "Long" },
              ],
              default: "Unknown",
            },
          },
        },
      },
      { $group: { _id: "$durationCategory", courseCount: { $sum: 1 } } },
      { $sort: { courseCount: -1 } },
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
