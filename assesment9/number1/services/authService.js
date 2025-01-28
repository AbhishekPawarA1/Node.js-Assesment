const User = require("../models/userModel");
const jwtUtils = require("../utils/jwtUtils");
const bcrypt = require("bcrypt");

exports.register = async ({ username, password }) => {
  if (!username || !password)
    throw new Error("Username and password are required");
  const user = new User({ username, password });
  await user.save();
  return { username: user.username };
};

exports.login = async ({ username, password }) => {
  if (!username || !password)
    throw new Error("Username and password are required");
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid username or password");
  }
  return jwtUtils.generateToken({ id: user._id, username: user.username });
};
