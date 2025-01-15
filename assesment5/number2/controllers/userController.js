const User = require("../models/user");

exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.query;
    const users = await User.find({ role }).select("name email");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
