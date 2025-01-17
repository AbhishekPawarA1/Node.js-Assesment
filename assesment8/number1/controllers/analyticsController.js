const User = require("../models/user");
const Course = require("../models/course");

const getUserRoleCount = async (req, res) => {
  try {
    const result = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getCourseCategoryCount = async (req, res) => {
  try {
    const result = await Course.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserRoleCount, getCourseCategoryCount };
