const express = require("express");
const mongoose = require("mongoose");
const analyticsRoutes = require("./routes/analyticsRoutes");

// Create Express app
const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/lms")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Middleware
app.use(express.json());

// Use analytics routes
app.use("/analytics", analyticsRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
