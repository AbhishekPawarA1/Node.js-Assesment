const User = require("../models/userModel");
const Course = require("../models/courseModel");

exports.getUserReport = async (req, res) => {
  try {
    const userReport = await User.aggregate([
      {
        $match: { isActive: true }, 
      },
      {
        $group: {
          _id: "$language", 
          count: { $sum: 1 }, 
        },
      },
      {
        $addFields: {
          totalStudents: {
            $sum: {
              $cond: [{ $eq: ["$role", "student"] }, 1, 0],
            },
          },
          totalInstructors: {
            $sum: {
              $cond: [{ $eq: ["$role", "instructor"] }, 1, 0],
            },
          },
        },
      },
    ]);
    res.json(userReport);
  } catch (error) {
    res.status(500).send(error.message);
  }
};




exports.getCoursePopularity = async (req, res) => {
  try {
    const coursePopularity = await Course.aggregate([
      {
        $match: { enrollmentCount: { $gt: 0 } }, 
      },
      {
        $sort: { enrollmentCount: -1 }, 
      },
      {
        $limit: 5, // Limit to top 5 courses
      },
    ]);
    res.json(coursePopularity);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


exports.getCourseDuration = async (req, res) => {
  try {
    const courseDuration = await Course.aggregate([
      {
        $addFields: {
          durationCategory: {
            $switch: {
              branches: [
                { case: { $lte: ["$duration", 5] }, then: "short" },
                { case: { $lte: ["$duration", 15] }, then: "medium" },
                { case: { $gt: ["$duration", 15] }, then: "long" }
              ],
              default: "unknown"
            }
          }
        }
      },
      {
        $group: {
          _id: "$durationCategory", 
          count: { $sum: 1 } 
        }
      }
    ]);
    res.json(courseDuration);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
