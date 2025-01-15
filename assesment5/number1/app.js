const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");

const app = express();
const PORT = 3000;
const MONGO_URI = "mongodb://127.0.0.1:27017/LMS_DB";

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

// Routes
app.use("/users", userRoutes);
app.use("/courses", courseRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
