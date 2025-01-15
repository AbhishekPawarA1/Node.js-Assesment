const User = require("../models/user");

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
};

exports.filterUsers = async (req, res) => {
  const { role } = req.query;
  const users = await User.find({ role });
  res.json(users);
};
