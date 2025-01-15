const express = require("express");
const mongoose = require("mongoose");
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

mongoose.connect("mongodb://localhost:27017/number1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
