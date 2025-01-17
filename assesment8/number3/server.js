const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Routes
const analyticsRoutes = require("./routes/analytics");

// Initialize app
const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/lms")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Use routes
app.use("/analytics", analyticsRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
