const User = require("../models/user");
const { paginate } = require("../utils/pagination");

exports.getUsers = async (req, res) => {
  const { page = 1, limit = 10, bio, platform } = req.query;
  const filter = {};

  if (bio) filter["bio"] = { $regex: bio, $options: "i" };
  if (platform) filter["socialLinks.platform"] = { $in: platform.split(",") };

  const users = await paginate(User, filter, page, limit);
  res.json(users);
};
