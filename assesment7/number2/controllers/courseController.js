const Course = require("../models/course");
const { paginate } = require("../utils/pagination");

exports.getCourses = async (req, res) => {
  const { page = 1, limit = 10, sort = "title", order = "asc" } = req.query;
  const filter = {};

  if (req.query.duration) filter.duration = { $gt: req.query.duration };
  if (req.query.maxCapacity)
    filter.maxCapacity = { $gt: req.query.maxCapacity };
  if (req.query.days) filter.days = { $in: req.query.days.split(",") };
  if (req.query.title)
    filter.title = { $regex: req.query.title, $options: "i" };

  const courses = await paginate(Course, filter, page, limit, sort, order);
  res.json(courses);
};
