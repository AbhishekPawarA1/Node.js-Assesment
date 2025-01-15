const User = require("../models/userModel");
const Course = require("../models/courseModel");


exports.getUserCount = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const userRoleCount = await User.aggregate([
      {
        $group: {
          _id: "$role", 
          count: { $sum: 1 }, 
        },
      },
      {
        $match: { _id: { $ne: null } }, 
      },
    ]);
    res.json({
      totalUsers,
      userRoleCount,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


exports.getCourseCount = async (req, res) => {
  try {
    const courseCategoryCount = await Course.aggregate([
      {
        $group: {
          _id: "$category", 
          count: { $sum: 1 }, 
        },
      },
      {
        $sort: { count: -1 }, 
      },
    ]);
    res.json(courseCategoryCount);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
