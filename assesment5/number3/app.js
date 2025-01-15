const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");

// Mongoose connection
mongoose
  .connect("mongodb://localhost:27017/learningManagementSystem")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Connection error:", error);
  });

const app = express();
app.use(express.json());

app.use(userRoutes);
app.use(courseRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
