const Course = require("../models/courseModel");

// Combined Filtering and Pagination
exports.getCourses = async (req, res) => {
  try {
    const {
      duration,
      maxCapacity,
      page = 1,
      limit = 10,
      sort = "title",
    } = req.query;

    const filters = {};
    if (duration) filters.duration = { $gt: Number(duration) };
    if (maxCapacity) filters.maxCapacity = { $gt: Number(maxCapacity) };

    const courses = await Course.find(filters)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalResults = await Course.countDocuments(filters);
    const totalPages = Math.ceil(totalResults / limit);

    res.json({ courses, totalResults, totalPages, page });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching courses", error: err.message });
  }
};
