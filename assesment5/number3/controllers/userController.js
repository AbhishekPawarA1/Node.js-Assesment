const User = require("../models/user");

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    await user.deleteOne();
    res.status(200).send("User deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
