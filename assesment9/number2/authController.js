const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./User"); // MongoDB User model

const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next({ status: 400, message: "All fields are required" });
  }

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return next({ status: 400, message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: "User registered successfully" });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next({ status: 400, message: "Email and password are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next({ status: 400, message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return next({ status: 400, message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ message: "Login successful", token });
};

module.exports = { registerUser, loginUser };
