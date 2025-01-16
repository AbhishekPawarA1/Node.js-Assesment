const User = require("../models/userModel");

// Filtering Users by Role and Nested Profile Fields
exports.getUsers = async (req, res) => {
  try {
    const {
      role,
      preferences,
      bioKeyword,
      page = 1,
      limit = 10,
      sort = "name",
    } = req.query;

    const filters = {};
    if (role) filters.role = role;
    if (preferences)
      filters["profile.preferences"] = { $in: preferences.split(",") };
    if (bioKeyword)
      filters["profile.bio"] = { $regex: bioKeyword, $options: "i" };

    const users = await User.find(filters)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalResults = await User.countDocuments(filters);
    const totalPages = Math.ceil(totalResults / limit);

    res.json({ users, totalResults, totalPages, page });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
};
